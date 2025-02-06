const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

// Rotas do CRUD
router.post('/', estoqueController.cadastrarProdutoEstoque); // CREATE
router.get('/', estoqueController.listarProdutosEstoque); // READ (ALL)
router.put('/:id', estoqueController.editarProdutoEstoque); // UPDATE
router.delete('/:id', estoqueController.excluirProdutoEstoque); // DELETE

module.exports = router;
