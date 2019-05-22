function Executor(taskList, params) {
    this.taskList = taskList;
    this.params = params;
    this.executeTask = (name, options) => {
        console.warn(`==== Start ${name} Task ====`);
        try {
            const task =  this.taskList[name] || require(`../tasks/${name}`);
            if (task) {
                taskList[name] = task;
                return task.run(this.params, options);
            } else {
                return Promise.reject(`${name} is not defined or not registered`);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

module.exports = Executor;
