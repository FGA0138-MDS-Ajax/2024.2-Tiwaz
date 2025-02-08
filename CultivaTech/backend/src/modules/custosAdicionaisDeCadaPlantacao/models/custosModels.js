const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Plantacao = require('../../plantacoes/models/Plantacao');

const CustosAdicionais = sequelize.define('CustosAdicionais', {
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
  idPlantacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Plantacao,
      key: 'idPlantacao',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
},
    {
      tableName: 'CustosAdicionais',
      timestamps: false,
    }
);

CustosAdicionais.associate = (models) => {
  CustosAdicionais.belongsTo(models.Plantacao, {
      foreignKey: 'idPlantacao',
      as: 'plantacao',
    });
  };



module.exports = CustosAdicionais;
