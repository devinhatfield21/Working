const recursiveCopy = require('recursive-copy');
const rimraf = require('rimraf');

const baseFilter = [
    '**/*',
    '!out',
    '!**/*.zip',
];

async function copy(src, dest, filter) {
    filter = baseFilter.concat(filter);
    const options = {
        overwrite: true,
        expand: true,
        dot: false,
        junk: false,
        filter: filter
    };
    console.log("Copying from %s to %s filtered by %s", src, dest, filter);
    return recursiveCopy(src, dest, options)
        .on(recursiveCopy.events.COPY_FILE_COMPLETE, function (copyOperation) {
            global.inputVerbose && console.info('Copied from %s to %s', copyOperation.src, copyOperation.dest);
        })
        .on(recursiveCopy.events.ERROR, function (error, copyOperation) {
            console.error('Unable to copy ' + copyOperation.dest);
        })

}



async function deleteFolder(folder) {
    console.log("Deleting folder %s", folder);
    return new Promise((resolve, reject) => {
        rimraf(folder, error => {
            error ? reject(error) : resolve();
        });
    })
}

async function run(params) {
    const folders = params.sourceFolders.slice();
    const dest = params.outputFolder;
    const filter = params.mode.filter;
    let totalFiles = 0;
    const execute = () => {
        if (folders.length) {
            return copy(folders.shift(), dest, filter).then((results) => {
                totalFiles += results.length;
            }).then(execute);
        } else {
            console.info("%s files copied", totalFiles);
            return Promise.resolve(totalFiles);
        }
    };
    await deleteFolder(params.outputFolder);
    return execute();
}


module.exports = {
    run: run
};
