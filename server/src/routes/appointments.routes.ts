import express from 'express';
import * as AppointmentController from '../controllers/appointments.controller';

const router = express.Router();

// Route to create a new appointment
router.post('/', AppointmentController.createAppointment);

// Route to get appointments for a specific user and dentist
router.get('/user/:userId', AppointmentController.getAppointmentsForUser);

// Route to get appointments for a specific dentist
router.get('/dentist/:dentistId', AppointmentController.getAppointmentForDentist);

// Route to cancel an appointment by ID
router.delete('/:id', AppointmentController.cancelAppointment);