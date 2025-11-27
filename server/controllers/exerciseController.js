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

export const getExerciseById = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching exercise',
      error: error.message,
    });
  }
};

export const getRandomExercise = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching random exercise',
      error: error.message,
    });
  }
};

export const getExercisesByCategory = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching exercises by category',
      error: error.message,
    });
  }
};

export const getExercisesByDifficulty = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching exercises by difficulty',
      error: error.message,
    });
  }
};

export const createExercise = async (req, res) => {
  try {
    const { name, reps, difficulty, duration, category, instructions, tips, image, equipment } = req.body;

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

    const exercise = new Exercise({
      name,
      reps,
      difficulty,
      duration,
      category,
      instructions,
      tips,
      image,
      equipment,
    });

    await exercise.save();

    res.status(201).json({
      success: true,
      message: 'Exercise created successfully',
      data: exercise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating exercise',
      error: error.message,
    });
  }
};

export const updateExercise = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating exercise',
      error: error.message,
    });
  }
};

export const deleteExercise = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting exercise',
      error: error.message,
    });
  }
}