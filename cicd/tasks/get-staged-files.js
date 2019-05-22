const stagedFiles = require("staged-git-files");

async function getStagedFiles(params) {
    return new Promise((resolve, reject) => {
        stagedFiles((err, results) => {
            params.files = results;
            err ? reject(err) : resolve(results)
        });
    });
}

module.exports = {
    run: getStagedFiles
};

