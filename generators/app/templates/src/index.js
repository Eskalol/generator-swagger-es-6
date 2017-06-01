import server, { init } from './app';

// Set default node environment to development
const env = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = env;

if (env === 'development' || env === 'test') {
  process.env.NODE_CONFIG_DIR = 'src/config';
  console.log(`Environment is set to: ${env}`); // eslint-disable-line no-console
} else {
  process.env.NODE_CONFIG_DIR = 'dist/config';
}

init();

export default server;
