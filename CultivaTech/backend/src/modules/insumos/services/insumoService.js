const Insumos = require('../models/insumoModel');
const validarDadosInsumo = require('../middlewares/insumoMiddleware');

// Cadastrar insumo
const cadastrarInsumos = async (dadosInsumo) => {
  const validacao = validarDadosInsumo(dadosInsumo);
    if (!validacao.valido) {
        throw new Error(validacao.mensagem);
    }
    return await Insumos.create(dadosInsumo);
};

// Listar insumos
const listarInsumos = async () => {
    return await Insumos.findAll();
    }


// Atualizar insumo
const atualizarInsumos = async (id, dadosAtualizados) => {
  const validacao = validarDadosInsumo(dadosAtualizados);
    if (!validacao.valido) {
        throw new Error(validacao.mensagem);
    }
    const insumo = await Insumos.findByPk(id);

    if (!insumo) return null;

    await insumo.update(dadosAtualizados);
    return insumo;
};

// Excluir insumo
const excluirInsumos = async (id) => {
    const insumo = await Insumos.findByPk(id);

    if (!insumo) return null;

    await insumo.destroy();
    return true;
};

module.exports = {
  cadastrarInsumos,
  listarInsumos,
  atualizarInsumos,
  excluirInsumos,
};