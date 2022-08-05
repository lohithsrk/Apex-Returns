const { v4: uuidv4 } = require('uuid');

const db = require('../database')

exports.paymentPost = async (req, res) => {

    const { user_id, amount, reference_id } = req.body;
    await db.query('INSERT INTO deposit SET id = ?, user_id = ?, reference_id = ?, amount = ?, verification = ?, created_at = ?', [uuidv4(), user_id, reference_id, amount, 'pending', new Date()], (err, result) => {
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