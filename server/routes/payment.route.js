const express = require('express');
const router = express.Router();

const { paymentPost } = require('../controllers/payment.controller');

router.route('/deposite/apex/payment', paymentPost)

module.exports = router;