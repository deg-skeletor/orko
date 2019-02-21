const chalk = require('chalk');
const defaults = {
    text: 'white',
    background: 'bgBlack',
    modifier: 'none'
};
const themes = {
    heading: {
        text: 'yellowBright',
        background: 'bgMagenta',
        modifier: 'bold'
    },
    error: {
        text: 'red',
        background: 'bgBlack',
        modifier: 'bold'
    }
}

const greet = (msg = null, theme = false) => {
    if (!msg) {
        return;
    }
    if (!theme || !themes[theme]) {
        return console.log(msg);
    }
    const matchingTheme = {
        ...defaults,
        ...themes[theme]
    };
    console.log(chalk[matchingTheme.text][matchingTheme.background][matchingTheme.modifier](msg));
};

module.exports = greet;