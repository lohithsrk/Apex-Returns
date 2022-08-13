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
                    if (result1[0] && (result1.length >= 0 && result1[0].isFirstTransactionMade == 0)) {
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
                    await db.query('UPDATE user SET total_apex = ? WHERE id = ?', [result2[0].total_apex - req.body.amount, req.params.user_id], async (err, result3) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send(err);
                        }


                        await db.query('SELECT apex_plans.* FROM investments, apex_plans WHERE user_id = ? AND investments.investment_id = apex_plans.id', [req.params.user_id], (err, results1) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                });
                            }

                            const allInvestments = results1;
                            let currentDailyReturns = 0;
                            let amountObtainedAlready = 0;

                            allInvestments.forEach(async investment => {
                                const currentDate = new Date(investment.created_at);
                                let endDate = new Date(currentDate)
                                endDate.setDate(endDate.getDate() + investment.return_period);
                                const now = new Date()

                                if (now > endDate) {
                                    await db.query('DELETE FROM investments WHERE investment.investment_id = ? AND user_id = ?'), [investment.id, req.params.user_id], (err, results) => {
                                        if (err) {
                                            console.log(err);
                                            return res.status(500).json({
                                                error: err
                                            });
                                        }
                                    }
                                } else {
                                    let dateDifference = now - currentDate;
                                    const days = dateDifference / (1000 * 60 * 60 * 24)
                                    currentDailyReturns += investment.deposit_amount * investment.daily_returns / 100;
                                    console.log(currentDailyReturns);
                                    amountObtainedAlready += (investment.deposit_amount * (investment.daily_returns / 100)) * (days - 1);
                                }
                            });
                            return res.json({
                                isLoggedIn: true,
                                user: { ...result2[0], currentDailyReturns, amountObtainedAlready }
                            });
                        })
                    })
                })
            })
        }
    })
}