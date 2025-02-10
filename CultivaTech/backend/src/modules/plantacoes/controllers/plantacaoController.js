const plantacaoService = require("../services/plantacaoService");
const Plantacao = require("../models/Plantacao"); // Corrigir a importação do modelo
// const { Plantacao } = require("../models");

// 📌 Função para formatar data no padrão DD/MM/YYYY
const formatarData = (data) => {
  // Se a data já contém barras, assumimos que está no formato correto
  if (data.includes("/")) return data;

  // Se a data tiver exatamente 8 dígitos (ex: 21082020), adicionamos as barras
  if (data.length === 8) {
    return `${data.substring(0, 2)}/${data.substring(2, 4)}/${data.substring(4, 8)}`;
  }

  throw new Error("Formato de data inválido! Use DD/MM/YYYY.");
};

// 📌 Cadastrar Plantação
const cadastrarPlantacao = async (req, res) => {
  try {
    const { nome, tipo, areaPlantada, quantidadePlantada, dataPlantio, custoInicial } = req.body;

    // 🛑 Verificação de campos obrigatórios
    if (!nome || !tipo || (!areaPlantada && !quantidadePlantada) || !dataPlantio || !custoInicial) {
      return res.status(400).json({
        success: false,
        error: "Todos os campos obrigatórios devem ser preenchidos!",
      });
    }

    // 📅 Formatar a data corretamente
    let dataFormatada;
    try {
      dataFormatada = formatarData(dataPlantio);
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    // ✅ Cadastra nova plantação
    const novaPlantacao = await plantacaoService.cadastrarPlantacao({
      nome,
      tipo,
      areaPlantada: areaPlantada || null,
      quantidadePlantada: quantidadePlantada || null,
      dataPlantio: dataFormatada,
      custoInicial,
    });

    console.log("✅ Plantação cadastrada com sucesso:", novaPlantacao);

    return res.status(201).json({
      success: true,
      message: "Plantação cadastrada com sucesso!",
      data: novaPlantacao,
    });
  } catch (error) {
    console.error("❌ Erro ao cadastrar plantação:", error.stack);
    return res.status(500).json({
      success: false,
      error: "Erro ao cadastrar plantação!",
      details: error.message || "Erro desconhecido.",
    });
  }
};

// 📌 Listar Plantações
const listarPlantacoes = async (req, res) => {
  try {
    console.log("📌 Requisição recebida para listar plantações...");

    // 🛑 Verifica se o modelo Plantacao está definido
    if (typeof Plantacao === "undefined") {
      console.error("❌ Erro: Modelo 'Plantacao' não encontrado. Verifique a importação.");
      return res.status(500).json({
        success: false,
        error: "Erro interno do servidor: Modelo 'Plantacao' não encontrado.",
      });
    }

    // 🔍 Busca todas as plantações no banco de dados
    const plantacoes = await Plantacao.findAll();

    if (!plantacoes || plantacoes.length === 0) {
      console.warn("⚠️ Nenhuma plantação encontrada no banco.");
      return res.status(200).json({
        success: true,
        message: "Nenhuma plantação encontrada.",
        data: [],
      });
    }

    console.log(`✅ ${plantacoes.length} plantações encontradas!`);
    return res.status(200).json({
      success: true,
      message: "Plantações encontradas!",
      data: plantacoes,
    });
  } catch (error) {
    console.error("❌ Erro ao listar plantações:", error.message || error);
    return res.status(500).json({
      success: false,
      error: "Erro ao listar plantações!",
      details: error.message || "Erro desconhecido.",
    });
  }
};

// 📌 Atualizar Plantação
const atualizarPlantacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipo, areaPlantada, quantidadePlantada, dataPlantio, custoInicial } = req.body;

    // 📅 Formatar a data corretamente antes da atualização
    let dataFormatada;
    try {
      dataFormatada = formatarData(dataPlantio);
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    // 🔄 Atualiza a plantação
    const plantacaoAtualizada = await plantacaoService.atualizarPlantacao(id, {
      nome,
      tipo,
      areaPlantada: areaPlantada || null,
      quantidadePlantada: quantidadePlantada || null,
      dataPlantio: dataFormatada,
      custoInicial,
    });

    if (!plantacaoAtualizada) {
      return res.status(404).json({
        success: false,
        error: "Plantação não encontrada!",
      });
    }

    console.log(`✅ Plantação ${id} atualizada com sucesso!`);

    return res.status(200).json({
      success: true,
      message: "Plantação atualizada com sucesso!",
      data: plantacaoAtualizada,
    });
  } catch (error) {
    console.error("❌ Erro ao atualizar plantação:", error.stack);
    return res.status(500).json({
      success: false,
      error: "Erro ao atualizar plantação!",
      details: error.message || "Erro desconhecido.",
    });
  }
};

// 📌 Excluir Plantação
const excluirPlantacao = async (req, res) => {
  try {
    const { id } = req.params;

    // 🗑️ Exclui a plantação
    const plantacaoExcluida = await plantacaoService.excluirPlantacao(id);

    if (!plantacaoExcluida) {
      return res.status(404).json({
        success: false,
        error: "Plantação não encontrada!",
      });
    }

    console.log(`✅ Plantação ${id} excluída com sucesso!`);

    return res.status(200).json({
      success: true,
      message: "Plantação excluída com sucesso!",
    });
  } catch (error) {
    console.error("❌ Erro ao excluir plantação:", error.stack);
    return res.status(500).json({
      success: false,
      error: "Erro ao excluir plantação!",
      details: error.message || "Erro desconhecido.",
    });
  }
};

const fecharPlantacao = async (req, res) => {
  try {
    const { id } = req.params;
    const plantacao = await Plantacao.findByPk(id);

    if (!plantacao) {
      return res.status(404).json({ success: false, error: "Plantação não encontrada!" });
    }

    plantacao.status = "Colhido"; // Fecha a plantação
    await plantacao.save();

    return res.status(200).json({
      success: true,
      message: "Plantação fechada com sucesso!",
      data: plantacao,
    });
  } catch (error) {
    console.error("Erro ao fechar plantação:", error);
    return res.status(500).json({ success: false, error: "Erro ao fechar plantação!" });
  }
};

module.exports = {
  cadastrarPlantacao,
  listarPlantacoes,
  atualizarPlantacao,
  excluirPlantacao,
  fecharPlantacao,
};