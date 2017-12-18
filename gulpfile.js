'use strict';

const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');
const nsp = require('gulp-nsp');
const jest = require('gulp-jest').default;
const Inception = require('yo-inception');

gulp.task('nsp', nodeSecurityProtocol);
gulp.task('static', eslintCheck);

gulp.task('prepublish', gulp.series('nsp'));

let inception;

// const inceptionInit = async () => {
//     inception = new Inception(path.join(__dirname, 'tempDir'));
//     return await inception.npmInstall(false);
// };

/**
 * installing node_modules for generated code into tempFolder.
 * Used for symlinking into in memory code for testing.
 */
gulp.task('pre-test', done => {
  inception = new Inception(path.join(__dirname, 'tempDir'));
  inception.copyPackageJson(path.join(__dirname, 'generators/app/templates/_package.json'), {
    name: 'test',
    author: 'awesomeAuthor',
    description: 'this is just test',
    git: 'cool',
    auth: true,
    eslint: true,
    travis: true
  });
  return inception.npmInstall()
    .then(done);
});

gulp.task('post-test', done => {
  inception.clean();
  done();
});

gulp.task('jest', () => {
  return gulp.src('./').pipe(jest({
    automock: false,
    coverageDirectory: './coverage/',
    collectCoverage: true,
    collectCoverageFrom: [
      '**/generators/**/*.js',
      '!**/node_modules/**',
      '!**/templates/**'
    ],
    testMatch: [
      '**/__tests__/**/*.js'
    ]
  }));
});

gulp.task('test', gulp.series('pre-test', 'jest', 'post-test'));

gulp.task('default', gulp.series('static', 'test'));

function nodeSecurityProtocol(cb) {
  nsp({package: path.resolve('package.json')}, cb);
}

function eslintCheck() {
  return gulp.src(['**/*.js', '!**/templates/**', '!**/__tests__/**/*.js'])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
