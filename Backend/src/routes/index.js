import express from 'express';
import authRoutes from './auth.routes.js';
import bmiRoutes from './bmi.routes.js';
import feedRoutes from './feed.routes.js';
import handbookRoutes from './handbook.routes.js';
import messageRoutes from './message.routes.js';
import userRoutes from './user.routes.js';
import workoutRoutes from './workout.routes.js';

const router = express.Router();

// Mount routes
router.use('/api/auth', authRoutes);
router.use('/api/workouts', workoutRoutes);
router.use('/api/users', userRoutes);
router.use('/api/feed', feedRoutes);
router.use('/api/messages', messageRoutes);
router.use('/api/bmi', bmiRoutes);
router.use('/api/handbook', handbookRoutes);

export default router;
