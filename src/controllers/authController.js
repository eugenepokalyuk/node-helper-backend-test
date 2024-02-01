const db = require('../database/Database');
const { generateToken } = require('../utils/jwtUtils.js');

exports.register = (req, res) => {
    db.registerUser(req.body, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        res.status(201).json({ success: true, message: "Пользователь успешно зарегистрирован", userId: data.userId });
    });
};

exports.login = (req, res) => {
    db.loginUser(req.body, (err, data) => {
        if (err) {
            return res.status(401).json({ success: false, message: err.message });
        }
        const token = generateToken({ id: data.user.id, email: data.user.email });
        res.json({ success: true, message: "Вход успешен", token });
    });
};

exports.logout = (req, res) => {
    res.json({ success: true, message: "Вы успешно вышли из системы" });
};