const settings = require('../config/settings.js');
const {projectPath, tmpPath, projectTypes} = settings;
const {downloadingTemplate, noSelectedTemplatePath, downloadingTemplateComplete} = require('../config/text.js');
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
        getSelectedTemplate();
        sayHello();
        await downloadTemplate();
        await removeRepoJunk();
        await hookManager.runHook('afterdownload', answers);
        sayThanks();
        resolve(answers);
    };

    const getSelectedTemplate = () => {
        const {projectType} = answers;
        selectedTemplate = projectTypes.find(project => project.value === projectType);
        if (!selectedTemplate || !selectedTemplate.url) {
            reject(noSelectedTemplatePath);
            return;
        }
    };

    const sayHello = () => {
        const downloadMessage = getDownloadMessage(downloadingTemplate, selectedTemplate);
        greet(downloadMessage);
    };

    const downloadTemplate = async () => {
        await copyManager.makeDir(tmpPath);
        await git.clone(selectedTemplate.url, tmpPath);
    };

    const removeRepoJunk = async () => {
        await copyManager.remove(repoJunk);
    };

    const sayThanks = () => {
        greet(downloadingTemplateComplete);
    };

    const getDownloadMessage = (msg, {name, url}) => {
        msg = msg.replace('{{platform}}', name);
        return msg.replace('{{url}}', url.replace('.git', ''));
    };

    init();

});

module.exports = downloading;