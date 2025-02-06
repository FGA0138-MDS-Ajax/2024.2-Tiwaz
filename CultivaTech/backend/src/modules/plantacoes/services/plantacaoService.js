const Plantacao = require('../models/Plantacao');

// Cadastrar Plantação
const cadastrarPlantacao = async (dados) => {
  return await Plantacao.create(dados);
};

// Listar Plantações
const listarPlantacoes = async () => {
  return await Plantacao.findAll();
};

// Atualizar Plantação
const atualizarPlantacao = async (id, dados) => {
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
