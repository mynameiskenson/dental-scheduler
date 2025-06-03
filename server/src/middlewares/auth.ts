import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }

    try {
        const decoded = verifyToken(token);
        (req as any).userId = decoded?.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
        return
    }
}