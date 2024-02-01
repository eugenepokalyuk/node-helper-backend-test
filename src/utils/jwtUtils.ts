import jwt from 'jsonwebtoken';

type Payload = {
    id: number;
    email: string;
};

export const generateToken = (payload: Payload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
};

export const verifyToken = (token: string): Payload | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as Payload;
    } catch (err) {
        return null;
    }
};