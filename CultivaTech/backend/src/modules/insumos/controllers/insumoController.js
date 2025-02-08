// controllers/insumoController.js

const insumoService = require('../services/insumoService');

// Cadastrar insumo
const cadastrarInsumos = async (req, res) => {
  try {
    const { nome, unidadeMedida, quantidade, valor, dataUso, idPlantacao } = req.body;

    const novoInsumo = await insumoService.cadastrarInsumos({ 
        nome, 
        unidadeMedida, 
        quantidade, 
        valor,
        dataUso,
        idPlantacao,    
    });
    res.status(201).json({ message: 'Insumo cadastrado com sucesso!', insumo: novoInsumo });
  } catch (error) {
    console.error('Erro ao cadastrar insumo:', error.message);
    res.status(500).json({ error: 'Erro ao cadastrar insumo!' });
  }
};

// Listar insumos
const listarInsumos = async (req, res) => {
  try {
    const insumos = await insumoService.listarInsumos();
    res.status(200).json(insumos);
  } catch (error) {
    console.error('Erro ao listar insumos:', error.message);
    res.status(500).json({ error: 'Erro ao listar insumos!' });
  }
};

// Atualizar insumo
const atualizarInsumos = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, unidadeMedida, quantidade, valor, dataUso, idPlantacao } = req.body;

    const insumoAtualizado = await insumoService.atualizarInsumos(id, { 
        nome, 
        unidadeMedida, 
        quantidade, 
        valor,
        dataUso,
        idPlantacao,
    });

    if (!insumoAtualizado) {
      return res.status(404).json({ error: 'Insumo não encontrado!' });
    }

    res.status(200).json({ message: 'Insumo atualizado com sucesso!', insumo: insumoAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar insumo:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar insumo!' });
  }
};

// Excluir insumo
const excluirInsumos = async (req, res) => {
  try {
    const { id } = req.params;

    const insumoExcluido = await insumoService.excluirInsumos(id);

    if (!insumoExcluido) {
      return res.status(404).json({ error: 'Insumo não encontrado!' });
    }

    res.status(200).json({ message: 'Insumo excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir insumo:', error.message);
    res.status(500).json({ error: 'Erro ao excluir insumo!' });
  }
};

module.exports = {
  cadastrarInsumos,
  listarInsumos,
  atualizarInsumos,
  excluirInsumos,
};