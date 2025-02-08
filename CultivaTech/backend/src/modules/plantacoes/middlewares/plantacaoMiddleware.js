const validarDadosPlantacao = (dadosPlantacao) => {
  const { 
      nome, 
      tipoCultura, 
      unidadeMedida, 
      qtdPlantada,  
      dataPlantio,
  } = dadosPlantacao;

  // Verifica campos obrigatórios
  if (
    !nome || 
    !tipoCultura || 
    !unidadeMedida || 
    !qtdPlantada || 
    !dataPlantio 
  ) {
    return { valido: false, mensagem: "Todos os campos são obrigatórios!" };
  }

  // Valida tipos (ex: quantidade deve ser número)
  if (isNaN(qtdPlantada)) {
    return { valido: false, mensagem: "Campos numéricos inválidos!" };
  }

  return { valido: true };
};

module.exports = validarDadosPlantacao; // Exporta a função diretamente!