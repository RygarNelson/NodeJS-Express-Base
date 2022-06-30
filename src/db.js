'use strict'

const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

var connection = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_TYPE
});

/** Check database connection, loads models and syncs them */
async function checkConnection() {
    try {
        connection.authenticate().then(() => {
            // Import database models
            fs.readdirSync(path.join(__dirname, '..', 'models')).forEach(file => {
                var model = connection.import(path.join(__dirname, '..', 'models', file));
                db[model.name] = model;
            });
    
            connection.sync();
            
            console.log("Connection and synchronization with database successfull!");
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = { connection, checkConnection }