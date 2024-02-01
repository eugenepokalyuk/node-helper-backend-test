import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcrypt';

type User = {
    id?: number;
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
    description?: string;
    coverUrl?: string;
};

type UserForList = {
    email: string;
    name: string;
    avatarUrl?: string;
    description?: string;
};

// Пока не заню пригодиться ли
type UserRegistrationData = {
    name: string;
    email: string;
    password: string;
};

class Database {
    private db: sqlite3.Database;
    private dbPath = path.resolve(__dirname, 'helperApi.db');

    constructor() {
        this.db = new sqlite3.Database(this.dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('Ошибка при открытии базы данных', err.message);
            } else {
                console.log('Подключено к базе данных SQLite.');
                this.initDb();
            }
        });
    }

    private initDb(): void {
        this.db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            avatarUrl TEXT,
            description TEXT,
            coverUrl TEXT
        )`);
    }

    public registerUser(user: User, callback: (err: Error | null, userId?: number) => void): void {
        const checkEmailQuery = `SELECT email FROM users WHERE email = ?`;
        this.db.get(checkEmailQuery, [user.email], (err, row) => {
            if (err) {
                callback(err);
                return;
            }
            if (row) {
                callback(new Error("Пользователь с таким email уже существует"));
                return;
            }

            const hashedPassword = bcrypt.hashSync(user.password, 10);
            const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

            this.db.run(insertQuery, [user.name, user.email, hashedPassword], function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, (this as any).lastID as number);
            });
        });
    }

    public loginUser(email: string, password: string, callback: (err: Error | null, user?: User) => void): void {
        const query = `SELECT * FROM users WHERE email = ?`;

        this.db.get(query, [email], (err, user: User) => {
            if (err) {
                callback(err);
            } else if (user && bcrypt.compareSync(password, user.password)) {
                callback(null, user);
            } else {
                callback(new Error("Неверные учетные данные"));
            }
        });
    }

    public getUserById(userId: number, callback: (err: Error | null, user?: User) => void): void {
        const query = `SELECT * FROM users WHERE id = ?`;
        this.db.get(query, [userId], (err, user: User) => {
            callback(err, user);
        });
    }

    public updateUser(userId: number, userDetails: { name: string; description: string }, callback: (err: Error | null) => void): void {
        const query = `UPDATE users SET name = ?, description = ? WHERE id = ?`;
        this.db.run(query, [userDetails.name, userDetails.description, userId], (err) => {
            callback(err);
        });
    }

    public getAvatarUrlById(userId: number, callback: (err: Error | null, avatarUrl?: string) => void): void {
        const query = `SELECT avatarUrl FROM users WHERE id = ?`;
        this.db.get(query, [userId], (err, row: { avatarUrl: string }) => {
            callback(err, row ? row.avatarUrl : undefined);
        });
    }

    public updateUserAvatar(userId: number, avatarUrl: string | null, callback: (err: Error | null) => void): void {
        const query = `UPDATE users SET avatarUrl = ? WHERE id = ?`;
        this.db.run(query, [avatarUrl, userId], (err) => {
            callback(err);
        });
    }

    public getCoverUrlById(userId: number, callback: (err: Error | null, coverUrl?: string) => void): void {
        const query = `SELECT coverUrl FROM users WHERE id = ?`;
        this.db.get(query, [userId], (err, row: { coverUrl: string }) => {
            callback(err, row ? row.coverUrl : undefined);
        });
    }

    public updateUserCover(userId: number, coverUrl: string | null, callback: (err: Error | null) => void): void {
        const query = `UPDATE users SET coverUrl = ? WHERE id = ?`;
        this.db.run(query, [coverUrl, userId], (err) => {
            callback(err);
        });
    }

    public getAllUsers(callback: (err: Error | null, users?: UserForList[]) => void): void {
        const query = `SELECT email, name, avatarUrl, description FROM users`;
        this.db.all(query, [], (err, users: UserForList[]) => {
            callback(err, users);
        });
    }
}

export default new Database();