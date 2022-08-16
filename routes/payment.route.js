const express = require('express');
const router = express.Router();

const { paymentPost, createDepositBackup } = require('../controllers/payment.controller');

router.route('/deposit/apex/payment').post(paymentPost).put(createDepositBackup)

module.exports = router;