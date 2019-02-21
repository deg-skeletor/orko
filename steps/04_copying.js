const copyManager = require('../lib/copyManager')();
const greet = require('../utils/greet.js');
const settings = require('../config/settings.js');
const {copyingTmpToProject} = require('../config/text.js');
const {projectPath, tmpPath} = settings;

const copying = answers => new Promise(async(resolve, reject) => {

    const tmpPathsNotToCopy = [
        `${tmpPath}/orko`
    ];

    const init = async () => {
        greet(copyingTmpToProject);
        await copyManager.remove(tmpPathsNotToCopy);
        await copyManager.copy(tmpPath, projectPath);
        resolve(answers);
    };

    init();

});

module.exports = copying;