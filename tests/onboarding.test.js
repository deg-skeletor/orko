const {hello} = require('../config/text.js');
const onboarding = require('../steps/01_onboarding.js');

test('Onboarding says hello', async () => {

    const chalk = require('chalk');
    await onboarding();
    expect(chalk['yellowBright']['bgMagenta']['bold']).toHaveBeenCalledWith(hello);

});