const fs = require('fs')
function stream(file_path, res) {
    if (!file_path) {
        return res.status(404).send()
    }
    fs.stat(file_path, function (err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send();
            }
        }

        var end;
        var total = 0;
        var contentRange = false;
        var contentLength = 0;

        start = 0;
        end = stats.size;
        contentLength = stats.size;

        if (start <= end) {
            var responseCode = 200;
            var responseHeader =
            {
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4"
            };
            if (contentRange) {
                responseCode = 206;
                responseHeader["Content-Range"] = "bytes " + start + "-" + end + "/" + total;
            }
            res.writeHead(responseCode, responseHeader);

            var stream = fs.createReadStream(file_path, { start: start, end: end })
                .on("readable", function () {
                    var chunk;
                    while (null !== (chunk = stream.read(1024))) {
                        res.write(chunk);
                    }
                }).on("error", function (err) {
                    res.end(err);
                }).on("end", function (err) {
                    res.end();
                });
        }
        else {
            return res.status(403).send();
        }
    });
}


module.exports = {
    stream
}