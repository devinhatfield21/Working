const nodeWatch = require('node-watch');

async function watch(params, listeners) {
    const folders = params.sourceFolders;
    return new Promise((resolve, reject) => {
        let changeQueue = [];
        let executeDelayId;
        folders.forEach(f => {
            const watcher = nodeWatch(f, {recursive: true});
            console.info("Watching %s", f);
            watcher.on('change', (evt, name) => {
                if (evt === 'update') {
                    console.warn("\n%s %s \n", name, evt);
                    clearTimeout(executeDelayId);
                    executeDelayId = setTimeout(() => {
                        changeQueue.push(name);
                        if (changeQueue.length === 1) {
                            const execute = async () => {
                                if (changeQueue.length) {
                                    try {
                                        for(const l of listeners) {
                                            await l();
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    folders.forEach(f => {
                                        console.info("Watching %s", f);
                                    })
                                    console.info('Executed tasks to update %s ', changeQueue.shift())
                                    execute();
                                }
                            }
                            execute();
                        } else {
                            console.warn('\nProcess is running, push change request to queue\n');
                        }
                    }, 1000);
                    
                }
            });
            watcher.on('error', reject);
        });
    })
}

module.exports = {
    run: watch
};
