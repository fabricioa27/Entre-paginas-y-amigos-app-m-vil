const express = require('express');
const router = express.Router();

const {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');

router.post('/add', addToCart);
router.get('/', getCart);
router.delete('/remove/:id', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;
