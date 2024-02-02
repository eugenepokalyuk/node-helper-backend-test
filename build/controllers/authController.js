"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
var Database_1 = __importDefault(require("../database/Database"));
var jwtUtils_1 = require("../utils/jwtUtils");
var register = function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    Database_1.default.registerUser({ name: name, email: email, password: password }, function (err, userId) {
        if (err || !userId) {
            res.status(400).json({ success: false, message: (err === null || err === void 0 ? void 0 : err.message) || "Ошибка регистрации" });
        }
        else {
            var token = (0, jwtUtils_1.generateToken)({ id: userId, email: email });
            res.json({ success: true, message: "Пользователь успешно зарегистрирован", userId: userId });
        }
    });
};
exports.register = register;
var login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    Database_1.default.loginUser(email, password, function (err, user) {
        if (err || !user || typeof user.id !== 'number') {
            res.status(401).json({ success: false, message: "Неверные учетные данные" });
        }
        else {
            var token = (0, jwtUtils_1.generateToken)({ id: user.id, email: user.email });
            res.json({ success: true, message: "Вход успешен", token: token });
        }
    });
};
exports.login = login;
var logout = function (req, res) {
    res.json({ success: true, message: "Вы успешно вышли из системы" });
};
exports.logout = logout;
