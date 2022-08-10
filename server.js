if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()

const express = require('express');
const path = require('path');
const session = require('express-session')
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const db = require('./database');

const authRoute = require('./routes/auth.route');
const paymentRoute = require('./routes/payment.route');
const ordersRoute = require('./routes/orders.route');
const plansRoute = require('./routes/plans.route');
const investmentRoute = require('./routes/investments.route');
const withdrawRoute = require('./routes/withdraw.route');

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(morgan('dev'))

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 5
    }
}))

db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('MySql Connected...');
})

const route = process.env.NODE_ENV === 'production' ? '/' : '/api'
app.use(route, authRoute)
app.use(route, paymentRoute)
app.use(route, ordersRoute)
app.use(route, plansRoute)
app.use(route, investmentRoute)
app.use(route, withdrawRoute)

app.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
);
