import express from 'express';
import {
  getWorkouts,
  createWorkout,
  getWorkoutStats,
  getWorkoutCategories,
  getWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workout.controller.js';
import authenticateUser from '../middleware/auth.middleware.js'; // ✅ fixed here

const router = express.Router();

router.use(authenticateUser);

router.get('/', getWorkouts);
router.post('/', createWorkout);
router.get('/stats', getWorkoutStats);
router.get('/categories', getWorkoutCategories);
router.get('/:id', getWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
