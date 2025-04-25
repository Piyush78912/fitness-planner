import express from 'express';
import { getBMIHistory, saveBMI } from '../controllers/bmi.controller.js';
import authenticateUser from '../middleware/auth.middleware.js'; // Optional: to check if user is logged in

const router = express.Router();

router.post('/save', authenticateUser, saveBMI);
router.get('/history', authenticateUser, getBMIHistory);

export default router;
