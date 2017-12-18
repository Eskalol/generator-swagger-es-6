'use strict';

const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');
const nsp = require('gulp-nsp');
const jest = require('gulp-jest').default;

gulp.task('nsp', nodeSecurityProtocol);
gulp.task('static', eslintCheck);

gulp.task('prepublish', gulp.series('nsp'));

gulp.task('test', function () {
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
