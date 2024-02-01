import { Request, Response } from 'express';
import db from '../database/Database';
import fs from 'fs';
import path from 'path';

export const getAccountInfo = (req: Request, res: Response): void => {
    const userId = req.user?.id;
    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return
    }

    db.getUserById(userId, (err, user) => {
        if (err || !user) {
            res.status(404).json({ success: false, message: "Пользователь не найден" });
        } else {
            res.json({ success: true, account: user });
        }
    });
};

export const updateAccountInfo = (req: Request, res: Response): void => {
    const userId = req.user?.id;
    const { name, description } = req.body;

    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return
    }

    db.updateUser(userId, { name, description }, (err) => {
        if (err) {
            res.status(500).json({ success: false, message: "Ошибка при обновлении информации аккаунта" });
        } else {
            res.json({ success: true, message: "Информация аккаунта обновлена" });
        }
    });
};

export const uploadAvatar = (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).send('Нет файла для загрузки.');
        return;
    }

    const userId = req.user?.id;
    const avatarUrl = `/uploads/${req.file.filename}`;

    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return
    }

    db.updateUserAvatar(userId, avatarUrl, (err) => {
        if (err) {
            res.status(500).json({ success: false, message: "Ошибка при обновлении аватара" });
        } else {
            res.json({ success: true, message: "Аватар обновлен", avatarUrl });
        }
    });
};

export const deleteAvatar = (req: Request, res: Response): void => {
    const userId = req.user?.id;

    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return
    }

    db.getAvatarUrlById(userId, (err, avatarUrl) => {
        if (err || !avatarUrl) {
            res.status(500).json({ success: false, message: "Ошибка при удалении аватара" });
            return;
        }

        fs.unlink(path.join(__dirname, '../..', avatarUrl), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: "Ошибка при удалении файла аватара" });
                return;
            }

            db.updateUserAvatar(userId, null, (err) => {
                if (err) {
                    res.status(500).json({ success: false, message: "Ошибка при обновлении информации о пользователе" });
                } else {
                    res.json({ success: true, message: "Аватар удален" });
                }
            });
        });
    });
};

export const uploadCover = (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).send('Нет файла для загрузки.');
        return;
    }

    const userId = req.user?.id;
    const coverUrl = `/uploads/${req.file.filename}`;

    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return
    }

    db.updateUserCover(userId, coverUrl, (err) => {
        if (err) {
            res.status(500).json({ success: false, message: "Ошибка при обновлении обложки" });
        } else {
            res.json({ success: true, message: "Обложка обновлена", coverUrl });
        }
    });
};

export const deleteCover = (req: Request, res: Response): void => {
    const userId = req.user?.id;

    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return
    }

    db.getCoverUrlById(userId, (err, coverUrl) => {
        if (err || !coverUrl) {
            res.status(500).json({ success: false, message: "Ошибка при удалении обложки" });
            return;
        }

        fs.unlink(path.join(__dirname, '../..', coverUrl), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: "Ошибка при удалении файла обложки" });
                return;
            }

            db.updateUserCover(userId, null, (err) => {
                if (err) {
                    res.status(500).json({ success: false, message: "Ошибка при обновлении информации о пользователе" });
                } else {
                    res.json({ success: true, message: "Обложка удалена" });
                }
            });
        });
    });
};

export const getAccountsList = (req: Request, res: Response): void => {
    db.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ success: false, message: "Ошибка при получении списка пользователей" });
        } else {
            res.json({ success: true, accounts: users });
        }
    });
};