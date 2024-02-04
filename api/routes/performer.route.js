import express from "express";
import { createPerformer, getPerformers, giveFeedback } from '../controllers/performer.controller.js';

const router = express.Router();

router.post('/', createPerformer);
router.get('/', getPerformers);
router.post('/feedback/:id', giveFeedback);

export default router;