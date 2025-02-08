const validarDadosInsumo = (dadosInsumo) => {
    const { 
        nome, 
        unidadeMedida, 
        quantidade, 
        valor, 
        dataUso, 
        idPlantacao 
    } = dadosInsumo;
  
    // Verifica campos obrigatórios
    if (
      !nome || 
      !unidadeMedida || 
      !quantidade || 
      !valor || 
      !dataUso || 
      !idPlantacao
    ) {
      return { valido: false, mensagem: "Todos os campos são obrigatórios!" };
    }
  
    // Valida tipos (ex: quantidade deve ser número)
    if (isNaN(quantidade) || isNaN(valor)) {
      return { valido: false, mensagem: "Campos numéricos inválidos!" };
    }
  
    return { valido: true };
  };
  
  module.exports = validarDadosInsumo; // Exporta a função diretamente!