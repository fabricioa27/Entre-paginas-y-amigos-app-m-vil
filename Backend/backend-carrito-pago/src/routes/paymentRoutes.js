const express = require('express');
const router = express.Router();

const {
    checkout,
    getOrders,
    getOrderDetails
} = require('../controllers/paymentController');

router.post('/checkout', checkout);
router.get('/orders', getOrders);
router.get('/orders/:orderId/details', getOrderDetails);

module.exports = router;
