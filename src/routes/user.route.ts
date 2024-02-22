import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';

const router = express.Router();

// Route: POST /api/v1/auth/register
router.post('/register', registerUser);

// Route: POST /api/v1/auth/login
router.post('/login', loginUser);

export default router;
