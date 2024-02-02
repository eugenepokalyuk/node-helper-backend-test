import express from 'express';
import multer from 'multer';
import * as accountController from '../controllers/accountController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', authenticate, accountController.getAccountInfo);
router.patch('/', authenticate, accountController.updateAccountInfo);
router.post('/avatar', authenticate, upload.single('avatar'), accountController.uploadAvatar);
router.delete('/avatar', authenticate, accountController.deleteAvatar);
router.post('/cover', authenticate, upload.single('cover'), accountController.uploadCover);
router.delete('/cover', authenticate, accountController.deleteCover);
router.get('/list', authenticate, accountController.getAccountsList);

export default router;