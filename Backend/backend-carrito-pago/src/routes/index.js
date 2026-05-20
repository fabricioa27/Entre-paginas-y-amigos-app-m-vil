const express = require('express');
const router = express.Router();

const cartRoutes = require('./cartRoutes');
const paymentRoutes = require('./paymentRoutes');

router.use('/cart', cartRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;
