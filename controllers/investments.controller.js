const { v4: uuidv4 } = require('uuid');

const db = require('../database');

exports.investmentGet = async (req, res) => {
    await db.query('SELECT * FROM investments WHERE user_id = ?', [req.params.user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log(result);
        res.json(result);
    })
}

exports.investmentPost = async (req, res) => {

    await db.query('SELECT investment_id FROM investments WHERE investment_id = ?', [req.body.investment_id], async (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (response.length > 1) {
            return res.status(400).json('You already invested in this plan');
        } else {

            if (req.body.investment_id) {
                await db.query('SELECT * FROM reference WHERE id = ?', [req.body.investment_id], async (err, result1) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                    if (result1.length >= 0 && result1[0].isFirstTransactionMade == 0) {
                        await db.query('UPDATE reference SET isFirstTransactionMade = 1 WHERE id = ?', [req.body.investment_id], async (err, result2) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json(err);
                            }

                            await db.query('UPDATE user SET total_apex = total_apex + ? WHERE id = ?', [50, req.body.user_id], async (err, result3) => {
                            })
                        })
                    }

                })
            }


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
    })
}