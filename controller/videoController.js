const axios = require('axios')
const dotenv = require('dotenv')
const { stream } = require('./helpers')
dotenv.config()

const apivideo = process.env.ENDPOINTAPI_VIDEO
const apis3 = process.env.ENDPOINTAPI_S3

module.exports = {
    get: async (req, res, next) => {
        try {
            const { metadata_id, num } = req.body
            const axiosReq = await axios.get(apivideo + 'metavideos/' + metadata_id)

            if (axiosReq.status === 200) {
                const num_video = num - 1;
                var video_path = apis3 + axiosReq.data.metavideos[num_video].file_path
                stream(video_path, res);

            } else {
                throw new Error(axiosReq)
            }
        } catch (err) {
            next(err)
        }
    }
}