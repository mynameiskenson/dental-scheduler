import express from 'express';
import * as AppointmentController from '../controllers/appointments.controller';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

// Route to create a new appointment
router.post('/', requireAuth, AppointmentController.createAppointment);

// Route to get appointments for a specific user and dentist
router.get('/user/:userId', requireAuth, AppointmentController.getAppointmentsForUser);

// Route to get appointments for a specific dentist
router.get('/dentist/:dentistId', requireAuth, AppointmentController.getAppointmentForDentist);

// Route to cancel an appointment by ID
router.delete('/:id', requireAuth, AppointmentController.cancelAppointment);

export default router;