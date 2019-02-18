const inquirer = require('inquirer');
const fs = require('fs-extra');

const copyManager = () => {

    const makeDir = async dir => {
        try {
            await fs.emptyDir(dir);
        } catch (err) {
            console.error(err)
        }
    };

    const removeDir = async dir => {
        try {
            await fs.remove(dir);
        } catch (err) {
            console.error(err)
        }
    };

    const copy = async (src, dest) => {
        try {
            await fs.copy(src, dest);
        } catch (err) {
            console.log(err);
        }
    };

    return {
        makeDir,
        removeDir,
        copy
    };

};

module.exports = copyManager;
