'use strict'

const express = require('express')

const router = express.Router()

const standardCallback = require('../methods/standardCallback')
const { connection } = require('../db')

router.get('/', async (req, res) => {
    res.status(200).send({
        success: true,
        data: "Connection with server established successfully"
    })
})

router.get('/database', async (req, res) =>{
    connection.query('select 1', (err, result) => {
        standardCallback.execute(res, err, result)
    })
})

module.exports = router
