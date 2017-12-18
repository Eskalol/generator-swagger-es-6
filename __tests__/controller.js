'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(() => {
  return helpers.run(path.join(__dirname, '../generators/controller'))
    .withPrompts({
      controller: 'coo_controller',
      mode: 'Coo',
      route: '/coo'
    });
});

test('swagger-es-6:controller ', () => {
  assert.file([
    'src/api/controllers/coo_controller.js',
    'src/test/controllers/coo_controller.js'
  ]);
});
