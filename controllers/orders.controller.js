const db = require('../database');

exports.ordersGet = async (req, res) => {
    await db.query('SELECT * FROM deposit WHERE user_id = ?', [req.body.user_id], async (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            await db.query('SELECT * FROM withdraw WHERE user_id = ?', [req.body.user_id], (err, rows1) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json({
                        deposit: rows,
                        withdraw: rows1
                    });
                }
            })
        }
    })
}