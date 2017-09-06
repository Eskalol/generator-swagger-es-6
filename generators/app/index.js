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
      type: 'confirm',
      name: 'eslint',
      message: 'Would you like to enable eslint with airbnb config?'
    }, {
      type: 'confirm',
      name: 'docker',
      message: 'Would you like to deploy with docker?'
    }, {
      type: 'confirm',
      name: 'heroku',
      message: 'Would you like to deploy on heroku?'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
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

    this.fs.copy(
      this.templatePath('src/'),
      this.destinationPath('src/')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        author: this.props.author,
        description: this.props.description
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
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });

    if (this.props.eslint) {
      this.npmInstall(['eslint',
        'eslint-config-airbnb-base',
        'eslint-plugin-import'],
        {'save-dev': true});
    }
  }
};
