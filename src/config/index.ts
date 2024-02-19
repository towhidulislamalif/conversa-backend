// Importing necessary modules
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from the .env file in the current working directory
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Configuration object with environment variables
const config = {
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  mongodbURL: process.env.MONGODB_URL,
};

// Exporting the configuration object
export default config;
