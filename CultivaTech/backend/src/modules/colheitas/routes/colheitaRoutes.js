const express = require('express');
const router = express.Router();
const colheitaController = require('../controllers/colheitaController');

// Rotas do CRUD
router.post('/', colheitaController.cadastrarColheita); // CREATE
router.get('/', colheitaController.listarColheitas); // READ (ALL)
router.put('/:id', colheitaController.editarColheita); // UPDATE
router.delete('/:id', colheitaController.excluirColheita); // DELETE

module.exports = router;
