const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

class Database {
    constructor() {
        this.dbPath = path.resolve(__dirname, 'helperApi.db');
        this.db = new sqlite3.Database(this.dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('Ошибка при открытии базы данных', err.message);
            } else {
                console.log('Подключено к базе данных SQLite.');
                this.initDb();
            }
        });
    }

    initDb() {
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

    registerUser({ name, email, password }, callback) {
        const checkEmailQuery = `SELECT email FROM users WHERE email = ?`;
        this.db.get(checkEmailQuery, [email], (err, row) => {
            if (err) {
                callback(err);
                return;
            }
            if (row) {
                callback(new Error("Пользователь с таким email уже существует"));
                return;
            }

            const hashedPassword = bcrypt.hashSync(password, 10);
            const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
            this.db.run(insertQuery, [name, email, hashedPassword], function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, { userId: this.lastID });
            });
        });
    }

    loginUser({ email, password }, callback) {
        const query = `SELECT * FROM users WHERE email = ?`;

        this.db.get(query, [email], (err, user) => {
            if (err) {
                callback(err);
            } else if (user && bcrypt.compareSync(password, user.password)) {
                callback(null, { user });
            } else {
                callback(new Error("Неверные учетные данные"));
            }
        });
    }

    getUserById(userId, callback) {
        const query = `SELECT * FROM users WHERE id = ?`;
        this.db.get(query, [userId], (err, row) => {
            callback(err, row);
        });
    }

    updateUser(userId, { name, description }, callback) {
        const query = `UPDATE users SET name = ?, description = ? WHERE id = ?`;
        this.db.run(query, [name, description, userId], (err) => {
            callback(err);
        });
    }

    updateUserAvatar(userId, avatarUrl, callback) {
        const query = `UPDATE users SET avatarUrl = ? WHERE id = ?`;
        this.db.run(query, [avatarUrl, userId], (err) => {
            callback(err);
        });
    }

    getAvatarUrlById(userId, callback) {
        const query = `SELECT avatarUrl FROM users WHERE id = ?`;
        this.db.get(query, [userId], (err, row) => {
            callback(err, row ? row.avatarUrl : null);
        });
    }

    updateUserCover(userId, coverUrl, callback) {
        const query = `UPDATE users SET coverUrl = ? WHERE id = ?`;
        this.db.run(query, [coverUrl, userId], (err) => {
            callback(err);
        });
    }

    getCoverUrlById(userId, callback) {
        const query = `SELECT coverUrl FROM users WHERE id = ?`;
        this.db.get(query, [userId], (err, row) => {
            callback(err, row ? row.coverUrl : null);
        });
    }

    getAllUsers(callback) {
        const query = `SELECT email, name, avatarUrl, description FROM users`;
        this.db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    }
}

module.exports = new Database();