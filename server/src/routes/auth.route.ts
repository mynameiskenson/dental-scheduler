import express from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = express.Router();

// Register a new user
router.post('/register', AuthController.registerUser);

// Login an existing user
router.post('/login', AuthController.loginUser);

export default router;