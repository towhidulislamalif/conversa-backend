/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from '../config';

/**
 * Connects to the MongoDB database using the provided URL from the configuration.
 * Logs success or error messages to the console.
 */
const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongodbURL as string);

    console.log('\nDatabase connection established 🚀\n');
  } catch (error) {
    console.error('\nDatabase connection error 🥲\n', error);

    // Terminate the application if there is a connection error
    process.exit(1);
  }
};

export default connectToDatabase;
