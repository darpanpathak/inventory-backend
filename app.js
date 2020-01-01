require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const logger = require('./helpers/winston');
const router = require('./router/index');
const requireAll = require('require-all');
const mysql = require('mysql');

app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/ping', (req, res) => {
    res.send("pong!");
});

// boostrap all controllers
global.controllers = requireAll({
    dirname: __dirname + '/controllers',
    filter: /(.+controller)\.js$/,
    resolve: function(Controller) {
        return Controller;
    }
});

global.database = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Database
});

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router(app);

function intiApp() {
    app.listen(PORT, (err) => {
        if (err)
            logger.error(`Unable to lunch the application :: ${err.message}`);
        else {
            logger.info(`Application launch successfully on port ${PORT}`);
        }
    })
}

function connectDatabase(url) {
    database.connect((err) => {
        if (err) {
            console.error('error connecting the database');
            return;
        }

        intiApp();
    })
}

connectDatabase();