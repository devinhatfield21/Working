const selectTask = require("./select");
const config = require("../config");

async function prepare(params) {
    const selectedMode = await selectTask(global.inputMode, Object.keys(config.mode), "mode", "Build Mode is not selected");
    const selectedProject = await selectTask(global.inputProject, Object.keys(config.projects), "project", "Project is not selected");

    params.mode = config.mode[selectedMode];
    params.mode.name = selectedMode;
   
    params.unitTestFlag = config.unitTestFlag;
    params.automationTestFlag = config.automationTestFlag;
    params.defaultEnvConfig = config.defaultEnvConfig;
    params.project = config.projects[selectedProject];
    params.sourceFolders = getRequiredFolders(params.project);
    params.outputFolder = [config.baseOutputFolder, params.project.name].join('/');
    params.package = config.baseOutputFolder + '/' + [params.project.name, "zip"].join(".");

    
    console.warn("\n**********************************");
    console.info("          Start %s build           ", params.mode.name);
    console.info("          Project %s               ", params.project.name);
    console.warn("**********************************\n");
    return Promise.resolve(params);
}


function getRequiredFolders(project) {
    let folders = [];
    if (project.dependencies && project.dependencies.length) {
        project.dependencies.forEach(d => {
            if (config.projects[d]) {
                dependencyFolders = getRequiredFolders(config.projects[d])
                if (dependencyFolders.length) {
                    folders = folders.concat(dependencyFolders)
                }
            }
        })
    }
    folders.push(project.path);
    return folders;
}


module.exports = {
    run: prepare
};
