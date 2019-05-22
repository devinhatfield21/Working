const prompt = require('prompt');
const fs = require('fs');
const request = require('request');
const cliProgress = require('cli-progress');

async function downloadPackage(params) {
    try {
        params.device = require("../device")
    } catch(e) {
        console.error("Device configs are missing or in invalid fornat");
        console.error("To fix this error. Please copy \x1b[43m device.tpl.json to device.json \x1b[0m \x1b[31m and modify content in that file");
        return Promise.reject(e);
    }

    return new Promise((resolve, reject) => {
        const packageUrl = 'http://' + params.device.ip + '/' + params.pkg.filePath;
        console.log("URL" + packageUrl)
        params.pkg.downloadFile = params.outputFolder.replace(params.project.name, params.project.name + '_' + params.pkg.file)
        console.log("Downloading package file %s on device %s into %s", params.pkg.file, params.device.ip, params.pkg.downloadFile);

        const file = fs.createWriteStream(params.pkg.downloadFile);
        const progress = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
        
        const data = {
            auth: {
                user: params.device.username,
                pass: params.device.password,
                sendImmediately: false
            }
        };
        request.get(packageUrl, data).on('response', (response) => {
            if (response.statusCode == "200") {
                progress.start(params.packageSize, 0);
                response.pipe(file);
            }
            else {
                file.close();
                reject("Fail to Generate package on device " + response.statusCode);
            }
            file.on('finish', function() {               
                // TODO: add interactive result
                progress.update(params.packageSize, params.packageSize);
                progress.stop();
    
                file.close();  // close() is async, call cb after close completes.
    
                resolve("response");
                console.log("Download package %s from device %s", params.pkg.downloadFile, params.device.ip);
            });
        }).on('error', function(err) { // Handle errors
            console.log("Error http", err)
            fs.unlink(params.pkg.downloadFile); // Delete the file async. (But we don't check the result)
            reject(err)
        });
    });
}

module.exports = {
    run: downloadPackage
};
