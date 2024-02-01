const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'helper-secret-key';

const generateToken = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '24h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };