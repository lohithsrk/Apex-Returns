if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()

const express = require('express');
const path = require('path');
const session = require('express-session')
const cors = require('cors');

const app = express();

const db = require('./database');

const authRoute = require('./routes/auth.route');
const paymentRoute = require('./routes/payment.route');

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

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
        throw err;
    }
    console.log('MySql Connected...');
})

// app.get('/', (req, res) =>
//     res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.use('/', authRoute)
app.use('/', paymentRoute)

app.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
);
