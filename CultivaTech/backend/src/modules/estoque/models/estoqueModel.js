const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Insumo = sequelize.define('Insumo', {
    idInsumo: {
        type: DataTypes.INTEGER, // Tipo inteiro
        autoIncrement: true, // Vai auto incrementar
        allowNull: false, // Não pode ser nulo
        primaryKey: true, // Chave primária
    },
    nome: { // Nome produto para cadastrar no estoque
        type: DataTypes.STRING, // Tipo string
        allowNull: true, // Não pode ser nulo       
    },
    validade: { // Data de validade do produto
        type: DataTypes.STRING, // Tipo data
        allowNull: true, // Não pode ser nulo
    },
    unidadeMedida: { // Unidade de medida do produto
        type: DataTypes.STRING, // Tipo string
        allowNull: true, // Não pode ser nulo 
    },
    quantidade: { // Quantidade de produto no estoque
        type: DataTypes.FLOAT, // Tipo string
        allowNull: true, // Não pode ser nulo 
    },
    custo: { // Custo do produto do estoque
        type: DataTypes.FLOAT, // Tipo float
        allowNull: true, // Não pode ser nulo
    },
    dataCompra: { // data de compra do produto
        type: DataTypes.STRING, // Tipo string
        allowNull: true, // Não pode ser nulo
    },
    emEstoque: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},
{
    tableName: 'Insumo',  // Nome da tabela no banco de dados existente
    timestamps: false     // Definir como false se sua tabela não possui campos de data (createdAt, updatedAt)
});

module.exports = Insumo;
