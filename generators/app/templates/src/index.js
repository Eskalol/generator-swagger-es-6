import server, { init } from './app';

// Set default node environment to development
const env = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = env;

if (env === 'development' || env === 'test') {
  console.log(`Environment is set to: ${env}`);
}

init();

export default server;
