var mysql = require('mysql')
var postgres = require('pg')

var connection = null;

switch (process.env.DB_TYPE) {
    case 'mysql' : {
        connection = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        })
        break
    }
    case 'postgres' : {
        connection = new postgres.Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
    }
}

module.exports = { connection }
