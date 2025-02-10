const express = require('express');
const router = express.Router();
const plantacaoController = require('../controllers/plantacaoController');

// Rotas do CRUD
router.post('/', plantacaoController.cadastrarPlantacao); // CREATE
router.get('/', plantacaoController.listarPlantacoes); // READ (ALL)
router.put('/:id', plantacaoController.atualizarPlantacao); // UPDATE
router.delete('/:id', plantacaoController.excluirPlantacao); // DELETE
router.patch("/:id/fechar", plantacaoController.fecharPlantacao); // Rota de fechamento

module.exports = router;
