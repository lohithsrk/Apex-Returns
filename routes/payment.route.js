const express = require('express');
const router = express.Router();

const { paymentPost, verifyDeposit } = require('../controllers/payment.controller');

router.route('/deposit/apex/payment').post(paymentPost).put(verifyDeposit)

module.exports = router;