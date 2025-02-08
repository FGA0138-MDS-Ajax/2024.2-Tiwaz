const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumoController');

// Rotas do CRUD
router.post('/', insumoController.cadastrarInsumos); // CREATE
router.get('/', insumoController.listarInsumos); // READ (ALL)
router.put('/:id', insumoController.listarInsumos); // UPDATE
router.delete('/:id', insumoController.excluirInsumos); // DELETE

module.exports = router;