const fs = require('fs-extra');
// const replaceInFiles = require('replace-in-files');
const settings = require('../config/settings.js');
const {
    projectPath,
    tmpPath
} = settings;
const alwaysIgnored = [
    '.git',
    'README.md',
];
const staticCopyIgnored = [
    'orko'
];
const replaceOptions = {
    files: [
      `${tmpPath}/orko/package.json`,
    ],
    from: /{{shortName}}/g,
    to: 'TEST',
    saveOldFile: false,
    returnPaths: false,
    returnCountOfMatchesByPaths: false
};
const copyManager = require('../lib/copyManager')();

const copying = answers => new Promise(async(resolve, reject) => {

    const init = async () => {
        // await copyManager.copy(tmpPath, projectPath, filterForStaticCopy);
        // await populateDynamicTokens();
        // await copyManager.copy(`${tmpPath}/templates`, projectPath, filterForDynamicCopy);
        // await copyManager.removeDir(tmpPath);
        resolve(true);
    };

    const populateDynamicTokens = async () => {
        try {
            await replaceInFiles(replaceOptions);
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };

    const filterForStaticCopy = src => {
        const filesToIgnore = [
            ...alwaysIgnored,
            ...staticCopyIgnored
        ];
        return !filesToIgnore.some(ignore => src.includes(`${tmpPath}/${ignore}`));
    };

    const filterForDynamicCopy = src => {
        return staticCopyIgnored.some(ignore => src.includes(`${tmpPath}/${ignore}`));
    };

    init();

});

module.exports = copying;