const cpdEngine = require("jscpd");
const config = require('../config-cpd');

async function runJSCPD(params) {
    
    return new Promise((resolve, reject) => {
        const cpd = new cpdEngine.JSCPD(config.options);
        
        if (params.inputCommit) {
            if (params.files && params.files.length) {
                fileArray = toFileArray(params.files)
                const report = cpd.detectInFiles(fileArray);

                resolve(report);
            } else {
                reject("There is no staged file")
            }
        }
        else {
            const report = cpd.detectInFiles(params.sourceFolders);
            resolve(report);
        }
    });
}

function toFileArray(files) {
    fileArray = []
    for (var file in files) {
        fileArray.push("./" + files[file].filename)
    }
    return fileArray
}

module.exports = {
    run: runJSCPD
};

