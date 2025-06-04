import e, { Request, Response, NextFunction } from "express";
import * as DentistService from "../services/dentists.service";

export const getAllDentists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dentists = await DentistService.getAllDentists();
        res.status(200).json(dentists);
    } catch (error) {
        next(error);
    }
};

export const getDentistById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dentist = await DentistService.getDentistById(Number(req.params.id));
        if (!dentist) {
            res.status(404).json({ message: "Dentist not found" });
            return;
        }
        res.status(200).json(dentist);
    } catch (error) {
        next(error);
    }
}

export const createDentist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dentist = await DentistService.createDentist(req.body);
        res.status(201).json(dentist);
    } catch (error) {
        next(error);
    }
}

export const getAvailableSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dentistId = parseInt(req.params.id);
        const dateStr = req.query.date as string;

        if (!dentistId || !dateStr) {
            res.status(400).json({ message: "Dentist ID and date are required" });
            return;
        }
        const availableSlots = await DentistService.getAvailableSlot(dentistId, new Date(dateStr));
        res.status(200).json(availableSlots);
    } catch (error) {
        next(error);
    }
}