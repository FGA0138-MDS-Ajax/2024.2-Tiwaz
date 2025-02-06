const validarItemEstoque = (dadosProduto) => {
    const {
        nomeDoProduto,
        unidadeMedida,
        quantidadeProdutoEstoque,
        custoProduto,
        dataCompraProduto,
    } = dadosProduto;

    // Verifica campos obrigatórios
    if (
        !nomeDoProduto ||
        !unidadeMedida ||
        !quantidadeProdutoEstoque ||
        !custoProduto ||
        !dataCompraProduto
    ) {
        return { valido: false, mensagem: "Todos os campos são obrigatórios!" };
    }

    // Valida tipos (ex: quantidade deve ser número)
    if (isNaN(quantidadeProdutoEstoque) || isNaN(custoProduto)) {
        return { valido: false, mensagem: "Campos numéricos inválidos!" };
    }

    return { valido: true };
};

module.exports = validarItemEstoque; // Exporta a função diretamente!