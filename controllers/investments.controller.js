const { v4: uuidv4 } = require('uuid');

const db = require('../database');

exports.investmentGet = async (req, res) => {
    await db.query('SELECT * FROM investments WHERE user_id = ?', [req.params.user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.json(result);
    })
}

exports.investmentPost = async (req, res) => {
    await db.query('INSERT INTO investments SET id = ?, user_id = ?, investment_id = ?, created_at = ?', [uuidv4(), req.params.user_id, req.body.investment_id, new Date()], async (err, resul1) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        await db.query('SELECT * FROM user WHERE id = ?', [req.params.user_id], async (err, result2) => {
            await db.query('UPDATE user SET total_apex = ? WHERE id = ?', [result2[0].total_apex - req.body.amount, req.params.user_id], (err, result3) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.json({
                    message: 'Investment created',
                    user: result2[0]
                });
            })
        })
    })
}