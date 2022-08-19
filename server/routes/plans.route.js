const express = require('express');
const router = express.Router();

const { plansGet, userPlansGet } = require('../controllers/plans.controller');

router.route('/plans').get(plansGet)
router.route('/plans/:user_id').get(userPlansGet)

module.exports = router;