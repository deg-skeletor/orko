const settings = require('../config/settings.js');
const {packageDefaults, projectTypes} = settings;
const {hello, packageCreationCanceled, onboardingQuestionsThanks} = require('../config/text.js');
const prompts = require('../config/prompts.js');
const inquirer = require('inquirer');
const greet = require('../utils/greet.js');
const packageManager = require('../lib/packageManager')(settings);
    
const onboarding = () => new Promise(async(resolve, reject) => {

    const init = async () => {
        sayHello();
        const packageCreationApproved = await packageManager.getCreationApproval();
        if (!packageCreationApproved) {
            reject(packageCreationCanceled);
            return;
        }
        const answers = await getAnswers();
        const matchingDefaultProjectType = getMatchingDefaultProjectType(answers.projectType);
        resolve({
            ...packageDefaults,
            ...{
                ...answers,
                projectTypeName: matchingDefaultProjectType.name,
                templateGitUrl: getTemplateGitUrl(answers, matchingDefaultProjectType)
            }
        });
    };

    const sayHello = () => {
        greet(hello, 'heading');
    };

    const getTemplateGitUrl = ({projectType, customGitUrl = null}, matchingDefaultProjectType) => {
        return projectType === 'custom' ? customGitUrl : matchingDefaultProjectType.url;
    };

    const getMatchingDefaultProjectType = projectType => projectTypes.find(project => project.value === projectType);

    const getAnswers = async () => {
        const answers = await inquirer.prompt(prompts);
        greet(onboardingQuestionsThanks, 'heading');
        return answers;
    };

    init();

});

module.exports = onboarding;