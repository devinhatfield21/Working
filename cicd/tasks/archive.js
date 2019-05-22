const fs = require('fs');
const archiver = require('archiver');


function archive(params) {
    const input = params.outputFolder;
    const outputFile = params.package;
    console.log("Zip %s to %s", input, outputFile);
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputFile);
        const archive = archiver('zip', {
            zlib: {level: 9} // Sets the compression level.
        });
        output.on('close', function () {
            console.log("%s total bytes %s", outputFile, archive.pointer());
            resolve(params.packageSize = archive.pointer());
        });
        output.on('end', function () {
            console.log('Data has been drained');
        });
        archive.on('error', reject);
        archive.pipe(output);
        archive.directory(input, false);
        archive.finalize();
    })
}

module.exports = {
    run: archive
};
