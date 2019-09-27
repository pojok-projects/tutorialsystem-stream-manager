const video = require('express').Router()


const { videoController } = require('../../controller')

video.post('/get', videoController.get)

module.exports = video