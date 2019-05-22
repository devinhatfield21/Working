require('./utils/color-console')();
const Executor = require('./utils/task-executor');
const config = require("./config-unit-test-report");
const program = require('commander');

program
    .version('1.0.0')
    .option('-p, --project [Project Code]', 'Select Project')
    .option('-m, --mode [Build Mode]', 'Select Build Mode')
    .option('-i, --include-void', 'Include functions that return as void')
    .parse(process.argv);

global.inputProject = program.p || program.project;
global.inputMode = program.m || program.mode;
global.inputIncludeVoid = program.i || program.includeVoid;

const params = {};

async function main() {
    const executor = new Executor([], params);
    await executor.executeTask('prepare');
    await executor.executeTask('copy');
    await executor.executeTask('prepare-coverage');
    await executor.executeTask('get-all-functions-name');
    await executor.executeTask('get-all-test-suites');
    await executor.executeTask('create-coverage-report');
}

main().then(() => {
    console.info("***************** Done *****************");
}).catch((error) => {
    console.error("**************** Failed!!! *****************");
    console.error(error);
    process.exit(0);
});
