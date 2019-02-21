const settings = require('../config/settings.js');
const {packageDefaults} = settings;
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
        resolve({
            ...packageDefaults,
            ...answers
        });
    };

    const sayHello = async () => {
        greet(hello, 'heading');
    };

    const getAnswers = async () => {
        const answers = await inquirer.prompt(prompts);
        greet(onboardingQuestionsThanks, 'heading');
        return answers;
    };

    init();

});

module.exports = onboarding;