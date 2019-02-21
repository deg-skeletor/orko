const inquirer = require('inquirer');
const fs = require('fs-extra');
const asyncForEach = require('../utils/arrayUtils.js').asyncForEach;

const copyManager = () => {

    const ensureArray = obj => {
        if (Array.isArray(obj) === false) {
            return [obj];
        }
        return obj;
    };

    const makeDir = async dir => {
        try {
            await fs.emptyDir(dir);
        } catch (err) {
            console.error(err)
        }
    };

    const remove = async (stuffToRemove = []) => {
        stuffToRemove = ensureArray(stuffToRemove);
        await asyncForEach(stuffToRemove, async item => {
            await removeItem(item);
        });
    };

    const removeItem = async item => {
        try {
            await fs.remove(item);
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

    const move = async (src, dest) => {
        try {
            await fs.move(src, dest, {
                overwrite: true
            });
        } catch (err) {
            console.error(err)
        }
    };

    const write = async (src, dest) => {
        try {
            await fs.outputFile(src, dest);
        } catch (err) {
            console.error(err)
        }
    };

    return {
        makeDir,
        remove,
        copy,
        move,
        write
    };

};

module.exports = copyManager;
