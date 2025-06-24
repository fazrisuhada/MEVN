import express from 'express';
import { allQuestions, detailQuestion, storeQuestion, updateQuestion, destroyQuestion } from '../controllers/Questions/questionCtrl.js';

const router = express.Router();

router.get('/all', allQuestions);
router.get('/:id', detailQuestion);

router.post('/add', storeQuestion);

router.put('/:id', updateQuestion);

router.delete('/:id', destroyQuestion);

export default router;