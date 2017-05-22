// Test specific configuration
// ===========================

process.env.NODE_CONFIG_DIR = 'src/config';

export default {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost',
  },
};
