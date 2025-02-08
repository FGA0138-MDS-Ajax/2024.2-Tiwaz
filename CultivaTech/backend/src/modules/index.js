// models/index.js
const Plantacao = require('./plantacoes/models/Plantacao');
const Insumos = require('./insumos/models/insumoModel');
const Colheita = require('./colheitas/models/colheitaModel');
const CustosAdicionais = require('./custosAdicionaisDeCadaPlantacao/models/custosModels');

// Monta um objeto com os modelos
const models = {
  Plantacao,
  Insumos,
  Colheita,
  CustosAdicionais,
};

Object.keys(models).forEach(modelName => {
  if (typeof models[modelName].associate === 'function') {
    models[modelName].associate(models);
  }
});


module.exports = models;