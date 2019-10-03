const express = require('express')
const v1 = require('./v1')

const Router = express()

// use body parser
const bodyParser = require('body-parser')
Router.use(bodyParser.json())

// load .env data
const dotenv = require('dotenv')
dotenv.config()

// cors
const cors = require('cors')
Router.use(cors())

// pm router
Router.use('/v1', v1)

// default error unknown route fallback
Router.all('/*', (req, res) => {
    res.status(422).send({
        code: 422,
        path: req.originalUrl,
        method: req.method,
        message: "Invalid Request"
    })
})

// Default Error Fallback
Router.use((error, req, res, next) => {
    return res.status(422).send({
        status: {
            code: 422,
            message: error.message,
            succeeded: false
        }
    });
});

module.exports = Router