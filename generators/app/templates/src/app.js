import SwaggerExpress from 'swagger-express-mw';
import app from 'express';
import config from './config/environment';

// Set default node environment to development
const env = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = env;

if (env === 'development' || env === 'test') {
  console.log(`Environment is set to: ${env}`);
}

const server = app();

export const init = () => {
  const appConfig = {
    appRoot: __dirname, // required config
  };

  SwaggerExpress.create(appConfig, (err, swaggerExpress) => {
    if (err) { throw err; }

    // install middleware
    swaggerExpress.register(server);

    server.listen(config.port);

  });
};

export default server; // for testing
