module.exports = {
    orkoPath: __dirname,
    projectPath: process.cwd(),
    tmpPath: `${process.cwd()}/.tmp`,
    greetingDuration: 0,
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
            name: `Custom (Supply your own Git URL)`,
            value: 'custom'
        },
        {
            name: 'Magento',
            value: 'magento'
        },
        {
            name: 'Salesforce Commerce Cloud',
            value: 'sfcc'
        },
        {
            name: 'Single Page Application - React',
            value: 'spaReact'
        },
        {
            name: 'Sitecore',
            value: 'sitecore',
            url: 'https://github.com/deg-skeletor/orko-template-sitecore.git'
        }
    ]
};