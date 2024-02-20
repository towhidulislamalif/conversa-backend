// Importing necessary modules
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from the .env file in the current working directory
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Configuration object with environment variables
const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  mongodbURL: process.env.MONGODB_URL,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,
  refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};

// Exporting the configuration object
export default config;
