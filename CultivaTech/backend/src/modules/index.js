// models/index.js
const Plantacao = require('./plantacoes/models/Plantacao');
const Insumos = require('./insumos/models/insumoModel');

// Monta um objeto com os modelos
const models = {
  Plantacao,
  Insumos,
};

// Executa as associações, se os métodos existirem
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;