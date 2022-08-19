const express = require('express');

const router = express.Router();

const { investmentGet, investmentPost } = require('../controllers/investments.controller');

router.route('/investment/:user_id').get(investmentGet).post(investmentPost);

module.exports = router