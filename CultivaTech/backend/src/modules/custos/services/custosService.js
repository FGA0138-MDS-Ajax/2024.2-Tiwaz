const Custos = require('../models/custosModels');
const validarCusto = require('../middlewares/custosMiddleware');

// Cadastrar custo
const cadastrarCusto = async (dados) => {
  const validacao = validarCusto(dados);
  if (!validacao.valido) {
    throw new Error(validacao.mensagem);
  }
  return await Custos.create(dados);
};

// Listar Custos
const listarCustos = async () => {
  return await Custos.findAll();
};

// Atualizar Custos
const atualizarCustos = async (id, dados) => {
  const validacao = validarCusto(dados);
  if (!validacao.valido) {
    throw new Error(validacao.mensagem);
  }
  
  const custo = await Custos.findByPk(id);

  if (!custo) return null;

  await custo.update(dados);
  return custo;
};

// Excluir Custo
const excluirCusto = async (id) => {
  const custo = await Custos.findByPk(id);

  if (!custo) return null;

  await custo.destroy();
  return true;
};

module.exports = {
    cadastrarCusto,
    listarCustos,
    atualizarCustos,
    excluirCusto,
};
