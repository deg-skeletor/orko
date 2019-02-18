const semverRegex = require('semver-regex');
const camelize = require('../utils/textUtils.js').camelize;
const {packageDefaults, projectTypes} = require('../config/settings.js');

const isRequired = (answer = null) => {
	return answer && answer.length > 0;
};

module.exports = [
	{
		name: 'name',
		message: `What's the name of your project?`,
		type: 'input',
		validate: answer => isRequired(answer) || `You must enter a name for your project.`,
		default: packageDefaults.name 
	},
	{
		name: 'projectType',
		message: 'What type of project is this?',
		type: 'list',
		validate: answer => isRequired(answer) || `You must select a project type.`,
		choices: projectTypes,
		default: packageDefaults.projectType
	},
	{
		name: 'customizePackageSetup',
		message: `Would you like to customize your package.json setup? (if not, I'll use some common-sense defaults)`,
		type: 'confirm',
		default: false
	},
	{
		when: response => response.customizePackageSetup,
		name: 'shortName',
		message: `What is your project's one-word short name (used by package.json)?`,
		validate: answer => isRequired(answer) || `You must enter a short name.`,
		default: response => camelize(response.name)
	},
	{
		when: response => response.customizePackageSetup,
		name: 'version',
		message: `Version number?`,
		validate: answer => {
			const meetsRequired = isRequired(answer);
			if (meetsRequired !== true) {
				return `You must enter a version number.`;
			}
			return semverRegex().test(answer) || 'You must enter a valid version number.';
		},
		default: packageDefaults.version
	},
	{
		when: response => response.customizePackageSetup,
		name: 'description',
		message: `Description?`,
		validate: answer => isRequired(answer) || `You must enter a description.`,
		default: packageDefaults.description
	},
	{
		when: response => response.customizePackageSetup,
		name: 'repo',
		message: `Git repository?`,
		default: packageDefaults.repo
	},
	{
		when: response => response.customizePackageSetup,
		name: 'keywords',
		message: `Keywords?`,
		default: packageDefaults.keywords
	},
	{
		when: response => response.customizePackageSetup,
		name: 'author',
		message: `Author?`,
		validate: answer => isRequired(answer) || `You must enter an author.`,
		default: packageDefaults.author
	},
	{
		when: response => response.customizePackageSetup,
		name: 'license',
		message: `License type?`,
		validate: answer => isRequired(answer) || `You must enter a license.`,
		default: packageDefaults.license
	}
];