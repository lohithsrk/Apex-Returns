const express = require('express');
const router = express.Router();

const { changeUPI, UIPGet, withdrawRequestsGet, withdrawRequestsPost, depositVerificationGet, depositVerificationPost } = require('../controllers/admin.controller');

router.route('/admin/changeUPI').post(changeUPI).get(UIPGet)
router.route('/admin/withdraw').post(withdrawRequestsPost).get(withdrawRequestsGet)
router.route('/admin/deposit').post(depositVerificationPost).get(depositVerificationGet)

module.exports = router;