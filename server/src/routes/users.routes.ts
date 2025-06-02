// This file defines the routes for user-related operations.
import express from 'express';
import * as UserController from '../controllers/users.controller';

const router = express.Router();

// Route to register a new user
router.post('/register', UserController.registerUser);

// Route to get a user by ID and update user profile
router.get('/:id', UserController.getUserById);

// Route to update user profile
router.put('/:id', UserController.updateUser);

export default router;
