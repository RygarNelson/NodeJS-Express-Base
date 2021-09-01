'use strict'

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')

/* SERVER & PARAMETERS */
const app = express()

/* SECURITY */
app.use(helmet())

/* LOGGING */
app.use(morgan('combined', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}))
app.use(morgan('combined'))

/* CORS */
app.use(cors())
app.use(function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method)
        res.sendStatus(200);
    else
        next();
});

/* MISCELLANEOUS */
app.use(express.json({limit: '10000kb'}))
app.use(express.urlencoded({'extended': true}))

/* ROUTES */
const authRoute = require("./routes/auth")
const dataRoute = require("./routes/data")

// Routers
// Auth API
app.use('/api/auth', authRoute)
// Data API
app.use('/api/data', dataRoute)

module.exports = {app}