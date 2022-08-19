const { v4: uuidv4 } = require('uuid');

const db = require('../database');

exports.withdrawPost = async (req, res) => {
    const { amount, user_id, upi_id, name, IFSC, accountNum } = req.body;
    const taxDeductedAmount = amount - amount * 0.08;
    await db.query('INSERT INTO withdraw SET id = ?, amount = ?, user_id = ?, upi_id = ?,name =? , IFSC =? , accountNum =?  created_at = ?', [uuidv4(), taxDeductedAmount, user_id, upi_id, name, IFSC, accountNum, new Date()], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error');
        }

        res.json({ message: 'Withdraw request raised. Money will be credited tou your account soon.' });
    });
}