"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var jwtUtils_1 = require("../utils/jwtUtils");
var authenticate = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ success: false, message: "Токен аутентификации не предоставлен" });
        return;
    }
    var decoded = (0, jwtUtils_1.verifyToken)(token);
    if (decoded) {
        req.user = decoded;
        next();
    }
    else {
        res.status(401).json({ success: false, message: "Неверный или истекший токен" });
    }
};
exports.authenticate = authenticate;
