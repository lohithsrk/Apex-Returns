const express = require('express');
const router = express.Router();

const { referPost } = require('../controllers/reference.controller');

router.route('/reference').post(referPost)

module.exports = router;