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
    await db.query('SELECT * FROM withdraw WHERE aproved = "Pending"', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.json(result);
        }
    })
}

exports.withdrawRequestsPost = async (req, res) => {
}