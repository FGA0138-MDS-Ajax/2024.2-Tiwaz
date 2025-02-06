const validarCusto = (dadosCusto) => {
    const {
      nomeDoCusto,
      dataDoCusto,
      tipoDoCusto,
      descricaoDoCusto,
      valorDoCusto,
    } = dadosCusto;

    // Verifica campos obrigatórios
    if (
        !nomeDoCusto ||
        !dataDoCusto ||
        !tipoDoCusto ||
        !descricaoDoCusto ||
        !valorDoCusto
    ) {
        return { valido: false, mensagem: "Todos os campos são obrigatórios!" };
    }

    // Valida tipos (ex: quantidade deve ser número)
    if (isNaN(valorDoCusto)) {
        return { valido: false, mensagem: "Campos numéricos inválidos!" };
    }

    return { valido: true };
};

module.exports = validarCusto; // Exporta a função diretamente!