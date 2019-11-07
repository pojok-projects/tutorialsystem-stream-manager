const video = require('express').Router()


const { videoController } = require('../../controller')

video.get('/get', videoController.get)

module.exports = video