
const copyManager = require('../lib/copyManager')();
const {projectPath, tmpPath, orkoConfigName, skelInstallName} = require('../config/settings.js');
const {orkoJunkCleanup, goodbye} = require('../config/text.js');
const greet = require('../utils/greet.js');
    
const housekeeping = answers => new Promise(async(resolve, reject) => {

    const init = async () => {
        await removeOrkoJunk();
        await greet(goodbye, 'heading');
        resolve(answers);
    };

    const removeOrkoJunk = async () => {
        greet(orkoJunkCleanup);
        await copyManager.remove([
            tmpPath,
            `${projectPath}/${orkoConfigName}`,
            `${projectPath}/${skelInstallName}`

        ]);
    };

    init();

});

module.exports = housekeeping;