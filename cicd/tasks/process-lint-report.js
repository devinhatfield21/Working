
async function processReport(params) {
    return new Promise((resolve, reject) => {
        const report = params.report;
        if (report.results && report.results.length) {
            console.log("\n**********************************************");
            console.log("\n Lint Report \n");
            console.log("**********************************************\n");
            report.results.forEach(result => {
                result.messages.forEach(msg => {
                    console.info("\n %s %s:%s", result.filePath, msg.line, msg.column);
                    console.info(msg.message);
                    if (msg.message.indexOf("File ignored because of a matching ignore pattern") >= 0) {
                        report.warningCount -= 1
                    }
                })
            })
        }
        console.log("\n**********************************************");
        console.log("\n Lint Results: \n Error: %s | Warning: %s \n", report.errorCount, report.warningCount);
        console.log("**********************************************\n");
        if (report.errorCount || report.warningCount) {
            reject("\n Commit rejected, your code doesn't pass our Linter \n")
        } else {
            resolve()
        }
    });
}


module.exports = {
    run: processReport
};
