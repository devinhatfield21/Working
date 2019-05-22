const vsCodeLaunchConfigFolder = ".vscode/";
const replace = require('replace-in-file');
const recursiveCopy = require('recursive-copy');

async function generateLaunchConfig(params) {
    const options = {
        overwrite: true,
        expand: true,
        dot: true,
        junk: false
    };
    return recursiveCopy("cicd/plugins/launch.json", vsCodeLaunchConfigFolder + "launch.json", options)
        .on(recursiveCopy.events.COPY_FILE_COMPLETE, function (copyOperation) {
            console.info('Copied from %s to %s', copyOperation.src, copyOperation.dest);
        })
        .on(recursiveCopy.events.ERROR, function (error, copyOperation) {
            console.error('Unable to copy ' + copyOperation.dest);
        })
}

async function changeLaunchConfig(params) {
    const configFile = [vsCodeLaunchConfigFolder + "launch.json"];
    await replace({
        files: configFile,
        from: "${deviceIp}",
        to: params.device.ip,
    });
    await replace({
        files: configFile,
        from: "${devicePassword}",
        to: params.device.password,
    })
    await  replace({
        files: configFile,
        from: "${projectPath}",
        to: params.outputFolder,
    });
}

async function run(params) {
    await generateLaunchConfig(params);
    await changeLaunchConfig(params);
}

module.exports = {
    run: run
}