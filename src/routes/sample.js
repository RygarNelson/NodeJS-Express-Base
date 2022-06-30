'use strict'

const express = require('express')

const router = express.Router()

const standardCallback = require('../methods/standardCallback')

router.get('/', async (req, res) => {
    res.status(200).send({
        success: true,
        data: "Connection with server established successfully"
    })
})

module.exports = router
