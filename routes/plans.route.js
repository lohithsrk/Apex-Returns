const express = require('express');
const router = express.Router();

const { plansGet } = require('../controllers/plans.controller');

router.route('/plans').get(plansGet)

module.exports = router;