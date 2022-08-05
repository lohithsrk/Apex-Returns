const db = require('../database');

exports.ordersGet = async (req, res) => {
    await db.query('SELECT * FROM deposit where verification = ? AND user_id = ?', [req.body.status, req.body.user_id], (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(rows);
        }
    })
}