const custosService = require('../services/custosService');

// Cadastrar Plantação
const cadastrarCusto = async (req, res) => {
  try {
    const { nomeDoCusto, dataDoCusto, tipoDoCusto, descricaoDoCusto, valorDoCusto } = req.body;

    // Chama o serviço para cadastrar o custo
    const novoCusto = await custosService.cadastrarCusto({
      nomeDoCusto,
      dataDoCusto,
      tipoDoCusto,
      descricaoDoCusto,
      valorDoCusto,
    });

    res.status(201).json({
      message: 'Custo cadastrado com sucesso!',
      custo: novoCusto,
    });
  } catch (error) {
    console.error('Erro ao cadastrar o custo:', error.message);
    res.status(500).json({ error: 'Erro ao cadastrar o custo!' });
  }
};

// Listar Custos
const listarCustos = async (req, res) => {
  try {
    // Chama o serviço para listar todas os custos
    const custos = await custosService.listarCustos();
    res.status(200).json(custos);
  } catch (error) {
    console.error('Erro ao listar os custos:', error.message);
    res.status(500).json({ error: 'Erro ao listar os custos!' });
  }
};

// Atualizar Custo
const atualizarCusto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeDoCusto, dataDoCusto, tipoDoCusto, descricaoDoCusto, valorDoCusto } = req.body;

    // Chama o serviço para atualizar a plantação
    const custoAtualizado = await custosService.atualizarCustos(id, {
      nomeDoCusto,
      dataDoCusto,
      tipoDoCusto,
      descricaoDoCusto,
      valorDoCusto,
    });

    if (!custoAtualizado) {
      return res.status(404).json({ error: 'Custo não encontrado!' });
    }

    res.status(200).json({
      message: 'Custo atualizado com sucesso!',
      custo: custoAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar o custo:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar o custo!' });
  }
};

// Excluir Custo
const excluirCusto = async (req, res) => {
  try {
    const { id } = req.params;

    // Chama o serviço para excluir o custo
    const custoExcluido = await custosService.excluirCusto(id);

    if (!custoExcluido) {
      return res.status(404).json({ error: 'Custo não encontrado!' });
    }

    res.status(200).json({ message: 'Custo excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir o custo:', error.message);
    res.status(500).json({ error: 'Erro ao excluir custo!' });
  }
};

module.exports = {
    cadastrarCusto,
    listarCustos,
    atualizarCusto,
    excluirCusto,
};
