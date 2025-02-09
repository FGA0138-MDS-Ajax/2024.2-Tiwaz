const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Plantacao = sequelize.define('Plantacao', {
  idPlantacao: {
    type: DataTypes.INTEGER, // Tipo inteiro
    autoIncrement: true, // Vai auto incrementar
    allowNull: false, // Não pode ser nulo
    primaryKey: true, // Chave primária
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipoCultura: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unidadeMedida: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  qtdPlantada: {
    type: DataTypes.FLOAT,
    allowNull: true, // Opcional
  },
  custoInicial: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  dataPlantio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fechamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
{
  tableName: 'Plantacao',  // Nome da tabela no banco de dados existente
  timestamps: true     // Definir como false se sua tabela não possui campos de data (createdAt, updatedAt)
}
);

Plantacao.associate = (models) => {
  Plantacao.hasMany(models.Insumos, {
    foreignKey: 'idPlantacao',
    as: 'insumos', // alias para facilitar o acesso
  });

  Plantacao.hasMany(models.Colheita, {
    foreignKey: 'idPlantacao',
    as: 'colheitas', // alias para facilitar o acesso
  });

  Plantacao.hasMany(models.CustosAdicionais, {
    foreignKey: 'idPlantacao',
    as: 'custosAdicionais', // alias para facilitar o acesso
  });
};






module.exports = Plantacao;