const {
    greetingDuration
} = require('../config/settings.js');
const {
    goodbye
} = require('../config/text.js');
const greet = require('../utils/greet.js');
    
const housekeeping = () => new Promise(async(resolve, reject) => {

    await greet(goodbye, 'heading1', greetingDuration);
    resolve(true);
});

module.exports = housekeeping;