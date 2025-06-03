// This file defines the routes for user-related operations.
import express from 'express';
import * as UserController from '../controllers/users.controller';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

// Route to get a user by ID and update user profile
router.get('/:id', requireAuth, UserController.getUserById);

// Route to update user profile
router.put('/:id', requireAuth, UserController.updateUser);

export default router;
