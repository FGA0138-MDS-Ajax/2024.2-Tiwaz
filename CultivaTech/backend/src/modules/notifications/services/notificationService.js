const schedule = require('node-schedule');
const axios = require('axios');
const OneSignal = require('onesignal-node');
const pusher = require('../../../config/pusher');

// Configurações das APIs diretamente no código
const CONFIG = {
    HG_BRASIL: {
        API_KEY: "f89dbf70",
        URL: "https://api.hgbrasil.com/weather"
    },
    ONESIGNAL: {
        APP_ID: "736a405d-9875-4754-bdb7-e6470fceaf38", // Substitua pelo seu APP ID real
    },
    SERVER: {
        PORT: 3000,
        API_URL: "http://localhost:3000"
    }
};

// Configuração do OneSignal
const client = new OneSignal.Client({
    app: {
        appAuthKey: "vjatitrzaeukndfoavsxjorrz", // REST API Key
        appId: "736a405d-9875-4754-bdb7-e6470fceaf38"
    }
});

class ServicoDeNotificacao {
    constructor() {
        this.trabalhosAgendados = new Map();
    }

    obterIconeClima(condicao) {
        switch (condicao.toLowerCase()) {
            case "tempo limpo":
                return ["sunny", "☀️"];
            case "tempo nublado":
                return ["cloud", "☁️"];
            case "chuva":
                return ["rainy", "🌧️"];
            case "chuvas esparsas":
                return ["partly-sunny", "🌦️"];
            case "chuviscos":
                return ["rainy-outline", "🌧️"];
            default:
                return ["cloud", "☁️"];
        }
    }

    async enviarNotificacao(usuarioId, mensagem, tipo, condicao = null) {
        try {
            const [_, emoji] = condicao ? this.obterIconeClima(condicao) : ["", ""];
            const notificacao = {
                headings: {
                    en: 'CultivaTech Alerta',
                    pt: 'CultivaTech Alerta'
                },
                contents: {
                    en: `${emoji} ${mensagem}`,
                    pt: `${emoji} ${mensagem}`
                },
                filters: [
                    { field: 'tag', key: 'user_id', relation: '=', value: usuarioId }
                ],
                included_segments: ['All'],
                data: {
                    type: tipo,
                    userId: usuarioId,
                    weatherCondition: condicao
                },
                android_channel_id: "weather-alerts",
                ios_sound: "notification.wav",
                android_sound: "notification"
            };

            const resposta = await client.createNotification(notificacao);
            console.log('Notificação enviada:', resposta.body);
            return true;
        } catch (erro) {
            console.error('Erro ao enviar notificação:', erro);
            throw erro;
        }
    }

    async atualizarPreferenciasDeNotificacao(usuarioId, preferencias) {
        try {
            if (!preferencias.location || !preferencias.location.lat || !preferencias.location.lon) {
                throw new Error('Localização é obrigatória para configurar notificações');
            }

            if (this.trabalhosAgendados.has(usuarioId)) {
                this.trabalhosAgendados.get(usuarioId).cancel();
            }

            const regra = new schedule.RecurrenceRule();
            regra.hour = preferencias.hour || 8;
            regra.minute = preferencias.minute || 0;

            const trabalho = schedule.scheduleJob(regra, async () => {
                await this.verificarClimaENotificar(usuarioId, preferencias.location);
            });

            this.trabalhosAgendados.set(usuarioId, trabalho);
            await this.verificarClimaENotificar(usuarioId, preferencias.location);

            return true;
        } catch (erro) {
            console.error('Erro ao atualizar preferências:', erro);
            throw erro;
        }
    }

    async enviarNotificacaoRealTime(canal, evento, dados) {
        try {
            await pusher.trigger(canal, evento, dados);
            return true;
        } catch (erro) {
            console.error('Erro ao enviar notificação em tempo real:', erro);
            throw erro;
        }
    }

    async verificarClimaENotificar(usuarioId, localizacao) {
        try {
            if (!localizacao || !localizacao.lat || !localizacao.lon) {
                throw new Error('Localização inválida');
            }

            const respostaClima = await axios.get(CONFIG.HG_BRASIL.URL, {
                params: {
                    key: CONFIG.HG_BRASIL.API_KEY,
                    lat: localizacao.lat,
                    lon: localizacao.lon,
                    user_ip: 'remote'
                }
            });

            const dadosPrevisao = respostaClima.data.results;
            const amanha = dadosPrevisao.forecast[1];
            const condicao = amanha.description.toLowerCase();

            // Verifica condições específicas
            if (condicao === "chuva" || condicao === "chuvas esparsas" || condicao === "chuviscos") {
                const mensagem = `Previsão de ${condicao} para amanhã em ${dadosPrevisao.city}...`;

                // Enviar via OneSignal
                await this.enviarNotificacao(usuarioId, mensagem, 'weather_alert', condicao);

                // Enviar via Pusher
                await this.enviarNotificacaoRealTime(
                    `user-${usuarioId}`,
                    'weather-alert',
                    {
                        message: mensagem,
                        type: 'weather_alert',
                        condition: condicao
                    }
                );
            }

            // Verifica temperatura para geada
            if (amanha.min <= 3) {
                await this.enviarNotificacao(
                    usuarioId,
                    `Risco de geada amanhã em ${dadosPrevisao.city}! Temperatura mínima prevista: ${amanha.min}°C. Proteja suas culturas!`,
                    'frost_alert',
                    'tempo limpo' // Geada geralmente ocorre em noites de céu limpo
                );
            }

            // Notifica mudanças bruscas de temperatura
            const diferencaTemp = amanha.max - amanha.min;
            if (diferencaTemp >= 15) {
                await this.enviarNotificacao(
                    usuarioId,
                    `Grande variação de temperatura prevista para amanhã em ${dadosPrevisao.city}. Mínima: ${amanha.min}°C, Máxima: ${amanha.max}°C.`,
                    'temperature_alert',
                    condicao
                );
            }

            return true;
        } catch (erro) {
            console.error('Erro ao verificar previsão do tempo:', erro);
            throw erro;
        }
    }
}

module.exports = new ServicoDeNotificacao();
