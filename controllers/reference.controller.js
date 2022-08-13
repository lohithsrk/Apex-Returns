const db = require('../database')

exports.referGet = async (req, res) => {
    await db.query('SELECT * FROM reference WHERE referred_by = ?', [req.params.user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err)
        }

        return res.json({
            total_referrals: result.length,
            total_rewards: result.filter(r => r.isFirstTransactionMade === 1).length * 50
        })
    })
}