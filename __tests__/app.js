'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const test = require('ava');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      name: 'cool',
      author: 'super cool',
      description: 'cool descr',
      eslint: true
    });
});

test('with eslint', () => {
  assert.file([
    'src', '.editorconfig', '.eslintrc.js', 'package.json'
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
