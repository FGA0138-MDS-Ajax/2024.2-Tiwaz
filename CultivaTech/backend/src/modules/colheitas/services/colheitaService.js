// Camada responsavel pelo logica de negocio da aplicacao (apenas as funcoes basicas)

const tabelaColheita = require('../models/colheitaModel');
const validarDadosColheita = require('../middlewares/colheitaMiddleware');

// Cadastrar uma nova Colheita no banco de dados
const cadastrarColheita = async (dadosColheita) => { // Função que vai cadastrar uma nova colheita no banco de dados
    const validacao = validarDadosColheita(dadosColheita);
    if (!validacao.valido) {
        throw new Error(validacao.mensagem); // Lança um erro para ser tratado no controller
    }
    return await tabelaColheita.create(dadosColheita);
};

// Listar todas as colheitas Cadastradas
const listarColheitas = async () => { // Função que vai listar todas as colheitas cadastradas
    return await tabelaColheita.findAll(); // Retorna todas as colheitas cadastradas no banco
};

// Editar um colheita cadastrada
const editarColheita = async (id, dadosColheita) => { // Função que vai editar uma colheita cadastrada
    const validacao = validarDadosColheita(dadosColheita);
    if (!validacao.valido) {
        throw new Error(validacao.mensagem); // Lança um erro para ser tratado no controller
    }
    
    const colheita = await tabelaColheita.findByPk(id); // Busca a colheita pelo id

    if (!colheita) return null; // Se a colheita não existir, retorna null

    await colheita.update(dadosColheita); // Atualiza a colheita com os novos dados
    return colheita; // Retorna a colheita atualizada
};

// Excluir uma colheita do banco
const excluirColheita = async (id) => { // Função que vai excluir uma colheita do banco
    const colheita = await tabelaColheita.findByPk(id); // Busca a colheita pelo id

    if (!colheita) return null; // Se a colheita não existir, retorna null

    await colheita.destroy(); // Exclui a colheita do banco
    return true; // Retorna true
};

module.exports = {
    cadastrarColheita,
    listarColheitas,
    editarColheita,
    excluirColheita,
};
