// Camada que vai ter todas as funcoes da aplicacao

const colheitaService = require('../services/colheitaService');

// Cadastrar Colheita
const cadastrarColheita = async (req, res) => { 
  try { 
    const { qualidadeColheita, dataColheita, medidaColheita, quantidadeColheita, custoColheita, valorVendaColheita, plantacaoId } = req.body;

    // Chama o serviço para cadastrar a colheita
    const novaColheita = await colheitaService.cadastrarColheita({
        qualidadeColheita,
        dataColheita,
        medidaColheita,
        quantidadeColheita,
        custoColheita,
        valorVendaColheita,
        plantacaoId,
    });

    res.status(201).json({ // Retorna o status 201 (Created) e a mensagem de sucesso
      message: 'Custo cadastrado com sucesso!', // Mensagem
      colheita: novaColheita, // Colheita criada
    });
  } catch (error) { // Se houver erro
    console.error('Erro ao cadastrar a colheita:', error.message);
    res.status(500).json({ error: 'Erro ao cadastrar a colheita!' });
  }
};

// Listar Colheitas
const listarColheitas = async (req, res) => {
  try {
    // Chama o serviço para listar todas os custos
    const colheitas = await colheitaService.listarColheitas();
    res.status(200).json(colheitas); // Retorna o status 200 (OK) e a lista de colheitas
  } catch (error) { // Se houver erro
    console.error('Erro ao listar as colheitas:', error.message); 
    res.status(500).json({ error: 'Erro ao listar as colheitas!' });
  }
};

// Atualizar uma Colheita
const editarColheita = async (req, res) => {
  try {
    const { id } = req.params;
    const { qualidadeColheita, dataColheita, medidaColheita, quantidadeColheita, custoColheita, valorVendaColheita, plantacaoId } = req.body;

    // Chama o serviço para atualizar a plantação
    const colheitaAtualizada = await colheitaService.editarColheita(id, {
        qualidadeColheita,
        dataColheita,
        medidaColheita,
        quantidadeColheita,
        custoColheita,
        valorVendaColheita,
        plantacaoId,
    });

    if (!colheitaAtualizada) {
      return res.status(404).json({ error: 'Colheita não encontrada!' });
    }

    res.status(200).json({
      message: 'Colheita atualizada com sucesso!',
      colheita: colheitaAtualizada,
    });
  } catch (error) {
    console.error('Erro ao atualizar a colheita:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar a colheita!' });
  }
};

// Excluir Colheita
const excluirColheita = async (req, res) => {
  try {
    const { id } = req.params;

    // Chama o serviço para excluir o custo
    const colheitaExcluida = await colheitaService.excluirColheita(id);

    if (!colheitaExcluida) {
      return res.status(404).json({ error: 'Colheita não encontrada!' });
    }

    res.status(200).json({ message: 'Colheita excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir a colheita:', error.message);
    res.status(500).json({ error: 'Erro ao excluir a colheita!' });
  }
};

module.exports = {
    cadastrarColheita,
    listarColheitas,
    editarColheita,
    excluirColheita,
};
