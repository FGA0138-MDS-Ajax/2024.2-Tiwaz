const validarDadosColheita = (dadosColheita) => {
  const {  
    qualidadeColheita, 
    dataColheita, 
    medidaColheita, 
    quantidadeColheita, 
    custoColheita, 
    idPlantacao 
  } = dadosColheita;

  // Verifica campos obrigatórios
  if (
    !qualidadeColheita || 
    !dataColheita || 
    !medidaColheita || 
    !quantidadeColheita || 
    !custoColheita || 
    !idPlantacao
  ) {
    return { valido: false, mensagem: "Todos os campos são obrigatórios!" };
  }

  // Valida tipos (ex: quantidade deve ser número)
  if (isNaN(quantidadeColheita) || isNaN(custoColheita)) {
    return { valido: false, mensagem: "Campos numéricos inválidos!" };
  }

  return { valido: true };
};

module.exports = validarDadosColheita; // Exporta a função diretamente!