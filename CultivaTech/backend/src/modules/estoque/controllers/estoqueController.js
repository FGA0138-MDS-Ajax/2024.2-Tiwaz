// Camada que vai ter todas as funcoes da aplicacao

const estoqueService = require('../services/estoqueService');


const cadastrarProdutoEstoque = async (req, res) => { // Funcao que vai receber a requisicao POST, chamar a service para cadastrar e verificar, e retornar a resposta
  try { 
    const { nomeDoProduto, dataValidade, unidadeMedida, quantidadeProdutoEstoque, custoProduto, dataCompraProduto } = req.body;


    const novoProduto = await estoqueService.cadastrarProdutoEstoque({
        nomeDoProduto,
        dataValidade,
        unidadeMedida,
        quantidadeProdutoEstoque,
        custoProduto,
        dataCompraProduto,
    });

    res.status(201).json({ 
      message: 'Produto cadastrado com sucesso!', 
      produto: novoProduto, 
    });
  } catch (error) { // Se houver erro
    console.error('Erro ao cadastrar o produto:', error.message);
    res.status(500).json({ error: 'Erro ao cadastrar o produto!' });
  }
};


const listarProdutosEstoque = async (req, res) => { // Funcao que vai receber a requisicao GET, chamar a service para listar e verificar, e retornar a resposta
  try {
    const produtos = await estoqueService.listarProdutosEstoque();
    res.status(200).json(produtos); 
  } catch (error) { 
    console.error('Erro ao listar os produtos:', error.message); 
    res.status(500).json({ error: 'Erro ao listar os produtos!' });
  }
};

// Atualizar uma Colheita
const editarProdutoEstoque = async (req, res) => { // Funcao que vai receber a requisicao PUT, chamar a service para editar e verificar, e retornar a resposta
  try {
    const { id } = req.params;
    const { nomeDoProduto, dataValidade, unidadeMedida, quantidadeProdutoEstoque, custoProduto, dataCompraProduto } = req.body;


    const produtoAtualizado = await estoqueService.editarProdutoEstoque(id, {
        nomeDoProduto,
        dataValidade,
        unidadeMedida,
        quantidadeProdutoEstoque,
        custoProduto,
        dataCompraProduto,
    });

    if (!produtoAtualizado) {
      return res.status(404).json({ error: 'Produto não encontrado!' });
    }

    res.status(200).json({
      message: 'Produto atualizado com sucesso!',
      produto: produtoAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualiza o produto:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar o produto!' });
  }
};


const excluirProdutoEstoque = async (req, res) => { // Funcao que vai receber a requisicao DELETE, chamar a service para excluir e verificar, e retornar a resposta
  try {
    const { id } = req.params;


    const produtoExcluido = await estoqueService.excluirProdutoEstoque(id);

    if (!produtoExcluido) {
      return res.status(404).json({ error: 'Produto não encontrado!' });
    }

    res.status(200).json({ message: 'Produto excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir o produto:', error.message);
    res.status(500).json({ error: 'Erro ao excluir o produto!' });
  }
};

module.exports = {
    cadastrarProdutoEstoque,
    listarProdutosEstoque,
    editarProdutoEstoque,
    excluirProdutoEstoque,
};
