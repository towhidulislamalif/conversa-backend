import config from '../config';
import { User } from '../models/user.model';
import APIError from '../utils/APIError';
import asyncRequestHandler from '../utils/asyncRequestHandler';
import sendAPIResponse from '../utils/sendAPIResponse';

export const registerUser = asyncRequestHandler(async (req, res) => {
  const { firstname, lastname, email, password, dateOfBirth, gender } = req.body;

  if (!firstname || !lastname || !email || !password || !dateOfBirth || !gender) {
    throw new APIError(400, 'All fields are required');
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new APIError(409, 'User already registered');
  }

  const createdUser = await User.create({
    firstname,
    lastname,
    email,
    password,
    dateOfBirth,
    gender,
  });

  const newUser = await User.findOne({ _id: createdUser._id }).select('-password');

  sendAPIResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registration successful',
    data: newUser,
  });
});

export const loginUser = asyncRequestHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new APIError(400, 'All fields are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new APIError(404, 'User not found');
  }

  const checkPassword = await user.comparePassword(password);

  if (!checkPassword) {
    throw new APIError(400, 'Invalid password');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Set HTTP-only cookie for refresh token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });

  sendAPIResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: { accessToken },
  });
});
