const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

exports.loginGet = (req, res) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err)
                return res.status(401).json({
                    isLoggedIn: false,
                    error: 'Failed to authenticate token'
                });
            req.user = decoded;
            res.json({
                isLoggedIn: true,
                user: { ...decoded }
            })
        });
    } else {
        return res.status(401).json({
            error: 'No token provided'
        });
    }
}

exports.loginPost = async (req, res) => {
    const { phone_number, password } = req.body;
    await db.query('SELECT * FROM user WHERE phone_number = ?', [phone_number], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'No user found'
            });
        }
        if (results.length === 0)
            return res.status(401).json({
                error: 'Invalid email or password'
            });


        const user = results[0];
        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({
                error: 'Invalid email or password'
            });


        req.session.user = user;

        const token = jwt.sign({
            id: results[0].id,
            phone_number: results[0].phone_number,
            password: results[0].password,
            name: results[0].name,
            email: results[0].email,
            role: results[0].role,
            created_at: results[0].created_at,
            updated_at: results[0].updated_at

        }, process.env.SECRET, {
            expiresIn: 3000
        });

        await db.query('SELECT apex_plans.* FROM investments, apex_plans WHERE user_id = ? AND investments.investment_id = apex_plans.id', [results[0].id], (err, results1) => {
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
                    await db.query('DELETE FROM investments WHERE investment.investment_id = ? AND user_id = ?'), [investment.id, results[0].id], (err, results) => {
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
                    amountObtainedAlready += investment.deposit_amount * (investment.daily_returns / 100) * days;
                }
            });
            console.log(currentDailyReturns);
            return res.json({
                isLoggedIn: true,
                token: token,
                user: { ...user, currentDailyReturns, amountObtainedAlready }
            });
        })

    })
}

exports.signupPost = async (req, res) => {
    const { phone_number, password, referalID } = req.body;
    await db.query('SELECT * FROM user WHERE phone_number = ?', [phone_number], async (err, results) => {

        if (results && results.length > 0)
            return res.status(409).json({
                error: 'User already exists'
            });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await db.query('SELECT * FROM user WHERE id = ?', [referalID], async (err, results1) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: 'Invalid referal ID'
                });
            }
            if (results1.length === 0) {
                return res.status(409).json({
                    error: 'Invalid referal ID'
                });
            }

            const reference_id = uuidv4()

            await db.query('INSERT INTO user (id, phone_number, password, reference_id, created_at) VALUES (?, ?, ?, ?, ?)', [phone_number, phone_number, hash, (referalID ? reference_id : null), new Date()], async (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                }

                if (referalID) {
                    await db.query('INSERT INTO reference (id, referred_by, referred_to, isFirstTransactionMade, created_at) VALUES (?, ?, ?, ?, ?)', [reference_id, referalID, phone_number, false, new Date()], (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                error: 'Something went wrong'
                            });
                        }
                    })
                }

                await db.query('SELECT * FROM user WHERE phone_number = ?', [phone_number], (err, results) => {
                    if (err)
                        return res.status(500).json({
                            error: err
                        });

                    const user = results[0];
                    req.session.user = user;
                    const token = jwt.sign({
                        id: results[0].id,
                        phone_number: results[0].phone_number,
                        password: results[0].password,
                        name: results[0].name,
                        email: results[0].email,
                        created_at: results[0].created_at,
                        role: results[0].role,
                        updated_at: results[0].updated_at
                    }, process.env.SECRET, {
                        expiresIn: 3000
                    });

                    return res.json({
                        isLoggedIn: true,
                        token: token,
                        user: user
                    });
                });
            }
            );
        })


    });
}