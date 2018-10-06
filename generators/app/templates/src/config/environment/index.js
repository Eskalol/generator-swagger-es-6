import _ from 'lodash';
import dev from './development';
import test from './testEnv';
import prod from './production';

let env = dev;

if (process.env.NODE_ENV === 'test') {
  env = test;
}

if (process.env.NODE_ENV === 'production') {
  env = prod;
}

const all = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 10010,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  seedDB: false,

  mongo: {
    options: {
      useNewUrlParser: true
      // mongodb options: see http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html
    }
  }<% if (auth) {%>,
  // Set secret in environment for production!
  secrets: {
    session: process.env.SECRET_SESSION || 'random-secret',
  },<%}%>
};

export default _.merge(
  all,
  env || {},
);
