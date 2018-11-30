const fs = require("fs")
    , archiver = require("archiver")
    ;

module.exports.compress = (src, dest) => {
    return new Promise((resolve, reject) => {

        let output = fs.createWriteStream(dest);
        var archive = archiver("zip", {
            zlib: { level: 9 }
        });

        output.on('close', function () {
            resolve();
        });

        output.on('end', function () {
            console.log('Data has been drained');
        });

        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                reject(err);
            }
        });

        archive.on('error', function (err) {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(src, false);
        archive.finalize();
    })
}