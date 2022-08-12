const express = require('express');
const router = express.Router();

const { paymentPost } = require('../controllers/payment.controller');

router.route('/deposit/apex/payment').post(paymentPost);

module.exports = router;