const express = require('express');
const router = express.Router();

const { withdrawPost } = require('../controllers/withdraw.controller');

router.route('/withdraw').post(withdrawPost);

module.exports = router;