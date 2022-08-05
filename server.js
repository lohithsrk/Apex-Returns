// if (process.env.NODE_ENV !== 'production')
// require('dotenv').config()

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

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(morgan('dev'))

const secret = '84f07b27e32fdd7499c8399c69dc16ceb21814902ced7e60930021ab45c0f8086707373292f3fea8313994d5ab6af0d077d7244df88525c6583683c7e2039b99f2a7380b239d0e129a15a313116c471dda1e047018c7d1bb9410a7c446e7ab4ca5a6b18da55eb734fed08b23cb8a4dd352bdbbc76e944454006f085e5dfa0d4280677e04e805751a783db9832dca8c32d5fac158f72bfb881f7e6635051e5f47297f179e1ad5be62b34e8ba3df57c286e7faa7c7dc266b5c5fb8012d21bc93c0a7a24b2c6f0655268171db14df1b81da7807672df384eda2bd264591df7d24ccf0f26877fba2feb5c21457e17729fe24ba204b8fa4945d650a1f098a3dd93d072482ca5716f8907e7885f1715cd189a4b37c589cad333f5b2da817e64dbbd898a6c5463ad236cc2814a929896fc4362a360e23ca133972b0dde4385986d4eb17'

app.use(session({
    secret,
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

app.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
);
