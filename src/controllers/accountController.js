const db = require('../database/Database');
const fs = require('fs');
const path = require('path');

exports.getAccountInfo = (req, res) => {
    const userId = req.user.id;
    db.getUserById(userId, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ success: false, message: "Пользователь не найден" });
        }
        res.json({ success: true, account: user });
    });
};

exports.updateAccountInfo = (req, res) => {
    const userId = req.user.id;
    const { name, description } = req.body;
    db.updateUser(userId, { name, description }, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Ошибка при обновлении информации аккаунта" });
        }
        res.json({ success: true, message: "Информация аккаунта обновлена" });
    });
};

exports.uploadAvatar = (req, res) => {
    if (!req.file) {
        return res.status(400).send('Нет файла для загрузки.');
    }
    const userId = req.user.id;
    const avatarUrl = `/uploads/${req.file.filename}`;
    db.updateUserAvatar(userId, avatarUrl, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Ошибка при обновлении аватара" });
        }
        res.json({ success: true, message: "Аватар обновлен", avatarUrl });
    });
};

exports.deleteAvatar = (req, res) => {
    const userId = req.user.id;
    db.getAvatarUrlById(userId, (err, avatarUrl) => {
        if (err || !avatarUrl) {
            return res.status(500).json({ success: false, message: "Ошибка при удалении аватара" });
        }
        fs.unlink(path.join(__dirname, '../..', avatarUrl), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Ошибка при удалении файла аватара" });
            }
            db.updateUserAvatar(userId, null, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: "Ошибка при обновлении информации о пользователе" });
                }
                res.json({ success: true, message: "Аватар удален" });
            });
        });
    });
};

exports.uploadCover = (req, res) => {
    if (!req.file) {
        return res.status(400).send('Нет файла для загрузки.');
    }
    const userId = req.user.id;
    const coverUrl = `/uploads/${req.file.filename}`;
    db.updateUserCover(userId, coverUrl, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Ошибка при обновлении обложки" });
        }
        res.json({ success: true, message: "Обложка обновлена", coverUrl });
    });
};

exports.deleteCover = (req, res) => {
    const userId = req.user.id;
    db.getCoverUrlById(userId, (err, coverUrl) => {
        if (err || !coverUrl) {
            return res.status(500).json({ success: false, message: "Ошибка при удалении обложки" });
        }
        fs.unlink(path.join(__dirname, '../..', coverUrl), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Ошибка при удалении файла обложки" });
            }
            db.updateUserCover(userId, null, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: "Ошибка при обновлении информации о пользователе" });
                }
                res.json({ success: true, message: "Обложка удалена" });
            });
        });
    });
};

exports.getAccountsList = (req, res) => {
    db.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Ошибка при получении списка пользователей" });
        }
        res.json({ success: true, accounts: users });
    });
};
