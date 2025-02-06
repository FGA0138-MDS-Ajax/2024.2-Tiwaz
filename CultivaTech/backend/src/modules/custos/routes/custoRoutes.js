const express = require('express');
const router = express.Router();
const custosController = require('../controllers/custosController');

// Rotas do CRUD
router.post('/', custosController.cadastrarCusto); // CREATE
router.get('/', custosController.listarCustos); // READ (ALL)
router.put('/:id', custosController.atualizarCusto); // UPDATE
router.delete('/:id', custosController.excluirCusto); // DELETE

module.exports = router;
