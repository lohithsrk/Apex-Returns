const express = require('express');

const router = express.Router();

const { loginGet, loginPost, signupPost } = require('../controllers/auth.controller');

router.route('/login').get(loginGet).post(loginPost)
router.route('/signup').post(signupPost)

module.exports = router;