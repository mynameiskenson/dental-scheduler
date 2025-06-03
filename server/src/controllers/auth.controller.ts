import { Request, Response, NextFunction } from "express";
import * as UserService from '../services/users.service';
import { generateToken } from "../lib/auth";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.createUser(req.body);
        const token = generateToken(user.id);
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.authenticateUser(email, password);
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = generateToken(user.id);
        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};