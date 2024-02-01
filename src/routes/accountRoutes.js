"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var accountController = __importStar(require("../controllers/accountController"));
var authMiddleware_1 = require("../middleware/authMiddleware");
var multer_1 = __importDefault(require("multer"));
var router = express_1.default.Router();
var upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get('/', authMiddleware_1.authenticate, accountController.getAccountInfo);
router.patch('/', authMiddleware_1.authenticate, accountController.updateAccountInfo);
router.post('/avatar/upload', authMiddleware_1.authenticate, upload.single('avatar'), accountController.uploadAvatar);
router.delete('/avatar/delete', authMiddleware_1.authenticate, accountController.deleteAvatar);
router.post('/cover/upload', authMiddleware_1.authenticate, upload.single('cover'), accountController.uploadCover);
router.delete('/cover/delete', authMiddleware_1.authenticate, accountController.deleteCover);
router.get('/list', authMiddleware_1.authenticate, accountController.getAccountsList);
exports.default = router;
