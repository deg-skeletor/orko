const settings = require('../config/settings.js');
const {tmpPath, projectPath, skelInstallName, npmInstallCommand} = settings;
const exec = require('child-process-promise').exec;
const copyManager = require('../lib/copyManager')();
const hookManager = require('../lib/hookManager')(settings);
const greet = require('../utils/greet.js');
const {
    installingNpmDependencies, 
    npmDependenciesInstallSuccess, 
    runningSkeletorInstallTask, 
    skeletorInstallTaskSuccess
} = require('../config/text.js');

const installing = answers => new Promise((resolve, reject) => {

    const init = async () => {
        await installNpmDependencies();
        await runSkeletorInstallTask();
        await hookManager.runHook('afterinstall', answers);
        resolve(answers);
    };

    const installNpmDependencies = async () => {
        greet(installingNpmDependencies);
        await copyManager.move(`${tmpPath}/package.json`, `${projectPath}/package.json`);
        await exec(`${npmInstallCommand}`).catch(error => reject(error));
        greet(npmDependenciesInstallSuccess);
        return Promise.resolve();
    };

    const runSkeletorInstallTask = async () => {
        try {
            const skelInstallConfig = require(`${tmpPath}/${skelInstallName}`);
            greet(runningSkeletorInstallTask);
            await copyManager.move(`${tmpPath}/${skelInstallName}`, `${projectPath}/${skelInstallName}`);
            const skelCore = require(`${projectPath}/node_modules/@deg-skeletor/core/index.js`)();
            if (skelCore) {
                skelCore.setConfig({
                    tasks: [
                        skelInstallConfig
                    ]
                });
                await skelCore.runTask('install');
                greet(skeletorInstallTaskSuccess);
                return Promise.resolve();
            }
            return Promise.reject();
        } catch (err){
            return Promise.resolve();
        }
    };

    init();

});

module.exports = installing;