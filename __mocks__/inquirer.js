const inquirer = {
    prompt: jest.fn(() => Promise.resolve({
        projectType: 'sitecore',
        shouldContinue: true
    }))
};

module.exports = inquirer;