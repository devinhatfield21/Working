const replace = require('replace-in-file');

async function trim(params) {
    const options = {
        files: ["/**/*.brs", "/**/*.xml"].map(p => params.outputFolder + p),
        from: params.mode.regex,
        to: '',
    };
    return replace(options).then(async (changes) => {
        console.log('Modified %s files: by %s', changes.length, params.mode.regex);
        global.inputVerbose && console.log(changes.join('\n'));
        await trimManifestVersion(params);
        await trimAppConfig(params);
        return trimManifest(params);
    });
}

async function trimManifest(params) {
    if (params.mode && params.mode.name === 'TEST') {
        const files = [params.outputFolder + '/manifest'];
        const replaceConfigs = [
            {
                from: `${params.unitTestFlag}=false`,
                to: `${params.unitTestFlag}=true`,
            }
        ]
        console.log("Modify %s", files);
        for (const c of replaceConfigs) {
            console.log(c);
            await replace({
                files: files,
                from: c.from,
                to: c.to,
            })
        }
    } 
    return Promise.resolve();
}

async function trimAppConfig(params) {
    if (global.inputEnvironment) {
        const files = [params.outputFolder + '/configs/appConfig.json'];
        const replaceConfigs = [
            {
                from: `${params.defaultEnvConfig}\"PROD\"`,
                to: `${params.defaultEnvConfig}\"${global.inputEnvironment}\"`,
            }
        ]
        console.log("Modify %s", files);
        for (const c of replaceConfigs) {
            console.log(c);
            await replace({
                files: files,
                from: c.from,
                to: c.to,
            })
        }
    } 

    if (params.mode && params.mode.name === 'AUTOMATION') {
        const files = [params.outputFolder + '/configs/appConfig.json'];
        const replaceConfigs = [
            {
                from: new RegExp(`${params.automationTestFlag}.*`, "g"),
                to: `${params.automationTestFlag}: true,`,
            }
        ]
        console.log("Modify %s", files);
        for (const c of replaceConfigs) {
            console.log(c);
            await replace({
                files: files,
                from: c.from,
                to: c.to,
            });
        }
    } 
    return Promise.resolve();
}

async function trimManifestVersion(params) {
    if (global.inputAppVersion) {
        parts = global.inputAppVersion.split('.')
        if (parts.length == 3 && parts[0] && parts[1] && parts[2]) {
            const files = [params.outputFolder + '/manifest'];
            const replaceConfigs = [
                {
                    from: new RegExp('major_version=.*'),
                    to: `major_version=${parts[0]}`,
                },
                {
                    from: new RegExp('minor_version=.*'),
                    to: `minor_version=${parts[1]}`,
                },
                {
                    from: new RegExp('build_version=.*'),
                    to: `build_version=${parts[2]}`,
                }
            ]
            console.log("Modify %s", files);
            for (const c of replaceConfigs) {
                console.log(c);
                await replace({
                    files: files,
                    from: c.from,
                    to: c.to,
                })
            }
        }
        else {
            console.error("Invalid app version format. It should be: x.y.z.");
        }
    } 
    return Promise.resolve();
}

module.exports = {
    run: trim
};
