const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Estoque = sequelize.define('Estoque', {
    id: {
        type: DataTypes.INTEGER, // Tipo inteiro
        autoIncrement: true, // Vai auto incrementar
        allowNull: false, // Não pode ser nulo
        primaryKey: true, // Chave primária
    },
    nomeDoProduto: { // Nome produto para cadastrar no estoque
        type: DataTypes.STRING, // Tipo string
        allowNull: false, // Não pode ser nulo       
    },
    dataValidade: { // Data de validade do produto
        type: DataTypes.STRING, // Tipo data
        allowNull: true, // Não pode ser nulo
    },
    unidadeMedida: { // Unidade de medida do produto
        type: DataTypes.STRING, // Tipo string
        allowNull: false, // Não pode ser nulo 
    },
    quantidadeProdutoEstoque: { // Quantidade de produto no estoque
        type: DataTypes.FLOAT, // Tipo string
        allowNull: false, // Não pode ser nulo 
    },
    custoProduto: { // Custo do produto do estoque
        type: DataTypes.FLOAT, // Tipo float
        allowNull: false, // Não pode ser nulo
    },
    dataCompraProduto: { // data de compra do produto
        type: DataTypes.STRING, // Tipo string
        allowNull: false, // Não pode ser nulo
    },
});

module.exports = Estoque;
