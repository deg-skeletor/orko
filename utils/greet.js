const chalk = require('chalk');
const typewriter = require('node-typewriter');

const defaults = {
    text: 'white',
    background: 'bgBlack',
    modifier: 'none'
};
const themes = {
    heading1: {
        text: 'yellowBright',
        background: 'bgMagenta',
        modifier: 'bold'
    },
    error1: {
        text: 'red',
        background: 'bgBlack',
        modifier: 'bold'
    }
}

const greet = (msg = null, theme = false, typewriterSpeed = null) => {
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
    if (typewriterSpeed !== null && typewriterSpeed > 0) {
        return typewriter(chalk[matchingTheme.text][matchingTheme.background][matchingTheme.modifier](msg + '\n'), typewriterSpeed);
    } else {
        console.log(chalk[matchingTheme.text][matchingTheme.background][matchingTheme.modifier](msg));
    }
    
};

module.exports = greet;