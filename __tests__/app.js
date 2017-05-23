'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-swagger-es-6:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'cool',
        author: 'super cool',
        description: 'cool descr',
        eslint: true
      });
  });

  it('creates files', () => {
    assert.file([
      'src', '.editorconfig', '.eslintrc.js'
    ]);
  });
});
