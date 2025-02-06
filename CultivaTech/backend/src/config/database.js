const { Sequelize } = require('sequelize');

// Configure o Sequelize para o SQLite ou outro banco que você esteja usando
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/config/database.sqlite', // Caminho do arquivo do banco
});

module.exports = sequelize;
