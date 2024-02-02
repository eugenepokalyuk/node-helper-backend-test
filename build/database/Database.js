"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var path_1 = __importDefault(require("path"));
var sqlite3_1 = __importDefault(require("sqlite3"));
var Database = /** @class */ (function () {
    function Database() {
        var _this = this;
        this.dbPath = path_1.default.resolve(__dirname, 'helperApi.db');
        this.db = new sqlite3_1.default.Database(this.dbPath, sqlite3_1.default.OPEN_READWRITE | sqlite3_1.default.OPEN_CREATE, function (err) {
            if (err) {
                console.error('Ошибка при открытии базы данных', err.message);
            }
            else {
                console.log('Подключено к базе данных SQLite.');
                _this.initDb();
            }
        });
    }
    Database.prototype.initDb = function () {
        this.db.run("CREATE TABLE IF NOT EXISTS users (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            name TEXT NOT NULL,\n            email TEXT UNIQUE NOT NULL,\n            password TEXT NOT NULL,\n            avatarUrl TEXT,\n            description TEXT,\n            coverUrl TEXT\n        )");
    };
    Database.prototype.registerUser = function (user, callback) {
        var _this = this;
        var checkEmailQuery = "SELECT email FROM users WHERE email = ?";
        this.db.get(checkEmailQuery, [user.email], function (err, row) {
            if (err) {
                callback(err);
                return;
            }
            if (row) {
                callback(new Error("Пользователь с таким email уже существует"));
                return;
            }
            var hashedPassword = bcrypt_1.default.hashSync(user.password, 10);
            var insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            _this.db.run(insertQuery, [user.name, user.email, hashedPassword], function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, _this.lastID);
            });
        });
    };
    Database.prototype.loginUser = function (email, password, callback) {
        var query = "SELECT * FROM users WHERE email = ?";
        this.db.get(query, [email], function (err, user) {
            if (err) {
                callback(err);
            }
            else if (user && bcrypt_1.default.compareSync(password, user.password)) {
                callback(null, user);
            }
            else {
                callback(new Error("Неверные учетные данные"));
            }
        });
    };
    Database.prototype.getUserById = function (userId, callback) {
        var query = "SELECT * FROM users WHERE id = ?";
        this.db.get(query, [userId], function (err, user) {
            callback(err, user);
        });
    };
    Database.prototype.updateUser = function (userId, userDetails, callback) {
        var query = "UPDATE users SET name = ?, description = ? WHERE id = ?";
        this.db.run(query, [userDetails.name, userDetails.description, userId], function (err) {
            callback(err);
        });
    };
    Database.prototype.getAvatarUrlById = function (userId, callback) {
        var query = "SELECT avatarUrl FROM users WHERE id = ?";
        this.db.get(query, [userId], function (err, row) {
            callback(err, row ? row.avatarUrl : undefined);
        });
    };
    Database.prototype.updateUserAvatar = function (userId, avatarUrl, callback) {
        var query = "UPDATE users SET avatarUrl = ? WHERE id = ?";
        this.db.run(query, [avatarUrl, userId], function (err) {
            callback(err);
        });
    };
    Database.prototype.getCoverUrlById = function (userId, callback) {
        var query = "SELECT coverUrl FROM users WHERE id = ?";
        this.db.get(query, [userId], function (err, row) {
            callback(err, row ? row.coverUrl : undefined);
        });
    };
    Database.prototype.updateUserCover = function (userId, coverUrl, callback) {
        var query = "UPDATE users SET coverUrl = ? WHERE id = ?";
        this.db.run(query, [coverUrl, userId], function (err) {
            callback(err);
        });
    };
    Database.prototype.getAllUsers = function (callback) {
        var query = "SELECT email, name, avatarUrl, description FROM users";
        this.db.all(query, [], function (err, users) {
            callback(err, users);
        });
    };
    return Database;
}());
exports.default = new Database();
