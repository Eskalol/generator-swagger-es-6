'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const test = require('ava');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/model'))
    .withPrompts({
      name: 'Coo'
    });
});

test('swagger-es-6:model ', () => {
  assert.file([
    'src/models/Coo.js',
    'src/test/models/Coo.js'
  ]);
});
