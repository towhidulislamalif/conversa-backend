import mongoose from 'mongoose';

/* eslint-disable no-unused-vars */

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  profilePicture: string;
  status: string;
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export type UserModel = mongoose.Model<IUser, Record<string, unknown>, IUserMethods>;
