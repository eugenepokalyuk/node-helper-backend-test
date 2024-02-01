import { Request, Response } from 'express';
import db from '../database/Database';
import { generateToken } from '../utils/jwtUtils';

export const register = (req: Request, res: Response): void => {
    const { name, email, password } = req.body;
    db.registerUser({ name, email, password }, (err, userId) => {
        if (err || !userId) {
            res.status(400).json({ success: false, message: err?.message || "Ошибка регистрации" });
        } else {
            const token = generateToken({ id: userId, email });
            res.json({ success: true, message: "Пользователь успешно зарегистрирован", userId });
        }
    });
};

export const login = (req: Request, res: Response): void => {
    const { email, password } = req.body;
    db.loginUser(email, password, (err, user) => {
        if (err || !user || typeof user.id !== 'number') {
            res.status(401).json({ success: false, message: "Неверные учетные данные" });
        } else {
            const token = generateToken({ id: user.id, email: user.email });
            res.json({ success: true, message: "Вход успешен", token });
        }
    });
};

export const logout = (req: Request, res: Response): void => {
    res.json({ success: true, message: "Вы успешно вышли из системы" });
};
