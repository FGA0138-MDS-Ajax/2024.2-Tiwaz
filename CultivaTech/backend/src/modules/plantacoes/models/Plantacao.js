const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');


const Plantacao = sequelize.define('Plantacao', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areaPlantada: {
    type: DataTypes.FLOAT,
    allowNull: true, // Opcional
  },
  quantidadePlantada: {
    type: DataTypes.INTEGER,
    allowNull: true, // Opcional
  },
  dataPlantio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  custoInicial: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Plantacao;
