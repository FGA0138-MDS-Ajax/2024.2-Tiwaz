const plantacaoService = require("../services/plantacaoService");
const Plantacao = require("../models/Plantacao"); // Corrigir a importação do modelo

// Cadastrar Plantação
const cadastrarPlantacao = async (req, res) => {
  try {
    const { nome, tipo, areaPlantada, quantidadePlantada, dataPlantio, custoInicial } = req.body;

    // Verificação de campos obrigatórios
    if (!nome || !tipo || (!areaPlantada && !quantidadePlantada) || !dataPlantio || !custoInicial) {
      return res.status(400).json({
        success: false,
        error: "Todos os campos obrigatórios devem ser preenchidos!",
      });
    }

    // Cadastra nova plantação
    const novaPlantacao = await plantacaoService.cadastrarPlantacao({
      nome,
      tipo,
      areaPlantada: areaPlantada || null,
      quantidadePlantada: quantidadePlantada || null,
      dataPlantio,
      custoInicial,
    });

    console.log("Plantação cadastrada com sucesso:", novaPlantacao);

    return res.status(201).json({
      success: true,
      message: "Plantação cadastrada com sucesso!",
      data: novaPlantacao, // Retorno organizado dentro de `data`
    });
  } catch (error) {
    console.error("Erro ao cadastrar plantação:", error.stack);
    return res.status(500).json({ success: false, error: "Erro ao cadastrar plantação!" });
  }
};

const listarPlantacoes = async (req, res) => {
  try {
      console.log("📌 Requisição recebida para listar plantações...");

      // Verifica se o modelo Plantacao está definido
      if (typeof Plantacao === "undefined") {
          console.error("❌ Erro: Modelo 'Plantacao' não encontrado. Verifique a importação.");
          return res.status(500).json({
              success: false,
              error: "Erro interno do servidor: Modelo 'Plantacao' não encontrado.",
          });
      }

      // Busca todas as plantações no banco de dados
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


// Atualizar Plantação
const atualizarPlantacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipo, areaPlantada, quantidadePlantada, dataPlantio, custoInicial } = req.body;

    // Atualiza a plantação
    const plantacaoAtualizada = await plantacaoService.atualizarPlantacao(id, {
      nome,
      tipo,
      areaPlantada: areaPlantada || null,
      quantidadePlantada: quantidadePlantada || null,
      dataPlantio,
      custoInicial,
    });

    if (!plantacaoAtualizada) {
      return res.status(404).json({ success: false, error: "Plantação não encontrada!" });
    }

    console.log(`Plantação ${id} atualizada com sucesso!`);

    return res.status(200).json({
      success: true,
      message: "Plantação atualizada com sucesso!",
      data: plantacaoAtualizada,
    });
  } catch (error) {
    console.error("Erro ao atualizar plantação:", error.stack);
    return res.status(500).json({ success: false, error: "Erro ao atualizar plantação!" });
  }
};

// Excluir Plantação
const excluirPlantacao = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Exclui a plantação
    const plantacaoExcluida = await plantacaoService.excluirPlantacao(id);

    if (!plantacaoExcluida) {
      return res.status(404).json({ success: false, error: "Plantação não encontrada!" });
    }

    console.log(`Plantação ${id} excluída com sucesso!`);

    return res.status(200).json({
      success: true,
      message: "Plantação excluída com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir plantação:", error.stack);
    return res.status(500).json({ success: false, error: "Erro ao excluir plantação!" });
  }
};

module.exports = {
  cadastrarPlantacao,
  listarPlantacoes,
  atualizarPlantacao,
  excluirPlantacao,
};
