import express from 'express';
import { register, login, logout, profile } from '../controllers/Authentications/authCtrl.js';
import { authLogin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authLogin, profile);

export default router;