const mysql = require('mysql2')
require('dotenv').config()

const con = mysql.createConnection({
    host: 'db',
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    namedPlaceholders: true
})

con.connect(function(err) {
    if (err) throw err
})

module.exports = con
