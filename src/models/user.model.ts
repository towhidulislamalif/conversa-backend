import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { IUser, IUserMethods, UserModel } from '../interface/user.interface';
import config from '../config';

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, lowercase: true, trim: true, required: true },
  username: { type: String, trim: true, required: true, unique: true },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email address is required'],
    unique: true,
    validate: {
      validator: (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
      message: 'Please enter a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
      message:
        'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one digit',
    },
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: (value: string) =>
        /^(0[1-9]|[12][0-9]|3[01])(\/|-)(0[1-9]|1[1,2])(\/|-)(19|20)\d{2}/.test(value),
      message: 'Please enter a valid date of birth in DD/MM/YYYY format',
    },
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'Gender must be either "male" or "female" or "other"',
    },
  },
  profilePicture: { type: String, default: '' },
  status: { type: String, default: 'offline' },
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method for comparing passwords
userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Method for generating access token
userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      username: this.username,
      email: this.email,
    },
    config.access_token_secret as string,
    { expiresIn: config.access_token_expiry },
  );
};

// Method for generating refresh token
userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.refresh_token_secret as string,
    { expiresIn: config.refresh_token_expiry },
  );
};

// Export the User model
export const User = mongoose.model<IUser, UserModel>('User', userSchema);
