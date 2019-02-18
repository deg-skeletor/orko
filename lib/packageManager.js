const inquirer = require('inquirer');
const fse = require('fs-extra');

const packageManager = ({projectPath, text}) => {

    const getCreationApproval = async () => {
        const exists = await packageExists();
        if (!exists) {
            return true;
        }
        return await inquirer.prompt({
            name: 'shouldContinue',
            message: text.packageAlreadyExists,
            type: 'confirm',
            default: false
        }).then(answer => answer.shouldContinue);
    };

    const packageExists = async () => {
        try {
            return await fse.pathExists(`${projectPath}/package.json`);
        } catch(error) {
            return false;
        };
    };

    return {
        getCreationApproval
    };

};

module.exports = packageManager;