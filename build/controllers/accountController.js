"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountsList = exports.deleteCover = exports.uploadCover = exports.deleteAvatar = exports.uploadAvatar = exports.updateAccountInfo = exports.getAccountInfo = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Database_1 = __importDefault(require("../database/Database"));
var getAccountInfo = function (req, res) {
    var _a;
    var userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return;
    }
    Database_1.default.getUserById(userId, function (err, user) {
        if (err || !user) {
            res.status(404).json({ success: false, message: "Пользователь не найден" });
        }
        else {
            res.json({ success: true, account: user });
        }
    });
};
exports.getAccountInfo = getAccountInfo;
var updateAccountInfo = function (req, res) {
    var _a;
    var userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    var _b = req.body, name = _b.name, description = _b.description;
    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return;
    }
    Database_1.default.updateUser(userId, { name: name, description: description }, function (err) {
        if (err) {
            res.status(500).json({ success: false, message: "Ошибка при обновлении информации аккаунта" });
        }
        else {
            res.json({ success: true, message: "Информация аккаунта обновлена" });
        }
    });
};
exports.updateAccountInfo = updateAccountInfo;
var uploadAvatar = function (req, res) {
    var _a;
    if (!req.file) {
        res.status(400).send('Нет файла для загрузки.');
        return;
    }
    var userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    var avatarUrl = "/uploads/".concat(req.file.filename);
    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return;
    }
    Database_1.default.updateUserAvatar(userId, avatarUrl, function (err) {
        if (err) {
            res.status(500).json({ success: false, message: "Ошибка при обновлении аватара" });
        }
        else {
            res.json({ success: true, message: "Аватар обновлен", avatarUrl: avatarUrl });
        }
    });
};
exports.uploadAvatar = uploadAvatar;
var deleteAvatar = function (req, res) {
    var _a;
    var userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return;
    }
    Database_1.default.getAvatarUrlById(userId, function (err, avatarUrl) {
        if (err || !avatarUrl) {
            res.status(500).json({ success: false, message: "Ошибка при удалении аватара" });
            return;
        }
        fs_1.default.unlink(path_1.default.join(__dirname, '../..', avatarUrl), function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: "Ошибка при удалении файла аватара" });
                return;
            }
            Database_1.default.updateUserAvatar(userId, null, function (err) {
                if (err) {
                    res.status(500).json({ success: false, message: "Ошибка при обновлении информации о пользователе" });
                }
                else {
                    res.json({ success: true, message: "Аватар удален" });
                }
            });
        });
    });
};
exports.deleteAvatar = deleteAvatar;
var uploadCover = function (req, res) {
    var _a;
    if (!req.file) {
        res.status(400).send('Нет файла для загрузки.');
        return;
    }
    var userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    var coverUrl = "/uploads/".concat(req.file.filename);
    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return;
    }
    Database_1.default.updateUserCover(userId, coverUrl, function (err) {
        if (err) {
            res.status(500).json({ success: false, message: "Ошибка при обновлении обложки" });
        }
        else {
            res.json({ success: true, message: "Обложка обновлена", coverUrl: coverUrl });
        }
    });
};
exports.uploadCover = uploadCover;
var deleteCover = function (req, res) {
    var _a;
    var userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (userId === undefined) {
        res.status(400).json({ success: false, message: "Идентификатор пользователя отсутствует" });
        return;
    }
    Database_1.default.getCoverUrlById(userId, function (err, coverUrl) {
        if (err || !coverUrl) {
            res.status(500).json({ success: false, message: "Ошибка при удалении обложки" });
            return;
        }
        fs_1.default.unlink(path_1.default.join(__dirname, '../..', coverUrl), function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: "Ошибка при удалении файла обложки" });
                return;
            }
            Database_1.default.updateUserCover(userId, null, function (err) {
                if (err) {
                    res.status(500).json({ success: false, message: "Ошибка при обновлении информации о пользователе" });
                }
                else {
                    res.json({ success: true, message: "Обложка удалена" });
                }
            });
        });
    });
};
exports.deleteCover = deleteCover;
var getAccountsList = function (req, res) {
    Database_1.default.getAllUsers(function (err, users) {
        if (err) {
            res.status(500).json({ success: false, message: "Ошибка при получении списка пользователей" });
        }
        else {
            res.json({ success: true, accounts: users });
        }
    });
};
exports.getAccountsList = getAccountsList;
