import express from 'express';
import {
  logWorkout,
  getUserWorkoutHistory,
  getUserWorkoutStats,
  getWorkoutsByDateRange,
  getMostDoneExercises,
} from '../controllers/workoutController.js';

const router = express.Router();

router.post('/', logWorkout);
router.get('/history', getUserWorkoutHistory);
router.get('/stats', getUserWorkoutStats);
router.get('/date-range', getWorkoutsByDateRange);
router.get('/most-done', getMostDoneExercises);

export default router;