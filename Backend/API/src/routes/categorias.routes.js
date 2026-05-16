const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categorias.controller');

router.get('/', categoriaController.findAll);
router.get('/:id', categoriaController.findOne);
router.post('/', categoriaController.create);
router.put('/:id', categoriaController.update);

module.exports = router;