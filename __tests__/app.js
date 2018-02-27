'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const Inception = require('yo-inception');

describe('swagger-es-6:app', () => {
  let inception;

  beforeAll(() => {
    inception = new Inception(path.join(__dirname, '../tempDir'));
  });

  describe('without auth', () => {
    beforeAll(done => {
      return inception.runGen(path.join(__dirname, '../generators/app'), {
        name: 'cool',
        author: 'super cool',
        description: 'cool descr',
        eslint: true,
        CI: ['Travis-CI', 'Appveyor'],
        docker: true,
        heroku: true,
        auth: false
      }).then(() => done());
    });

    it('should contain all necessary files', () => {
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

    it('should pass all tests', async () => {
      await expect(inception.runAsyncCommand('npm', ['test'])).resolves.toBe(0);
    }, 20000);

    it('should pass linting', async () => {
      await expect(inception.runAsyncCommand('./node_modules/.bin/gulp', ['lint:fix'])).resolves.toBe(0);
    }, 20000);
  });

  describe('with auth', () => {
    beforeAll(done => {
      return inception.runGen(path.join(__dirname, '../generators/app'), {
        name: 'cool',
        author: 'super cool',
        description: 'cool descr',
        eslint: true,
        CI: ['Travis-CI', 'Appveyor'],
        docker: true,
        heroku: true,
        auth: true
      }).then(() => done());
    });

    it('should contain all necessary files', () => {
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
        'gulpfile.babel.js',
        '.codeclimate.yml',
        'mocha.conf.js',
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

    it('should pass all tests', async () => {
      await expect(inception.runAsyncCommand('npm', ['test'])).resolves.toBe(0);
    }, 20000);

    it('should pass linting', async () => {
      await expect(inception.runAsyncCommand('./node_modules/.bin/gulp', ['lint:fix'])).resolves.toBe(0);
    }, 20000);
  });
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
