const axios = require('axios');

const HG_BRASIL_API_KEY = "f89dbf70";
const URL_PREVISAO = "https://api.hgbrasil.com/";

const previsaoController = { 
    getFiveDayForecast: async (req, res) => { // funcao que recebe as cordenadas e retorna a previsao do tempo
        try { // tenta fazer a requisicao
            const { lat, lon } = req.query; // pega as cordenadas da requisicao

            if (!lat || !lon) { // se nao tiver as cordenadas retorna erro
                return res.status(400).json({ error: 'Coordenadas ausentes' });
            }

            // Funcao que busca os dados na api
            const forecastResponse = await axios.get(
                `${URL_PREVISAO}weather`, {
                params: {
                    key: HG_BRASIL_API_KEY,
                    lat: lat,
                    lon: lon,
                    format: 'json'
                }
            });

            // Se nao tiver dados retorna erro
            if (!forecastResponse.data || !forecastResponse.data.results) {
                return res.status(500).json({ error: 'Dados indisponíveis' });
            }

            // Pega os resultados da previsao que a api deu 
            const forecastResults = forecastResponse.data.results;
            
            const forecastAtual = {
                temperature: {
                    temp: forecastResults.temp,
                },
                humidity: forecastResults.humidity,
                description: forecastResults.description,
                rainProbability: forecastResults.rain_probability || 0
            }

            // Processar dados da previsão
            const forecastData = forecastResults.forecast.map((day) => ({
                date: day.date,
                weekday: day.weekday,
                temperature: {
                    min: day.min,
                    max: day.max
                },
                humidity: day.humidity,
                condition: day.description,
                description: day.condition,
                rainProbability: day.rain_probability || 0
            }));

            res.json({
                location: forecastResults.city,
                forecast: forecastData,
                current: forecastAtual
            });

        } catch (error) { // se der erro na requisicao
            console.error('Erro na previsão:', error.response?.data || error.message);
            res.status(500).json({
                error: 'Falha ao obter previsão',
                details: error.response?.data?.message || 'Erro desconhecido'
            });
        }
    }
};

module.exports = previsaoController;