import express from "express";
import { createQuestion, getQuestion, getQuestions } from '../controllers/question.controller.js';

const router = express.Router();

router.post('/create', createQuestion);
router.get('/:id', getQuestion);
router.get('/', getQuestions);

export default router;