
import Exercise from '../models/exerciseModel.js';
import { asyncWrapper } from '../util/asyncWrapper.js';

export const getAllExercises = asyncWrapper(async (req, res) => {
  const exercises = await Exercise.find();
  res.status(200).json({
    success: true,
    count: exercises.length,
    data: exercises,
  });
});

export const getExerciseById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findById(id);

  if (!exercise) {
    return res.status(404).json({
      success: false,
      message: 'Exercise not found',
    });
  }

  res.status(200).json({
    success: true,
    data: exercise,
  });
});

export const getRandomExercise = asyncWrapper(async (req, res) => {
  const count = await Exercise.countDocuments();

  if (count === 0) {
    return res.status(404).json({
      success: false,
      message: 'No exercises available',
    });
  }

  const randomIndex = Math.floor(Math.random() * count);
  const exercise = await Exercise.findOne().skip(randomIndex);

  res.status(200).json(exercise);
});

export const getExercisesByCategory = asyncWrapper(async (req, res) => {
  const { category } = req.params;
  const exercises = await Exercise.find({ category });

  if (exercises.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No exercises found in category: ${category}`,
    });
  }

  res.status(200).json({
    success: true,
    count: exercises.length,
    data: exercises,
  });
});

export const getExercisesByDifficulty = asyncWrapper(async (req, res) => {
  const { difficulty } = req.params;
  const exercises = await Exercise.find({ difficulty });

  if (exercises.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No exercises found with difficulty: ${difficulty}`,
    });
  }

  res.status(200).json({
    success: true,
    count: exercises.length,
    data: exercises,
  });
});

export const createExercise = asyncWrapper(async (req, res) => {
  const { name, reps, difficulty, duration, category, instructions, tips, image, equipment, video } = req.body;

  if (!name || !reps || !duration || !category || !instructions) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  const existingExercise = await Exercise.findOne({ name });
  if (existingExercise) {
    return res.status(400).json({
      success: false,
      message: 'Exercise already exists',
    });
  }

  const exercise = await Exercise.create({
    name,
    reps,
    difficulty,
    duration,
    category,
    instructions,
    tips,
    image,
    equipment,
    video,
  });

  res.status(201).json({
    success: true,
    message: 'Exercise created successfully',
    data: exercise,
  });
});

export const updateExercise = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!exercise) {
    return res.status(404).json({
      success: false,
      message: 'Exercise not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Exercise updated successfully',
    data: exercise,
  });
});

export const deleteExercise = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findByIdAndDelete(id);

  if (!exercise) {
    return res.status(404).json({
      success: false,
      message: 'Exercise not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Exercise deleted successfully',
  });
});