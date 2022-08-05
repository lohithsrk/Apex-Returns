const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'b4jew6sdpriknqze3tcx-mysql.services.clever-cloud.com',
    user: 'uqam25qxlawfxpc5',
    password: '1szK3QDLViovQmEz4tSP',
    database: 'b4jew6sdpriknqze3tcx'
});


module.exports = db;