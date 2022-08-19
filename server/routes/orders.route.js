const express = require('express');
const router = express.Router();

const { ordersGet } = require('../controllers/orders.controller');

router.route('/orders').post(ordersGet)

module.exports = router;