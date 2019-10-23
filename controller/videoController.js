const axios = require('axios')
const dotenv = require('dotenv')
const { stream, getVideoId } = require('./helpers')
dotenv.config()

const apivideo = process.env.ENDPOINTAPI_VIDEO
const apis3 = process.env.ENDPOINTAPI_S3

module.exports = {
    get: async (req, res, next) => {
        try {
            const { metadata_id, video_id } = req.query
            const axiosReq = await axios.get(apivideo + '/' + metadata_id)

            if (axiosReq.status === 200) {
                var file_path = null;
                var data = axiosReq.data.metavideos
                data.forEach((item, index) => {
                    if(item.id === video_id) {
                        file_path = item.file_path
                    }
                })
                if(file_path === null) {
                    return res.send({
                        "code" : 404,
                        "message" : "video not found"
                    })
                }
                
                stream(apis3 + file_path, res);
            } else {
                throw new Error(axiosReq)
            }
        } catch (err) {
            next(err)
        }
    }
}