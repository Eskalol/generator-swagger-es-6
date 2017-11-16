'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const test = require('ava');

test.before(() => {
  return helpers.run(path.join(__dirname, '../../generators/app'))
    .withPrompts({
      name: 'cool',
      author: 'super cool',
      description: 'cool descr',
      eslint: true,
      CI: ['Travis-CI', 'Appveyor'],
      docker: true,
      heroku: true,
      auth: true
    });
});

test('with auth', () => {
  assert.file([
    'src',
    '.editorconfig',
    '.eslintrc.js',
    'package.json',
    '.gitignore',
    '.travis.yml',
    'appveyor.yml',
    'README.md',
    'docker-compose.yml',
    'Dockerfile',
    'Procfile',
    'src/auth/local/index.js',
    'src/auth/local/passport.js',
    'src/auth/auth.service.js',
    'src/auth/index.js',
    'src/test/controllers/auth.js',
    'src/test/controllers/User.js',
    'src/test/models/User.js',
    'src/api/controllers/auth.js',
    'src/api/controllers/User.js'
  ]);
});
