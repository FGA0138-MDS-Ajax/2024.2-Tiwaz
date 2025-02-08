const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');



const custosRoutes = require('./src/modules/custos/routes/custoRoutes.js');
const colheitaRoutes = require('./src/modules/colheitas/routes/colheitaRoutes.js');
const plantacaoRoutes = require('./src/modules/plantacoes/routes/plantacaoRoutes.js');
const previsaoRoutes = require('./src/modules/previsaoDoTempo/previsaoRoutes.js');
const estoqueRoutes = require('./src/modules/estoque/routes/estoqueRoutes.js');
const notificationRoutes = require('./src/modules/notifications/routes/notificationRoutes');
const relatoriosRoutes = require('./src/modules/relatorios/relatoriosRoutes/relatoriosRoutes.js');
const insumoRoutes = require('./src/modules/insumos/routes/insumoRoutes.js');

const sequelize = require('./src/config/database.js');

app.use(cors());
// Middleware para processar JSON no corpo da requisição
app.use(express.json());

// Middleware para processar dados codificados (form-urlencoded), se necessário
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/plantacoes', plantacaoRoutes);
app.use('/api/custos', custosRoutes);
app.use('/api/colheitas', colheitaRoutes);
app.use('/api/weather', previsaoRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/relatorios', relatoriosRoutes);
app.use('/api/insumos', insumoRoutes);



// Inicializar o banco de dados
sequelize.sync({ force: false }) // Use force: true apenas para recriar tabelas
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((err) => console.error('Erro ao sincronizar banco de dados:', err));

// Subir o servidor

app.listen(port, (error) => {
  if (error) {
    console.log('Deu erro');
    return;
  }
  console.log("Subiu show");
});
