const inquirer = {
    prompt: jest.fn(() => Promise.resolve({
        shouldContinue: true
    }))
};

module.exports = inquirer;