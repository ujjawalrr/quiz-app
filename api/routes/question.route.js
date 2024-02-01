import express from "express";
import { createQuestion, getQuestion, getQuestions, evaluateQuestion } from '../controllers/question.controller.js';

const router = express.Router();

router.post('/create', createQuestion);
router.post('/evaluate', evaluateQuestion);
router.get('/:id', getQuestion);
router.get('/', getQuestions);

export default router;