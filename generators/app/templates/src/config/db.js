import mongoose from 'mongoose';
import config from './environment';

export default mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});
