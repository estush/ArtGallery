import express from 'express';
import { chatWithOpenAI, } from '../controllers/openAi.controller.js'; // ייבוא של פונקציות מתוך ה-controller

const router = express.Router();

// הגדרת ניתוב לשליחת שאלה ל-OpenAI
router.post('/chat', chatWithOpenAI);

export default router;
