const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Plantacao = require('../../plantacoes/models/Plantacao');

const Insumos = sequelize.define('Insumos', {
    idInsumos: {
        type: DataTypes.INTEGER, // Tipo inteiro
        autoIncrement: true, // Vai auto incrementar
        allowNull: false, // Não pode ser nulo
        primaryKey: true, // Chave primária
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unidadeMedida: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    dataUso: {
        type: DataTypes.DATE,
        allowNull: false,
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
        tableName: 'Insumos',
        timestamps: false,
    }
);

Insumos.associate = (models) => {
    Insumos.belongsTo(models.Plantacao, {
      foreignKey: 'idPlantacao',
      as: 'plantacao',
    });
  };
  
module.exports = Insumos;