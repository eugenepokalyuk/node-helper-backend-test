import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ success: false, message: "Токен аутентификации не предоставлен" });
        return
    }

    const decoded = verifyToken(token);
    if (decoded) {
        req.user = decoded;
        next();
    } else {
        res.status(401).json({ success: false, message: "Неверный или истекший токен" });
    }
};