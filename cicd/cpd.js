require('./utils/color-console')();
const Executor = require('./utils/task-executor');
const program = require('commander');

program
    .version('1.0.0')
    .option('-p, --project [Project Code]', 'Select Project')
    .option('-m, --mode [Build Mode]', 'Select Build Mode')
    .option('-c, --commit', 'Check code duplication in commit files only')
    .parse(process.argv);

global.inputProject = program.p || program.project;
global.inputMode = program.m || program.mode;
global.inputCommit = program.c || program.commit;

const params = {
    "rootDir": process.cwd(),
    "inputCommit": global.inputCommit
};

async function main() {
    const executor = new Executor([], params);
    if (global.inputCommit) {
        await executor.executeTask('get-staged-files');
    }
    else {
        await executor.executeTask('prepare');
        await executor.executeTask('copy');
    }
    await executor.executeTask('run-cpd-engine');
    await executor.executeTask('process-cpd-report');
}

main().then(() => {
    console.info("***************** JsCPD - Passed!!! *****************\n");
    process.exit(0);
}).catch(error => {
    console.error("**************** JsCPD - Failed!!! *****************\n");
    console.log(error);
    process.exit(1);
});
