require('./utils/color-console')();
const Executor = require('./utils/task-executor');

const config = require("./config");
const args = require('minimist')(process.argv.slice(2));
const program = require('commander');


program
    .version('1.0.0')
    .option('-j, --project [Project Code]', 'Select Project')
    .option('-e, --env [Project Environment]', 'Select Project Environment')
    .option('-a, --appVersion [Version x.y.z]', 'Build version')
    .option('-m, --mode [Build Mode]', 'Select Build Mode')
    .option('-z, --package', 'Generate deploy package')
    .option('-x, --packagePassword', 'Passsword to generate package')
    .option('-c, --packageRekey', 'Path to package to rekey device')
    .option('-f, --packageRekeyFlag', 'Flag this if we want to rekey the device')
    .option('-v, --verbose', 'Print more logs')
    .option('-d, --deploy', 'Deploy to device')
    .option('-b, --debug', 'Enable debug mode')
    .option('-i, --ip [Device IP]', 'Define device IP')
    .option('-u, --username [Device Username]', 'Define device Username')
    .option('-p, --password [Device Password]', 'Define device Password')
    .option('-w, --watch', 'Monitor files')
    .option('-t, --test-result', 'Extract test results from telnet log')
    .parse(process.argv);

global.inputMode = args.m || args.mode;
global.inputProject = args.p || args.project;
global.inputEnvironment = args.e || args.env;
global.inputAppVersion = args.a || args.appVersion;
global.inputGenPackage = program.z || program.package;
global.inputPackagePassword = args.x || args.packagePassword;
global.inputPackageRekey = args.c || args.packageRekey;
global.inputPackageRekeyFlag = program.f || program.packageRekeyFlag;
global.inputVerbose = program.v || program.verbose;
global.inputWatch = program.w || program.watch;
global.inputDebug = program.b || program.debug;
global.inputDeploy = program.d || program.deploy;
global.inputDeviceIp = args.i || args.ip;
global.inputUsername = args.u || args.username;
global.inputPassword = args.pass || args.password;
global.inputTestResult = program.r || program.testResult;

global.log = function (msg) {
    global.inputVerbose && console.info(JSON.stringify(msg));
};

global.log(program);
global.log(global.inputTestResult);
global.log(args);
global.log(config);

const params = {};

async function main() {
    const executor = new Executor([], params);
    await executor.executeTask('prepare');
    await executor.executeTask('copy');
    await executor.executeTask('trim');
    await executor.executeTask('archive');
    if (global.inputDeploy) {
        await executor.executeTask('deploy');
        await executor.executeTask('debug');

        if (global.inputGenPackage ) {
            await executor.executeTask('pkg-convert-squashfs');
            if (global.inputPackageRekeyFlag) {
                await executor.executeTask('pkg-rekey-device');
            }
            await executor.executeTask('pkg-create-package');
            await executor.executeTask('pkg-download-package');
        }
    }
    global.inputDebug && await executor.executeTask('telnet');
    global.inputWatch && await executor.executeTask('watch', ['copy', 'trim', 'archive', 'deploy'].map(t => executor.executeTask.bind(executor, t)));
}

main().then(() => {
    console.info("***************** Build Done *****************");
}).catch((error) => {
    console.error("**************** Build Failed!!! *****************");
    console.error(error);
    process.exit(0);
});


