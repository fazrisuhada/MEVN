import express from 'express';
import { allQuestions, detailQuestion, storeQuestion, updateQuestion, destroyQuestion } from '../controllers/Questions/questionCtrl.js';
import { authLogin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/all', allQuestions);
router.get('/:id', detailQuestion);

router.post('/add', authLogin, storeQuestion);

router.put('/:id', authLogin, updateQuestion);

router.delete('/:id', authLogin, destroyQuestion);

export default router;