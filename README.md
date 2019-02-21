# Orko

Orko is the scaffolding tool for the Skeletor UI build tool ecosystem. By running Orko at the beginning of a project, you can build out an entire Skeletor-enabled UI project, preconfigured to work with the platform of your choice.

## Installation
Orko is automatically installed alongside the [skeletor-cli](https://github.com/deg-skeletor/skeletor-cli) tools. Once installed, he can be initialized using the `skel init` command.

## IMPORTANT NOTE
**Orko is intended to be run only at the start of a project, and will overwrite any conflicting files in the directory from which he is run.** Although there are several built-in confirmation steps to help prevent accidental file deletion, it is recommended to only run Orko from an empty directory, or from a directory in which you're OK with files and folders being overwritten.

## Orko Lifecycle
Once Orko is initiated, it will make its way through 5 steps:
1. **Onboarding.** During onboarding, Orko will say hello, check for existing project files and make sure you're OK overwriting them if they exist. He will also ask several questions about your project, including typical package.json configuration values.
2. **Downloading.** During downloading, Orko will download the templates files from your platform choice during onboarding into a `.tmp` directory, and then prep these files for installation and copying. *Hooks available: `afterdownload`*
3. **Installing.** During installation, Orko will copy a few essential files (such as `package.json` and `skeletor.install.js`) to your project directory and run an `npm install`. *Hooks available: `afterinstall`*
4. **Copying.** Up to this point, most of the files Orko has worked on have existed in a `.tmp` directory. During this step, Orko will copy these temporary files into your project directory, overwriting anything that gets in its way.
5. **Housekeeping**This is largely a cleanup step. Orko will remove any of its own working files and directories that aren't relevant to your project, say goodbye, and get out of your way!

## Hooks
Hooks are typically defined in the project templates as a way to copy specific files after a lifecycle step has completed. This is useful for copying files that might otherwise conflict with the platform template's ability to be hosted on its own Git repository (such as `.gitignore`, `README.md` and `package.json` files), as well as any files that can only be copied after an `npm install` is run (such as platform-specific starter kit files).

During a hook's execution, each file that is copied will be automatically analyzed for any "tokens" that match answers to questions from the onboarding step. These answer values include:

* `name`: The name of your project
* `projectType`: The platform or type of project (custom, magento, sfcc, spaReact, or sitecore)
* `shortName`: A single-word version of the project's name (typically used as the "name" property in package.json)
* `version`: A [SemVer](https://semver.org/)-compatible version number
* `description`: A description of your project
* `repo`: A link to your project's Git repository
* `keywords`: A list of keywords, typically used by package.json
* `author`: Your name!
* `license`: The type of software license your project will use

Replaceable tokens inside of a template's files should follow the `{{tokenName}}` syntax. For example, if your platform's `package.json ` template file contains a `{{version}}` token, this token will be replaced with the value you supplied to the `Version?` question during the onboarding step, as the file is copied over during hook execution. 

## Platform Templates
Orko is preconfigured to work with the most common CMS platforms and technology stacks used by DEG. During installation, Orko will prompt you with the following platform choices, each of which will download relevant template files from a predefined Git repository.

### Available Platform Repos
* Custom (Supply your own Git repository): Coming soon
* Magento: Coming soon
* Salesforce: Coming soon
* Single Page Application (React): Coming soon
* Sitecore: https://github.com/deg-skeletor/orko-template-sitecore

### orko.config.js
Each platform repo may contain an `orko.config.js file`, which is comprised of a configuration object. The `hooks` section of this object will define files to be copied, via an array of objects containing `src` and `dest` properties.

#### Sample orko.config.js file
```javascript
module.exports = {
    hooks: {
        afterdownload: [
            {
                src: '/orko/.gitignore',
                dest: '/.gitignore'
            },
            {
                src: '/orko/package.json',
                dest: '/package.json'
            },
            {
                src: '/orko/README.md',
                dest: '/README.md'
            }
        ],
        afterinstall: [
            {
                src: '/orko/_01-foot.mustache',
                dest: '/source/_meta/_01-foot.mustache'
            },
            {
                src: '/orko/main.js',
                dest: '/source/js/main.js'
            }
        ]
    }
};
```

### skeletor.install.js
This optional file will define Skeletor install tasks that will be run after Orko clones the template and installs its dependencies. This file is typically used by Pattern Lab (a static site generator preinstalled by several platform templates) to install a subsequent "starter kit".

#### Sample skeletor.install.js file
```javascript
const {patternLabConfig} = require('./skeletor/common/patterns.config.js');

module.exports = {
	name: 'install',
	subTasks: [
		{
			name: 'starterkit',
			plugins: [
				{
					name: '@deg-skeletor/plugin-patternlab',
					config: {                
						patternLabConfig,
						method: 'loadstarterkit',
						methodArgs: ['@deg-skeletor/starterkit-mustache-default']
					}
				}
			]
		}
	]
};
```

### orko directory
This specially-named directory is ignored during Orko's copy step and deleted during cleanup step, making it an excellent place to store template files that will be copied over during hooks defined in your `orko.config.js` file. Typical contents include `.gitignore`, `package.json` and `README.md` files that might conflict with the template repo itself.
