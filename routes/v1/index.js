const v1 = require('express').Router()
const video = require('./video')

v1.use('/video', video)

module.exports = v1;