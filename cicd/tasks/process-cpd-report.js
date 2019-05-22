require('../utils/color-console')();
const fs = require('fs');
const config = require('../config-cpd');

async function processReport(params) {
    return new Promise((resolve, reject) => {
        let reportFile = fs.readFileSync(params.rootDir + config.reportFilePath);
        let report = JSON.parse(reportFile);  

        if (report.statistics.total) {
            console.log("\n**********************************************");
            console.log("\n JsCPD Results: \n Code Duplication Percentage: %s % | Allowed Threshold: %s %\n", 
                report.statistics.total.percentage, 
                report.statistics.threshold);
            console.log("**********************************************\n");
    
            if (report.statistics.total.percentage > report.statistics.threshold) {
                reject("\n Commit rejected, your code doesn't pass our Code Duplication check. \n")
            } else {
                resolve()
            }
        }
        else {
            console.log("There is no JsCPD report for this commit.\n");
            resolve()
        }        
    });
}


module.exports = {
    run: processReport
};
