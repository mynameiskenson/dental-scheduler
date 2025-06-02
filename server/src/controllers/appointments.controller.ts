import { Request, Response, NextFunction } from "express";
import * as AppointmentService from "../services/appointments.service";

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await AppointmentService.createAppointment(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
}

export const getAppointmentsForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointments = await AppointmentService.getAppointmentForUser(Number(req.params.userId));
        if (!appointments) {
            res.status(404).json({ message: "No appointments found for this user" });
            return;
        }
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
}

export const getAppointmentForDentist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointments = await AppointmentService.getAppointmentForDentist(Number(req.params.dentistId));
        if (!appointments) {
            res.status(404).json({ message: "No appointments found for this dentist" });
            return;
        }
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
}

export const cancelAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await AppointmentService.cancelAppointment(Number(req.params.id));
        if (!appointment) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }
        res.status(200).json({ message: "Appointment cancelled successfully" });
    } catch (error) {
        next(error);
    }
}