import mongoose from 'mongoose';
import config from './environment';

mongoose.Promise = global.Promise;
const connection = mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

mongoose.connection.once('open', () => {
  console.log('mongodb connection open');
});

export default connection
