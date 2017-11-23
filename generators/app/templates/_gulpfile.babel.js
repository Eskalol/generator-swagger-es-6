import _ from 'lodash';
import del from 'del';
import gulp from 'gulp';
import nodemon from 'nodemon';
import runSequence from 'run-sequence';
<% if (eslint) {%>import eslint from 'gulp-eslint';<%}%>
import babel from 'gulp-babel';
import env from 'gulp-env';
import util from 'gulp-util';
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

gulp.task('test', cb => {
  runSequence(
    'env:test',
    'mocha',
    cb);
});

gulp.task('mocha', () => {
  return spawn('./node_modules/.bin/nyc',
    ['./node_modules/.bin/mocha',
    `${paths.test}`,
    '--compilers',
    'js:babel-register',
    '-R',
    'spec',
    '--timeout',
    '5000'],
    {stdio: 'inherit'}
  );
});

/**
 * Test coverage and report
 */

gulp.task('coverage', cb => {
  runSequence(
    'coverage:report',
    'coverage:codecov',
    cb);
});

gulp.task('coverage:report', () => {
  return spawn('./node_modules/.bin/nyc',
    ['report',
    '--reporter=text-lcov',
    '>',
    'coverage.lcov']);
});

gulp.task('coverage:codecov', () => {
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
