const express = require('express');
const router = express.Router();

const { referGet } = require('../controllers/reference.controller');

router.route('/reference/:user_id').get(referGet)

module.exports = router;