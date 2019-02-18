const goodbye = require('./config/text.js').goodbye;
const greet = require('./utils/greet.js');
const onboarding = require('./steps/01_onboarding.js');
const downloading = require('./steps/02_downloading.js');
const installing = require('./steps/03_installing.js');
const copying = require('./steps/04_copying.js');
const housekeeping = require('./steps/05_housekeeping.js');

const orko = () => {

    let answers = {};

    const start = async () => {
        onboarding()
            .then(onboardingAnswers => appendAnswers('onboarding', onboardingAnswers))
            .then(() => downloading(answers))
            .then(() => installing(answers))
            .then(() => copying(answers))
            .then(() => housekeeping(answers))
            .catch(onError);
    };

    const appendAnswers = (key, addedAnswers) => {
        answers = {
            ...answers,
            [key]: addedAnswers
        };
        return Promise.resolve();
    };

    const onError = msg => {
        greet(msg, 'error1');
        greet(goodbye, 'heading1', 2000);
    };

    start();

    return {
        start
    };
};

module.exports = orko();