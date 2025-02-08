const { Plantacao, Insumos, Colheita } = require('../../index');
const validarDadosPlantacao = require('../middlewares/plantacaoMiddleware');

// Cadastrar Plantação
const cadastrarPlantacao = async (dados) => {
  const validacao = validarDadosPlantacao(dados);
  if (!validacao.valido) {
    throw new Error(validacao.mensagem);
  }
  return await Plantacao.create(dados);
};

// Listar Plantações
const listarPlantacoes = async () => {
  return await Plantacao.findAll({
    include: [
      {
      model: Insumos,
      as: 'insumos',
     },
     {
      model: Colheita,
      as: 'colheitas',
     },
  ]
  });
};

// Atualizar Plantação
const atualizarPlantacao = async (id, dados) => {
  const validacao = validarDadosPlantacao(dados);
  if (!validacao.valido) {
    throw new Error(validacao.mensagem);
  }
  const plantacao = await Plantacao.findByPk(id);

  if (!plantacao) return null;

  await plantacao.update(dados);
  return plantacao;
};

// Excluir Plantação
const excluirPlantacao = async (id) => {
  const plantacao = await Plantacao.findByPk(id);

  if (!plantacao) return null;

  await plantacao.destroy();
  return true;
};



module.exports = {
  cadastrarPlantacao,
  listarPlantacoes,
  atualizarPlantacao,
  excluirPlantacao,
};
