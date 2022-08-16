const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const db = require('../database')

exports.paymentPost = async (req, res) => {

    const { user_id, amount } = req.body;

    var data = JSON.stringify({
        "key": `${process.env.PAYMENT_KEY}`,
        "client_txn_id": uuidv4(),
        "amount": `${amount}`,
        "p_info": `${amount} APEX`,
        "customer_name": `${user_id}`,
        "customer_email": `${user_id}@gmail.com`,
        "customer_mobile": `${user_id}`,
        "redirect_url": "https://apexreturns.com/deposit/apex/payment",
    });

    var config = {
        method: 'post',
        url: 'https://merchant.upigateway.com/api/create_order',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(async (response) => {
            res.json(response.data.data.payment_url);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// exports.createDepositBackup = async (req, res) => {
//     const { user_id, reference_id,amount } = req.body;

//     await db.query('INSERT INTO deposit SET id = ?, user_id = ?, reference_id = ?, amount = ?, verification = ?, created_at = ?', [uuidv4(), user_id, reference_id, amount, 'pending', new Date()], (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({
//                 message: 'Error',
//                 error: err
//             });
//         }
//         console.log('sdfsfds');
//         return res.status(200).json({
//             message: 'Success',
//             data: result
//         });
//     })
// }