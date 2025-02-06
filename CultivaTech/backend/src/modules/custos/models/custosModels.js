const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Custos = sequelize.define('Custos', {
  id: {
    type: DataTypes.INTEGER, // Tipo inteiro
    autoIncrement: true, // Vai auto incrementar
    allowNull: false, // Não pode ser nulo
    primaryKey: true, // Chave primária
  },
  nomeDoCusto: { // Nome do custo
    type: DataTypes.STRING, // Tipo string
    allowNull: false, // Não pode ser nulo
  },
  dataDoCusto: { // Data do custo
    type: DataTypes.STRING, // Tipo data
    allowNull: false, // Não pode ser nulo
  },
  tipoDoCusto: { // Tipo do custo
    type: DataTypes.STRING, // Tipo string
    allowNull: false, // Não pode ser nulo 
  },
  descricaoDoCusto: { // Descrição do custo
    type: DataTypes.STRING, // Tipo string
    allowNull: false, // Não pode ser nulo 
  },
  valorDoCusto: {
    type: DataTypes.FLOAT, // Tipo float
    allowNull: false, // Não pode ser nulo
  },
});

module.exports = Custos;
