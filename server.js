const http = require('http');
const express = require('express');
const config = require('./config');
const logger = require('./utils/logger');
const routes = require('./routes/index');
const middlewares = require('./middlewares/index');
const app = express();
const mysql = require('mysql2');
const db = require('./utils/mysql-db')
app.set('port', config.get('server.port'));

middlewares(app);

routes(app);

databaseConnection = db.conn();
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Customer'; 
    databaseConnection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// Server Creation
const server = http.createServer(app).listen(app.get('port'), function () {
    logger.info(`server started with port : ${config.get('server.port')}`);
    logger.info(`Environment: ${config.get('env')}`);
});


process.on('unhandledRejection', (reason, p) => {
    logger.error(`Unhandled Rejection at: ${p},reason::${reason}`);
});

// To handle Uncaught Exception
process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception: ${error}`);
});