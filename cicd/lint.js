const Executor = require('./utils/task-executor');

const params = {};

async function main() {
    const executor = new Executor([], params);
    await executor.executeTask('get-staged-files');
    await executor.executeTask('run-lint-engine');
    await executor.executeTask('process-lint-report');
}

main().then(() => {
    console.info("***************** EsLint - Passed!!! *****************\n");
    process.exit(0);
}).catch(error => {
    console.info("***************** EsLint - Failed!!! *****************\n");
    console.log(error);
    process.exit(1);
});
