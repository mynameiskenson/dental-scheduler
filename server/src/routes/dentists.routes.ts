import express from 'express';
import * as DentistController from '../controllers/dentists.controller';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

// Route to get all dentists
router.get('/', requireAuth, DentistController.getAllDentists);

// Route to get a dentist by ID
router.get('/:id', requireAuth, DentistController.getDentistById);

// Route to create a new dentist
router.post('/', requireAuth, DentistController.createDentist);

// Route to get available slots for a dentist
router.get('/:id/slots', requireAuth, DentistController.getAvailableSlot);

export default router;