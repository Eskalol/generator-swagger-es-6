import _ from 'lodash';
import del from 'del';
import gulp from 'gulp';
import nodemon from 'nodemon';
import runSequence from 'run-sequence';
<% if (eslint) {%>import eslint from 'gulp-eslint';<%}%>
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import util from 'gulp-util';
import env from 'gulp-env';
import istanbul from 'gulp-istanbul';
import { Instrumenter as isparta } from 'isparta';
import spawn from 'cross-spawn';

const paths = {
  src: 'src',
  scripts: 'src/**/*.js',
  swagger: {
    config: 'src/config/default.yaml',
    spec: 'src/api/swagger/*.yaml'
  },
  test: 'src/test/**/*.js',
  dist: 'dist'
};

function onServerLog(log) {
  console.log(util.colors.white('[') +
      util.colors.yellow('nodemon') +
      util.colors.white('] ') +
      log.message);
}

/**
 * Serve
 */

gulp.task('serve:dist', cb => {
  runSequence(
    'build',
    'env:prod',
    'start:prod',
    cb);
});

gulp.task('serve', cb => {
  runSequence(
    'env:dev',
    'start:dev',
    cb);
});

/**
 * Swagger
 */

gulp.task('swagger', () => {
  return spawn('./node_modules/.bin/swagger-editor-live',
    ['src/api/swagger/swagger.yaml',
    '--port=35568'],
    {stdio: 'inherit'}
  );
});

/**
 * Start servers
 */

gulp.task('start:dev', () => {
    nodemon(`-w ${paths.src} ${paths.src}`)
      .on('log', onServerLog);
});

gulp.task('start:prod', () => {
  nodemon(`-w ${paths.dist} ${paths.dist}`)
    .on('log', onServerLog);
});

/**
 * Env
 */

gulp.task('env:dev', () => {
  env({
    vars: { NODE_ENV: 'development' }
  });
});

gulp.task('env:test', () => {
  env({
    vars: { NODE_ENV: 'test' }
  });
});

gulp.task('env:prod', () => {
  env({
    vars: { NODE_ENV: 'production' }
  });
});
<% if (eslint) {%>
/**
 * Linting
 */

gulp.task('lint', () => {
  return gulp.src(_.union([`${paths.scripts}`], [`!${paths.test}`]))
    .pipe(eslint({
      configFile: '.eslintrc.js'
    }))
    .pipe(eslint.format());
});

gulp.task('lint:fix', () => {
  return gulp.src(_.union([`${paths.scripts}`], [`!${paths.test}`]))
    .pipe(eslint({
      configFile: '.eslintrc.js',
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(gulp.dest('./src'));
});<%}%>

/**
 * Testing
 */

gulp.task('pre-test', () => {
  return gulp.src(_.union([`${paths.scripts}`], [`!${paths.test}`]))
    .pipe(istanbul({
      instrumenter: isparta
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['env:test', 'pre-test'], () => {
  return gulp.src(`${paths.test}`)
    .pipe(mocha({
      reporter: 'spec',
      timeout: 5000,
      require: [
        './mocha.conf'
      ]
    }))
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: [ 'lcov', 'text', 'text-summary'],
      reportOpts: {
        lcov: {dir: '.', file: 'lcov.info'}
      }
    }))
    .on('end', () => process.exit());
});

/**
 * Report coverage to codecov
 */

gulp.task('coverage', () => {
  return spawn('./node_modules/.bin/codecov');
});

/**
 * Build
 */

gulp.task('build', cb => {
  runSequence(
      'clean:dist',
      'transpile',
      'copy:yaml',
      cb);
});

gulp.task('transpile', () => {
  return gulp.src(_.union([`${paths.scripts}`], [`!${paths.test}`]))
    .pipe(babel({
      presets: [
        'es2015',
        'stage-0'
      ],
      plugins: [
        'transform-runtime'
      ]
    }))
    .pipe(gulp.dest(`${paths.dist}`));
});

gulp.task('copy:yaml', () => {
  return gulp.src('src/**/*.yaml')
    .pipe(gulp.dest(`${paths.dist}`));
});

gulp.task('clean:dist', () => del([`${paths.dist}/!(.git*|.openshift|Procfile)**`], {dot: true}));

/**
 * Default
 */

gulp.task('default', cb => {
  runSequence(
    [
      'serve',
      'swagger'
    ],
    cb)
});
