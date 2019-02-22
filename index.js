const goodbye = require('./config/text.js').goodbye;
const greet = require('./utils/greet.js');
const onboarding = require('./steps/01_onboarding.js');
const downloading = require('./steps/02_downloading.js');
const installing = require('./steps/03_installing.js');
const copying = require('./steps/04_copying.js');
const housekeeping = require('./steps/05_housekeeping.js');

const orko = () => {

    const start = () => {
        onboarding()
            .then(downloading)
            .then(installing)
            .then(copying)
            .then(housekeeping)
            .catch(onError);
    };

    const onError = msg => {
        greet(msg, 'error');
        greet(goodbye, 'heading');
    };

    return {
        start
    };
};

module.exports = orko;