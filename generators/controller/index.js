'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'Let\'s create a restful controller for your model!'
    ));

    const prompts = [{
      type: 'input',
      name: 'controller',
      message: 'The name of your restful controller? '
    }, {
      type: 'input',
      name: 'model',
      message: 'The model you want a controller for? '
    }, {
      type: 'input',
      name: 'route',
      message: 'The route of your controller? '
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(`src/api/controllers/${this.props.controller}.js`), {
        controller: this.props.controller,
        model: this.props.model,
        route: this.props.route
      }
    );
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath(`src/test/controllers/${this.props.controller}.js`), {
        controller: this.props.controller,
        model: this.props.model,
        route: this.props.route
      }
    );
  }
};
