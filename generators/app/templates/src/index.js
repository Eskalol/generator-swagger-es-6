// Set default node environment to development
const env = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = env;

if (env === 'development' || env === 'test') {
  process.env.NODE_CONFIG_DIR = 'src/config';
  console.log(`Environment is set to: ${env}`); // eslint-disable-line no-console
  require('babel-register'); // eslint-disable-line global-require
} else {
  process.env.NODE_CONFIG_DIR = 'dist/config';
}

require('./app').init();

exports = module.exports = require('./app'); // eslint-disable-line no-multi-assign
