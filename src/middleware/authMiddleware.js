const { verifyToken } = require('../utils/jwtUtils.js');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);
    if (decoded) {
        req.user = decoded;
        next();
    } else {
        res.status(401).json({ success: false, message: "Неверный или истекший токен" });
    }
};

module.exports = { authenticate };