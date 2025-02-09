const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Plantacao = require('../../plantacoes/models/Plantacao');// Importa o módulo de plantação para usar como foreign key

const Custo = sequelize.define('Custo', {
  idCusto: {
    type: DataTypes.INTEGER, // Tipo inteiro
    autoIncrement: true, // Vai auto incrementar
    allowNull: false, // Não pode ser nulo
    primaryKey: true, // Chave primária
  },
  nome: { // Nome do custo
    type: DataTypes.STRING, // Tipo string
    allowNull: true, // Não pode ser nulo
  },
  data: { // Data do custo
    type: DataTypes.STRING, // Tipo data
    allowNull: true, // Não pode ser nulo
  },
  tipo: { // Tipo do custo
    type: DataTypes.STRING, // Tipo string
    allowNull: true, // Não pode ser nulo 
  },
  descricao: { // Descrição do custo
    type: DataTypes.STRING, // Tipo string
    allowNull: true, // Não pode ser nulo 
  },
  valor: {
    type: DataTypes.FLOAT, // Tipo float
    allowNull: true, // Não pode ser nulo
  },
  idPlantacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Plantacao, // O modelo que será referenciado
      key: 'idPlantacao'       // A chave na tabela Plantacao que será referenciada
    },
    onDelete: 'CASCADE', // Exclui os custos se o usuário for excluído
    onUpdate: 'CASCADE'  // Atualiza a chave se o id de Usuario mudar
  },

},
{
  tableName: 'Custo',  // Nome da tabela no banco de dados existente
  timestamps: false     // Definir como false se sua tabela não possui campos de data (createdAt, updatedAt)
});

module.exports = Custo;
