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
            await db.query('UPDATE user SET amount = amount - ? WHERE id = ?', [req.body.amount, req.body.user_id], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error');
                } else {
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