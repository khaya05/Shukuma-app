import Workout from '../models/workoutModel.js';
import Exercise from '../models/exerciseModel.js';
import mongoose from 'mongoose';
import { asyncWrapper } from '../util/asyncWrapper.js';

export const logWorkout = asyncWrapper(async (req, res) => {
  const { exerciseId, duration, notes } = req.body;
  const userId = req.userId; 

  console.log('DEBUG:', { userId, exerciseId, duration }); 

  if (!exerciseId) {
    return res.status(400).json({
      success: false,
      message: 'Exercise ID is required',
    });
  }

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated - no userId in request',
    });
  }

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    return res.status(404).json({
      success: false,
      message: 'Exercise not found',
    });
  }

  const workout = await Workout.create({
    userId,
    exerciseId,
    duration: duration || exercise.duration,
    notes,
    completed: true,
  });

  res.status(201).json({
    success: true,
    message: 'Workout logged successfully',
    data: workout,
  });
});

export const getUserWorkoutHistory = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  const { limit = 10, skip = 0 } = req.query;

  const workouts = await Workout.find({ userId })
    .populate('exerciseId', 'name category difficulty reps duration image video instructions tips')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(parseInt(skip));

  const total = await Workout.countDocuments({ userId });

  res.status(200).json({
    success: true,
    data: workouts,
    pagination: {
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
    },
  });
});

export const getUserWorkoutStats = asyncWrapper(async (req, res) => {
  const userId = req.userId;

  const totalWorkouts = await Workout.countDocuments({
    userId,
    completed: true
  });

  const workoutData = await Workout.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        completed: true
      }
    },
    {
      $group: {
        _id: null,
        totalDuration: { $sum: '$duration' }
      }
    },
  ]);

  const totalDuration = workoutData[0]?.totalDuration || 0;
  const totalMinutes = Math.floor(totalDuration / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let checkDate = new Date(today);

  for (let i = 0; i < 365; i++) {
    const startOfDay = new Date(checkDate);
    const endOfDay = new Date(checkDate.getTime() + 24 * 60 * 60 * 1000);

    const workoutsOnDate = await Workout.countDocuments({
      userId,
      completed: true,
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    if (workoutsOnDate > 0) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }

  const uniqueExercises = await Workout.distinct('exerciseId', {
    userId,
    completed: true
  });

  res.status(200).json({
    success: true,
    data: {
      totalWorkouts,
      totalDuration: `${hours}h ${minutes}m`,
      currentStreak: streak,
      uniqueExercisesDone: uniqueExercises.length,
    },
  });
});

export const getWorkoutsByDateRange = async (req, res) => {
  try {
    const userId = req.userId;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required',
      });
    }

    const workouts = await Workout.find({
      userId,
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate('exerciseId', 'name category difficulty reps duration image video instructions tips')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workouts by date range',
      error: error.message,
    });
  }
};

export const getMostDoneExercises = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  const { limit = 5 } = req.query;

  const mostDone = await Workout.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        completed: true
      }
    },
    {
      $group: {
        _id: '$exerciseId',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    },
    {
      $limit: parseInt(limit)
    },
    {
      $lookup: {
        from: 'exercises',
        localField: '_id',
        foreignField: '_id',
        as: 'exercise',
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: mostDone,
  });
});