const express = require('express');
const router = express.Router();
const relatoriosController = require('../relatoriosController/relatoriosController');

// Rota para geração de relatório específico por ID da plantação
router.get('/:id', relatoriosController.gerarRelatorioPlantacao);

module.exports = router;