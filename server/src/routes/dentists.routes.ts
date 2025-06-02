import express from 'express';
import * as DentistController from '../controllers/dentists.controller';

const router = express.Router();

// Route to get all dentists
router.get('/', DentistController.getAllDentists);

// Route to get a dentist by ID
router.get('/:id', DentistController.getDentistById);

// Route to create a new dentist
router.post('/', DentistController.createDentist);

export default router;