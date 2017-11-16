'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the primo ' + chalk.red('generator-swagger-es-6') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name.',
      default: this.appname
    }, {
      type: 'input',
      name: 'author',
      message: 'Your name.',
      store: true
    }, {
      type: 'input',
      name: 'description',
      message: 'Write a description.',
      default: ''
    }, {
      type: 'input',
      name: 'git',
      message: 'Your git repository.',
      default: ''
    },
    {
      type: 'confirm',
      name: 'auth',
      message: 'Would you an authentication boilerplate?'
    },
    {
      type: 'confirm',
      name: 'eslint',
      message: 'Would you like to enable eslint with airbnb config?'
    }, {
      type: 'checkbox',
      name: 'CI',
      message: 'Which CI\'s would you like to use?',
      choices: [{
        name: 'travis',
        value: 'Travis-CI',
        checked: false
      }, {
        name: 'appveyor',
        value: 'Appveyor',
        checked: false
      }]
    }, {
      type: 'confirm',
      name: 'docker',
      message: 'Would you like to deploy with docker?'
    }, {
      type: 'confirm',
      name: 'heroku',
      message: 'Initialize Procfile for heroku?'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let excludeFiles = [];
    if (!this.props.auth) {
      excludeFiles.push(...[
        '**/src/auth/**/*',
        '**/src/test/controllers/auth.js',
        '**/src/test/controllers/user.js',
        '**/src/test/models/user.js',
        '**/src/models/user.js',
        '**/src/api/controllers/auth.js',
        '**/src/api/controllers/user.js'
      ]);
    }
    const copyOptions =
      excludeFiles.length === 0 ? null :
      {
        globOptions: {
          ignore: excludeFiles
        }
      };
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    if (this.props.eslint) {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintrc.js'),
        this.destinationPath('.eslintrc.js')
      );
    }
    this.fs.copyTpl(
      this.templatePath('src/'),
      this.destinationPath('src/'), {
        auth: this.props.auth
      }, null, copyOptions
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        author: this.props.author,
        description: this.props.description,
        git: this.props.git,
        auth: this.props.auth,
        eslint: this.props.eslint
      }
    );
    if (this.props.docker) {
      this.fs.copyTpl(
        this.templatePath('_Dockerfile'),
        this.destinationPath('Dockerfile'), {
          cwd: `${process.cwd()}`
        }
      );
      this.fs.copyTpl(
        this.templatePath('_docker-compose.yml'),
        this.destinationPath('docker-compose.yml'), {
          cwd: `${process.cwd()}`
        }
      );
      this.fs.copy(
        this.templatePath('_env'),
        this.destinationPath('.env')
      );
    }
    if (this.props.heroku) {
      this.fs.copy(
        this.templatePath('_Procfile'),
        this.destinationPath('Procfile')
      );
    }
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        git: this.props.git,
        name: this.props.name,
        repoName: this.parseGitReopName(this.props.git),
        docker: this.props.docker,
        travis: this.props.CI && this.props.CI.includes('Travis-CI'),
        appveyor: this.props.CI && this.props.CI.includes('Appveyor')
      }
    );
    if (this.props.CI && this.props.CI.includes('Travis-CI')) {
      this.fs.copy(
        this.templatePath('_travis.yml'),
        this.destinationPath('.travis.yml')
      );
    }
    if (this.props.CI && this.props.CI.includes('Appveyor')) {
      this.fs.copy(
        this.templatePath('_appveyor.yml'),
        this.destinationPath('appveyor.yml')
      );
    }
  }

  parseGitReopName(git) {
    var regex = new RegExp(/(?:\.[a-z]+[\:|\/])(.+)(?:\.git)/); // eslint-disable-line no-useless-escape
    var match = String(git).match(regex);
    if (match) {
      return match[1];
    }
    return '';
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
