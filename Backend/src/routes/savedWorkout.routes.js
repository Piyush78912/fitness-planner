import express from 'express';
import {
    deleteSavedWorkout,
    getSavedWorkouts,
    saveWorkout
} from '../controllers/savedWorkout.controller.js';
import authenticateUser from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticateUser);

router.route('/')
  .get(getSavedWorkouts)
  .post(saveWorkout);

router.delete('/:id', deleteSavedWorkout);

export default router; 