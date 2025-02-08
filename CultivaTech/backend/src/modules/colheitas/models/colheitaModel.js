const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Plantacao = require('../../plantacoes/models/Plantacao');

const Colheita = sequelize.define('Colheita', {
    idColheita: {
        type: DataTypes.INTEGER, // Tipo inteiro
        autoIncrement: true, // Vai auto incrementar
        allowNull: false, // Não pode ser nulo
        primaryKey: true, // Chave primária
    },
    qualidadeColheita: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dataColheita: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    medidaColheita: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidadeColheita: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    custoColheita: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    valorVendaColheita: {
        type: DataTypes.FLOAT,
        allowNull: true,
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
        tableName: 'Colheita',
        timestamps: false,
    }
);

Colheita.associate = (models) => {
  Colheita.belongsTo(models.Plantacao, {
      foreignKey: 'idPlantacao',
      as: 'plantacao',
    });
  };
  
module.exports = Colheita;