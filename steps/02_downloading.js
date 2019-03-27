const settings = require('../config/settings.js');
const {projectPath, tmpPath} = settings;
const {downloadingTemplate, downloadingTemplateComplete} = require('../config/text.js');
const gitP = require('simple-git/promise');
const git = gitP(projectPath);
const copyManager = require('../lib/copyManager')(settings);
const hookManager = require('../lib/hookManager')(settings);
const greet = require('../utils/greet.js');

const downloading = answers => new Promise(async(resolve, reject) => {

    const repoJunk = [
        `${tmpPath}/.git`,
        `${tmpPath}/README.md`,
        `${tmpPath}/package.json`,
        `${tmpPath}/.gitignore`
    ];

    const init = async () => {
        sayHello();
        await downloadTemplate(answers.templateGitUrl);
        await removeRepoJunk();
        await hookManager.runHook('afterdownload', answers);
        sayThanks();
        resolve(answers);
    };

    const sayHello = () => {
        const downloadMessage = getDownloadMessage(downloadingTemplate, answers);
        greet(downloadMessage);
    };

    const downloadTemplate = async templateGitUrl => {
        await copyManager.makeDir(tmpPath);
        await git.clone(templateGitUrl, tmpPath);
    };

    const removeRepoJunk = async () => {
        await copyManager.remove(repoJunk);
    };

    const sayThanks = () => {
        greet(downloadingTemplateComplete);
    };

    const getDownloadMessage = (msg, {projectType, projectTypeName, templateGitUrl}) => {
        const correctName = projectType === 'custom' ? projectType : projectTypeName;
        msg = msg.replace('{{platform}}', correctName);
        return msg.replace('{{url}}', templateGitUrl.replace('.git', ''));
    };

    init();

});

module.exports = downloading;