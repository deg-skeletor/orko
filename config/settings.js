module.exports = {
    orkoPath: __dirname,
    projectPath: process.cwd(),
    tmpName: '.tmp',
    tmpPath: `${process.cwd()}/.tmp`,
    skelConfigName: 'skeletor.config.js',
    skelInstallName: 'skeletor.install.js',
    orkoConfigName: 'orko.config.js',
    npmInstallCommand: 'npm install',
    packageDefaults: {
        name: 'Skeletor Project',
        projectType: 'sitecore',
        shortName: 'skeletorProject',
        version: '1.0.0',
        description: 'A UI project created with the Skeletor family of build tools.',
        repo: 'https://github.com/deg-skeletor',
        keywords: 'Skeletor',
        author: 'Skeletor UI Developer',
        license: 'ISC'
    },
    projectTypes: [
        {
            name: 'Magento',
            value: 'magento',
            url: 'https://github.com/deg-skeletor/orko-template-magento.git'
        },
        {
            name: 'React',
            value: 'react',
            url: 'https://github.com/deg-skeletor/orko-template-react.git'
        },
        {
            name: 'Salesforce Marketing Cloud',
            value: 'sfmc',
            url: 'https://github.com/deg-skeletor/orko-template-sfmc.git'
        },
        {
            name: 'Sitecore',
            value: 'sitecore',
            url: 'https://github.com/deg-skeletor/orko-template-sitecore.git'
        }
    ]
};