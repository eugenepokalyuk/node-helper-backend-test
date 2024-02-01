"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateToken = function (payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
};
exports.generateToken = generateToken;
var verifyToken = function (token) {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    }
    catch (err) {
        return null;
    }
};
exports.verifyToken = verifyToken;
