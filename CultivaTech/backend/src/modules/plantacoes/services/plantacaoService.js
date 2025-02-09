const moment = require("moment");
const Plantacao = require("../models/Plantacao");

// Cadastrar Plantação
const cadastrarPlantacao = async (dados) => {
  try {
    let { nome, tipo, areaPlantada, quantidadePlantada, dataPlantio, custoInicial } = dados;

    // Verifica se a data está no formato correto (YYYY-MM-DD), senão converte
    if (!moment(dataPlantio, "YYYY-MM-DD", true).isValid()) {
      if (moment(dataPlantio, "DD/MM/YYYY", true).isValid()) {
        dataPlantio = moment(dataPlantio, "DD/MM/YYYY").format("YYYY-MM-DD");
      } else {
        throw new Error("Formato de data inválido! Use DD/MM/YYYY.");
      }
    }

    const novaPlantacao = await Plantacao.create({
      nome,
      tipo,
      areaPlantada: areaPlantada || null,
      quantidadePlantada: quantidadePlantada || null,
      dataPlantio,
      custoInicial,
    });

    return novaPlantacao;
  } catch (error) {
    console.error("❌ Erro ao cadastrar plantação:", error.message);
    throw new Error("Erro ao cadastrar plantação!");
  }
};

module.exports = {
  cadastrarPlantacao,
  listarPlantacoes: async () => await Plantacao.findAll(),
  atualizarPlantacao: async (id, dados) => {
    const plantacao = await Plantacao.findByPk(id);
    if (!plantacao) return null;
    await plantacao.update(dados);
    return plantacao;
  },
  excluirPlantacao: async (id) => {
    const plantacao = await Plantacao.findByPk(id);
    if (!plantacao) return null;
    await plantacao.destroy();
    return true;
  },
};
