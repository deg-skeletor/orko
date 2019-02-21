const fs = require('fs-extra');
const greet = require('../utils/greet.js');
const asyncForEach = require('../utils/arrayUtils.js').asyncForEach;
const replaceInFiles = require('replace-in-file');
const {projectPath} = require('../config/settings.js');
const {
    runningTemplateHook,
    copying,
    templateHookSuccess
} = require('../config/text.js');

const hookManager = (settings) => {

    const tmpDir = '.tmp';
    const orkoConfigName = 'orko.config.js';

    const runHook = (hookName = null, answers = {}) => new Promise(async(resolve, reject) => {
        if (!hookName) {
            reject();
            return
        }
        const hookPaths = getHookPathsFromConfig(hookName);
        if (hookPaths === null) {
            resolve();
            return;
        }
        greet(runningTemplateHook.replace('{{hookName}}', hookName));
        const completedHookPaths = completeHookPaths(hookPaths);
        await replaceTokens(completedHookPaths, answers);
        await copyHookPaths(completedHookPaths);
        greet(templateHookSuccess.replace('{{hookName}}', hookName));
        resolve();
    });

    const getHookPathsFromConfig = hookName => {
        const orkoConfig = require(`${settings.projectPath}/${tmpDir}/${orkoConfigName}`);
        if (!orkoConfig || !orkoConfig.hooks || !orkoConfig.hooks[hookName] || orkoConfig.hooks[hookName].length === 0) {
            return null;
        }
        return orkoConfig.hooks[hookName];
    };

    const completeHookPaths = hookPaths => hookPaths.map(path => {
        const prependedSrc = path.src.charAt(0) === '/' ? path.src : `/${path.src}`;
        const prependedDest = path.dest.charAt(0) === '/' ? path.dest : `/${path.dest}`;
        return {
            src: `${projectPath}/${tmpDir}${prependedSrc}`,
            dest: `${projectPath}/${tmpDir}${prependedDest}`
        };
    });

    const replaceTokens = async (hookPaths, answers) => {
        const replaceOptions = {
            files: hookPaths.map(path => path.src),
            from: Object.keys(answers).map(answer => new RegExp('{{' + answer + '}}', 'g')),
            to: Object.values(answers),
            saveOldFile: false,
            returnPaths: false,
            returnCountOfMatchesByPaths: false
        };
        try {
            await replaceInFiles(replaceOptions)
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const copyHookPaths = async hookPaths => {
        await asyncForEach(hookPaths, async ({src, dest}) => {
            let message = copying.replace('{{src}}', src);
            message = message.replace('{{dest}}', dest);
            greet(message);
            await copyFile(src, dest);
        });
    };

    const copyFile = async (src, dest) => {
        try {
            await fs.copy(src, dest);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        runHook
    };

};

module.exports = hookManager;