const express = require('express');
const router = express.Router();
const previsaoController = require('./previsaoController');

// Rota combinada para obter localização e previsão
router.get('/', previsaoController.getFiveDayForecast);

module.exports = router;