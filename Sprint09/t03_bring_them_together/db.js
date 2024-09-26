const mysql = require('mysql2')
const config = require('./config.json')

const con = mysql.createConnection(config)

con.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
})

module.exports = con
