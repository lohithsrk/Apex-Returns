const express = require('express');
const router = express.Router();

const { changeUPI, UIPGet, withdrawRequestsGet, withdrawRequestsPost } = require('../controllers/admin.controller');

router.route('/admin/changeUPI').post(changeUPI).get(UIPGet)
router.route('/admin/withdraw').post(withdrawRequestsPost).get(withdrawRequestsGet)

module.exports = router;