import mongoose from 'mongoose';
import config from './environment';

mongoose.Promise = global.Promise;
const connection = mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on('error', (err) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`MongoDB connection error: ${err}`); // eslint-disable-line no-console
  }
  process.exit(-1); // eslint-disable-line no-process-exit
});

mongoose.connection.once('open', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('mongodb connection open'); // eslint-disable-line no-console
  }
});

export default connection;
