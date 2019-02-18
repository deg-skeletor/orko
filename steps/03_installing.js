const {projectPath} = require('../config/settings.js');
const exec = require('child-process-promise').exec;
const greet = require('../utils/greet.js');
const {installingNpmDependencies} = require('../config/text.js');

const installing = () => new Promise(async(resolve, reject) => {
    
    greet(installingNpmDependencies);
    const npmInstallResult = await exec(`cd .tmp && npm install && cd ..`)
        .catch(error => reject(error));
    console.log('stdout: ', npmInstallResult.stdout);
    console.log('stderr: ', npmInstallResult.stderr);
    const skelConfig = require(`${projectPath}/.tmp/skeletor.config.js`);
    console.log(skelConfig);
    if (skelConfig && skelConfig.tasks.some(task => task.name === 'install')) {
        await exec(`cd .tmp && skel install`).catch(error => reject(error));
    }
    resolve(true);
});

module.exports = installing;