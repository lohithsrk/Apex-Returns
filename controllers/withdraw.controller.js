const { v4: uuidv4 } = require('uuid');

const db = require('../database');

exports.withdrawPost = async (req, res) => {
    const { amount, user_id, upi_id } = req.body;
    await db.query('INSERT INTO withdraw SET id = ?, amount = ?, user_id = ?, upi_id = ?, created_at = ?', [uuidv4(), amount, user_id, upi_id, new Date()], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error');
        }
        res.json({ message: 'Withdraw request raised. Money will be credited tou your account soon.' });
    });
}