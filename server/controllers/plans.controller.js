const db = require('../database');

exports.plansGet = async (req, res) => {
    await db.query('SELECT * FROM apex_plans', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        return res.status(200).send(results);
    });
}

exports.userPlansGet = async (req, res) => {
    await db.query('SELECT DISTINCT apex_plans.* FROM investments, apex_plans, user WHERE investments.user_id = ? AND investments.`investment_id` = apex_plans.id', [req.params.user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    })
}