const express = require('express');
const multer = require('multer');
const { authenticate } = require('../middleware/authMiddleware');
const accountController = require('../controllers/accountController.js');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.get('/', authenticate, accountController.getAccountInfo);
router.patch('/', authenticate, accountController.updateAccountInfo);
router.post('/avatar/upload', authenticate, upload.single('avatar'), accountController.uploadAvatar);
router.delete('/avatar/delete', authenticate, accountController.deleteAvatar);
router.post('/cover/upload', authenticate, upload.single('cover'), accountController.uploadCover);
router.delete('/cover/delete', authenticate, accountController.deleteCover);
router.get('/list', authenticate, accountController.getAccountsList);

module.exports = router;