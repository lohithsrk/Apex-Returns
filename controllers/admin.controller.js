const db = require('../database');

exports.changeUPI = async (req, res) => {
    await db.query('UPDATE utilities SET upi_id = ? WHERE id = ?', [req.body.upi, 1], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.send('UPI changed');
        }
    })
}

exports.UIPGet = async (req, res) => {
    await db.query('SELECT upi_id FROM utilities WHERE id = ?', [1], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.json(result[0].upi_id);
        }
    })
}

exports.withdrawRequestsGet = async (req, res) => {
    await db.query('SELECT * FROM withdraw WHERE approved = "Pending"', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.json(result);
        }
    })
}

exports.withdrawRequestsPost = async (req, res) => {
    console.log(req.body);
    await db.query('UPDATE withdraw SET approved = ? WHERE id = ?', [req.body.approved, req.body.id], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error');
        } else {
            console.log(result);
            await db.query('UPDATE user SET amount = amount - ? WHERE id = ?', [req.body.amount, req.body.user_id], async (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error');
                } else {
                    const now = new Date()

                    await db.query('SELECT apex_plans.return_period, apex_plans.total_return ,investments.id, investments.expired, investments.created_at FROM investments, apex_plans WHERE user_id = ? AND investments.investment_id = apex_plans.id', [results[0].id], async (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                error: 'Something went wrong'
                            });
                        }

                        result.forEach(async r => {
                            if (r.expired === 0) {
                                if ((now - r.created_at) / (1000 * 60 * 60 * 24) > r.return_period) {
                                    await db.query('UPDATE investments SET expired = 1 WHERE id = ?', [r.id], async (err, re) => {
                                        if (err) {
                                            console.log(err);
                                            return res.status(500).json({
                                                error: 'Something went wrong'
                                            });
                                        }
                                    })
                                }
                            }


                            new Promise(async (myResolve, myReject) => {

                                await db.query('UPDATE user SET amount = 0 WHERE id = ?', [phone_number], (err, resu) => {
                                    if (err) {
                                        console.log(err);
                                        return res.status(500).json({
                                            error: 'Something went wrong'
                                        });
                                    }
                                    result.forEach(async r => {
                                        await db.query('UPDATE user SET amount = amount + ? WHERE id = ?', [r.total_return, phone_number], (err, resu) => {
                                            if (err) {
                                                console.log(err);
                                                return res.status(500).json({
                                                    error: 'Something went wrong'
                                                });
                                            }
                                        })
                                    })
                                    myResolve();
                                })
                            }).then(async value => {
                                await db.query('SELECT amount FROM withdraw WHERE user_id = ? AND approved = "approved"', [phone_number], async (err, resul) => {
                                    if (err) {
                                        console.log(err);
                                        return res.status(500).json({
                                            error: 'Something went wrong'
                                        });
                                    }
                                    const total = resul.reduce((prev, curr) => prev + curr.amount, 0);




                                    await db.query('SELECT apex_plans.*, investments.expired FROM investments, apex_plans WHERE user_id = ? AND investments.investment_id = apex_plans.id', [results[0].id], async (err, results1) => {
                                        if (err) {
                                            return res.status(500).json({
                                                error: err
                                            });
                                        }

                                        const allInvestments = results1;
                                        let amountObtainedAlready = 0;

                                        allInvestments.forEach(async investment => {
                                            const currentDate = new Date(investment.created_at);
                                            let endDate = new Date(currentDate)
                                            endDate.setDate(endDate.getDate() + investment.return_period);

                                            if (now < endDate) {

                                                let dateDifference = endDate - (now - currentDate);
                                                const days = dateDifference / (1000 * 60 * 60 * 24)

                                                amountObtainedAlready += (investment.deposit_amount * (investment.daily_returns / 100)) * (days - 1);
                                            }
                                        });
                                        await db.query('UPDATE user SET amount = amount - ? WHERE id = ?', [total - amountObtainedAlready, phone_number], (err, resu) => {
                                            if (err) {
                                                console.log(err);
                                                return res.status(500).json({
                                                    error: 'Something went wrong'
                                                });
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                    return res.send('Withdraw request approved');
                }
            })
        }
    })
}

exports.depositVerificationGet = async (req, res) => {
    await db.query('SELECT * from deposit WHERE verification = "pending"', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.json(result);
        }
    })
}

exports.depositVerificationPost = async (req, res) => {
    await db.query('UPDATE deposit SET verification = ? WHERE id = ?', [req.body.verification, req.body.id], async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            await db.query('UPDATE user SET amount = amount + ? WHERE id = ?', [req.body.amount, req.body.user_id], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error');
                } else {
                    res.send('Deposit verified');
                }
            })
        }
    })
}