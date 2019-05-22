const prompt = require('prompt');
const fs = require('fs');
const request = require('request');
const cliProgress = require('cli-progress');

async function convertSquashfs(params) {
    try {
        params.device = require("../device")
    } catch(e) {
        console.error("Device configs are missing or in invalid fornat");
        console.error("To fix this error. Please copy \x1b[43m device.tpl.json to device.json \x1b[0m \x1b[31m and modify content in that file");
        return Promise.reject(e);
    }

    return new Promise((resolve, reject) => {
        const installUrl = 'http://' + params.device.ip + '/plugin_install';
        const data = {
            auth: {
                user: params.device.username,
                pass: params.device.password,
                sendImmediately: false
            },
            formData: {
                mysubmit: 'Convert to squashfs', // Convert to squashfs first
                archive: ""
            }
        };

        console.log("Converting %s to squashfs on device %s with credentials %s:%s", params.package, params.device.ip, params.device.username, params.device.password);

        const progress = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
        progress.start(params.packageSize, 0);
        const req = request.post(installUrl, data, function (error, response, body) {
            // TODO: add interactive result
            progress.update(params.packageSize, params.packageSize);
            progress.stop();

            if (error) {
                reject(error)
            } else if(response.statusCode !== 200) {
                reject("Fail to Convert squashfs on device " + response.statusCode);
            } else {
                let result = body.match(/<font.*>((.|\n)*?)<\/font>/gm).join('').replace(/[<][^>]*[>]/gm, '').replace(/  +/g,' ');
                if (result.includes('Failure') || result.includes('Failed')) {
                    reject(result);
                } else {
                    //console.info(result);
                    resolve({response, body});
                    console.log("Converted %s to squashfs on device %s", params.package, params.device.ip);
                }
            }
        });

        req.on('drain', () => {
            progress.update(req.req.connection.bytesWritten);
        });
    });
}

module.exports = {
    run: convertSquashfs
};
