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
        "redirect_url": "https://apexreturns.com/",
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

exports.verifyDeposit = async (req, res) => {
    const { client_txn_id, txn_id, user_id } = req.body;
    var axios = require('axios');
    var data = JSON.stringify({
        "key": `${process.env.PAYMENT_KEY}`,
        "client_txn_id": `${client_txn_id}`,
        "txn_date": `${new Date().getDate()}-${(new Date().getMonth()).toLocaleString().length === 1 ? '0' + (parseInt(new Date().getMonth()) + 1) : (parseInt(new Date().getMonth()) + 1)}-${new Date().getFullYear()}`
    });

    var config = {
        method: 'post',
        url: 'https://merchant.upigateway.com/api/check_order_status',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(async (response) => {
            if (response.data.data.status == 'success') {
                await db.query('UPDATE user SET total_apex = total_apex + ? WHERE id = ?', [response.data.data.amount, req.body.user_id], async (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Error');
                    } else {
                        await db.query('INSERT INTO deposit SET id = ?, user_id = ?, amount = ?, reference_id = ?, verification = "approved", created_at = ?', [uuidv4(), user_id, response.data.data.amount, client_txn_id, new Date()], async (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send('Error');
                            } else {
                                res.status(200).json({ message: 'Payment Successful', amount: response.data.data ? response.data.data.amount : 0 });
                            }
                        })
                    }
                })
            } else {
                res.status(500).json('Paymet not completed')
            }
        })
        .catch(function (error) {
            console.log(error);
        });


}