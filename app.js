"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
var accountRoutes_1 = __importDefault(require("./src/routes/accountRoutes"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/account', accountRoutes_1.default);
app.get('/', function (req, res) { return res.send('Hello, Helper API!'); });
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
