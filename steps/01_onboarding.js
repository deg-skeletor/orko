const settings = require('../config/settings.js');
const {
    hello,
    packageCreationCanceled,
    onboardingQuestionsThanks
} = require('../config/text.js');
const onboardingPrompts = require('../config/onboardingPrompts.js');
const inquirer = require('inquirer');
const greet = require('../utils/greet.js');
const packageManager = require('../lib/packageManager')(settings);
    
const onboarding = () => new Promise(async(resolve, reject) => {

    const init = () => {
        sayHello();
        getAnswers();
        sayThanks();
    };

    const sayHello = async () => {
        await greet(hello, 'heading1', settings.greetingDuration);
    };

    const getAnswers = async () => {
        const packageCreationApproved = await packageManager.getCreationApproval();
        if (!packageCreationApproved) {
            reject(packageCreationCanceled);
            return;
        }
    };

    const sayThanks = async () => {
        const answers = await inquirer.prompt(onboardingPrompts);
        await greet(onboardingQuestionsThanks, 'heading1', settings.greetingDuration);
        resolve({
            ...settings.packageDefaults,
            ...answers
        });
    };

    init();

});

module.exports = onboarding;