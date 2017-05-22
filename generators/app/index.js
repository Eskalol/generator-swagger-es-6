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
      name: 'swagger-es6-project',
      author: '',
      description: ''
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
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

  }

  install() {
    this.installDependencies();
  }
};
