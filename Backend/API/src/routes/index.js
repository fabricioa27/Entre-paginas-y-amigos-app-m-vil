const express = require('express');
const router = express.Router();

const usuarioRouter = require('./usuarios.routes');
const productoRouter = require('./productos.routes');
const categoriaRouter = require('./categorias.routes');

router.use('/usuarios', usuarioRouter);
router.use('/productos', productoRouter);
router.use('/categorias', categoriaRouter);

module.exports = router;