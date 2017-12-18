'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(() => {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      name: 'cool',
      author: 'super cool',
      description: 'cool descr',
      eslint: true,
      CI: ['Travis-CI', 'Appveyor'],
      docker: true,
      heroku: true,
      auth: false
    });
});

test('with eslint', () => {
  assert.file([
    'src',
    '.editorconfig',
    '.eslintrc.js',
    'package.json',
    '.gitignore',
    '.travis.yml',
    'mocha.conf.js',
    'appveyor.yml',
    'README.md',
    'docker-compose.yml',
    'Dockerfile',
    'Procfile',
    'gulpfile.babel.js',
    '.codeclimate.yml'
  ]);

  assert.noFile([
    'src/auth/local/index.js',
    'src/auth/local/passport.js',
    'src/auth/auth.service.js',
    'src/auth/index.js',
    'src/test/controllers/auth.js',
    'src/test/controllers/user.js',
    'src/test/models/user.js',
    'src/api/controllers/auth.js',
    'src/api/controllers/user.js'
  ]);
});

// test.before(() => {
//   return helpers.run(path.join(__dirname, '../generators/app'))
//     .withPrompts({
//       name: 'cool',
//       author: 'super cool',
//       description: 'cool descr',
//       eslint: false
//     });
// });

// test('without eslint', () => {
//   assert.file([
//     'src', 'package.json'
//   ]);
// });
