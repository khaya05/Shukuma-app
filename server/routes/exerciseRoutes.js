import express from 'express';
import {
  getAllExercises,
  getExerciseById,
  getRandomExercise,
  getExercisesByCategory,
  getExercisesByDifficulty,
  createExercise,
  updateExercise,
  deleteExercise,
} from '../controllers/exerciseController.js';

const router = express.Router();

router.get('/', getAllExercises);
router.get('/random', getRandomExercise);
router.get('/:id', getExerciseById);
router.get('/category/:category', getExercisesByCategory);
router.get('/difficulty/:difficulty', getExercisesByDifficulty);

// admin 
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

export default router;