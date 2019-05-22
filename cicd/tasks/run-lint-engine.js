const EslintEngine = require("eslint").CLIEngine;

async function runLintEngine(params) {
    return new Promise((resolve, reject) => {
        if (params.files && params.files.length) {
            const engine = new EslintEngine({
                configFile: ".eslintrc"
            });
            const report = engine.executeOnFiles(params.files.filter(f => isValidFile(f)).map(f => f.filename));
            params.report = report;
            
            resolve(report);
        } else {
            reject("There is no staged file")
        }
    });
}

function isValidFile(file) {
    const filename = file.filename;
    const status = file.status;
    const ext = filename.split('.').pop().toLowerCase();
    const validExt = ["brs"];
    const validStatus = ["Added", "Modified", "Renamed"];
    return validExt.indexOf(ext) >= 0 && validStatus.indexOf(status) >= 0;
}

module.exports = {
    run: runLintEngine
};

