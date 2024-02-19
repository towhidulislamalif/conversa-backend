/* eslint-disable no-console */
import fs from 'node:fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

// Configure Cloudinary with credentials from the configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Uploads a file to Cloudinary and returns the response.

const uploadFileToCloudinary = async (localPath: string, identifier: string) => {
  try {
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localPath, {
      public_id: identifier,
      resource_type: 'auto',
    });

    // Log the successful response
    console.log('File uploaded to Cloudinary:', response);

    // Delete the local file after successful upload
    await fs.unlink(localPath);

    return response;
  } catch (error) {
    // Log the error if there's an issue with the upload
    console.error('Error uploading file to Cloudinary:', error);

    // Delete the local file in case of an error
    await fs.unlink(localPath);

    // Return null to indicate the failure
    return null;
  }
};

export default uploadFileToCloudinary;
