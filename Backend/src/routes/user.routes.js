import express from 'express';
import {
    calculateBMI,
    getProfile,
    loginUser,
    updateProfile
} from '../controllers/userController.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginUser);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/calculate-bmi', auth, calculateBMI);

export default router;