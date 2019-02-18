const settings = require('../config/settings.js');
const {projectPath, tmpPath, projectTypes} = settings;
const {downloadingTemplate, noSelectedTemplatePath, downloadingTemplateComplete} = require('../config/text.js');
const gitP = require('simple-git/promise');
const git = gitP(projectPath);
const copyManager = require('../lib/copyManager')(settings);
const replace = require('replace-in-file');
const greet = require('../utils/greet.js');

const getDownloadMessage = (msg, {name, url}) => {
    msg = msg.replace('{{platform}}', name);
    return msg.replace('{{url}}', url.replace('.git', ''));
};

const downloading = answers => new Promise(async(resolve, reject) => {
    const replaceOptions = {
        files: [
          `${tmpPath}/orko/**.*`,
        ],
        from: [
            /{{shortName}}/g,
            /{{version}}/g,
            /{{description}}/g,
            /{{repo}}/g,
            /{{author}}/g,
            /{{license}}/g
        ],
        to: [
            answers.onboarding.shortName,
            answers.onboarding.version,
            answers.onboarding.description,
            answers.onboarding.repo,
            answers.onboarding.author,
            answers.onboarding.license
        ],
        saveOldFile: false,
        returnPaths: false,
        returnCountOfMatchesByPaths: false
    };

    const populateDynamicTokens = async () => {
        try {
            await replace(replaceOptions);
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };

    const {projectType} = answers.onboarding;
    const selectedTemplate = projectTypes.find(project => project.value === projectType);
    if (!selectedTemplate || !selectedTemplate.url) {
        reject(noSelectedTemplatePath);
        return;
    }
    const downloadMessage = getDownloadMessage(downloadingTemplate, selectedTemplate);
    greet(downloadMessage);
    await copyManager.makeDir(tmpPath);
    await git.clone(selectedTemplate.url, tmpPath);
    await copyManager.removeDir(`${tmpPath}/.git`);
    await populateDynamicTokens();
    await copyManager.copy(`${tmpPath}/orko`, tmpPath);
    greet(downloadingTemplateComplete);
    resolve(true);
});

module.exports = downloading;