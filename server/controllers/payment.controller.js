const { v4: uuidv4 } = require('uuid');

const db = require('../database')

exports.paymentPost = async (req, res) => {

    const { user_id, amount, reference_id } = req.body;

    await db.query('INSERT INTO deposite SET user_id = ?, amount = ?, reference_id = ?, created_at = ?', [user_id, amount, reference_id, new Date()], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error',
                error: err
            });
        }
        return res.status(200).json({
            message: 'Success',
            data: result
        });
    })
}