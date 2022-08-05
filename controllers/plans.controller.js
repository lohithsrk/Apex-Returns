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