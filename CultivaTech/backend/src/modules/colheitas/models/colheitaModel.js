const { DataTypes } = require('sequelize'); // Importa o DataTypes do sequelize
const sequelize = require('../../../config/database'); // Importa a conexão com o banco de dados

const tabelaColheita = sequelize.define('tabelaColheita', { // Define o modelo de dados da colheita
  qualidadeColheita: { // Qualidade da Colheita
    type: DataTypes.INTEGER, // Tipo Inteiro
    allowNull: false, // Não pode ser nulo
  },
  dataColheita: { // Data da Colheita
    type: DataTypes.STRING, // Tipo data mas como uma String
    allowNull: false, // Não pode ser nulo
  },
  medidaColheita: { // medida da Colheita
    type: DataTypes.STRING, // Tipo Float
    allowNull: false, // Não pode ser nulo 
  },
  quantidadeColheita: { // Quantidade da Colheita
    type: DataTypes.FLOAT, // Tipo Float
    allowNull: false, // Não pode ser nulo
  },
  custoColheita: { // custo da Colheita
    type: DataTypes.FLOAT, // Tipo FLOAT
    allowNull: false, // Não pode ser nulo 
  },
  valorVendaColheita: { // Valor de venda da colheita
    type: DataTypes.FLOAT, // Tipo float
    allowNull: false, // Não pode ser nulo
  },
  plantacaoId: { // ID da plantação
    type: DataTypes.INTEGER, // Tipo Inteiro
    allowNull: false, // Não pode ser nulo
  },
});

module.exports = tabelaColheita; // Exporta o modelo de dados da colheita
