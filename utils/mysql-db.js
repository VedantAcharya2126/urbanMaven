var config = require('../config');
var logger = require('./logger');
var util = require('util');
const mysql = require('mysql2');
var _ = require('lodash');

//creating a database connection pool
const db = mysql.createConnection({
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database.db')
});

// function to connect to database.
var conn = function () {
    db.connect((err) => {
        if (err) {
            logger.error(`Error connecting to MySQL : ${err.message}`);
            return;
        }
        logger.info(`Connected to MySQL database`);
    });
    return db;
}
module.exports = {
    conn: conn,
}