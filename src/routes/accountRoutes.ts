import express from 'express';
import * as accountController from '../controllers/accountController';
import { authenticate } from '../middleware/authMiddleware';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', authenticate, accountController.getAccountInfo);
router.patch('/', authenticate, accountController.updateAccountInfo);
router.post('/avatar/upload', authenticate, upload.single('avatar'), accountController.uploadAvatar);
router.delete('/avatar/delete', authenticate, accountController.deleteAvatar);
router.post('/cover/upload', authenticate, upload.single('cover'), accountController.uploadCover);
router.delete('/cover/delete', authenticate, accountController.deleteCover);
router.get('/list', authenticate, accountController.getAccountsList);

export default router;