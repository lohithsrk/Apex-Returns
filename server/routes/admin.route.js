const express = require('express');
const router = express.Router();

const { changeUPI, UIPGet, withdrawRequestsGet, withdrawRequestsPost, depositVerificationGet, depositVerificationPost, addPromoter, promotersGet } = require('../controllers/admin.controller');

router.route('/admin/changeUPI').post(changeUPI).get(UIPGet)
router.route('/admin/withdraw').post(withdrawRequestsPost).get(withdrawRequestsGet)
router.route('/admin/deposit').post(depositVerificationPost).get(depositVerificationGet)
router.route('/admin/promoters').post(addPromoter).get(promotersGet)

module.exports = router;