import Workout from '../models/workoutModel.js';
import Exercise from '../models/exerciseModel.js'

export const logWorkout = async (req, res) => {
  try {
    const { exerciseId, duration, notes } = req.body;
    const userId = req.userId;

    if (!exerciseId) {
      return res.status(400).json({
        success: false,
        message: 'Exercise ID is required',
      });
    }

    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found',
      });
    }

    const workout = new Workout({
      userId,
      exerciseId,
      duration: duration || exercise.duration,
      notes,
      completed: true,
    });

    await workout.save();

    res.status(201).json({
      success: true,
      message: 'Workout logged successfully',
      data: workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging workout',
      error: error.message,
    });
  }
};

export const getUserWorkoutHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 10, skip = 0 } = req.query;

    const workouts = await Workout.find({ userId })
      .populate('exerciseId', 'name category difficulty')
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workout history',
      error: error.message,
    });
  }
};

export const getUserWorkoutStats = async (req, res) => {
  try {
    const userId = req.userId;

    const totalWorkouts = await Workout.countDocuments({ userId, completed: true });

    const workoutData = await Workout.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), completed: true } },
      { $group: { _id: null, totalDuration: { $sum: '$duration' } } },
    ]);

    const totalDuration = workoutData[0]?.totalDuration || 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let checkDate = new Date(today);

    for (let i = 0; i < 365; i++) {
      const workoutsOnDate = await Workout.countDocuments({
        userId,
        completed: true,
        createdAt: { $gte: checkDate, $lt: new Date(checkDate.getTime() + 24 * 60 * 60 * 1000) },
      });

      if (workoutsOnDate > 0) {
        streak++;
        checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
      } else {
        break;
      }
    }

    const uniqueExercises = await Workout.distinct('exerciseId', { userId, completed: true });

    res.status(200).json({
      success: true,
      data: {
        totalWorkouts,
        totalDuration: Math.floor(totalDuration / 60),
        currentStreak: streak,
        uniqueExercisesDone: uniqueExercises.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workout stats',
      error: error.message,
    });
  }
};

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
      .populate('exerciseId', 'name category')
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

export const getMostDoneExercises = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 5 } = req.query;

    const mostDone = await Workout.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), completed: true } },
      { $group: { _id: '$exerciseId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: parseInt(limit) },
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching most done exercises',
      error: error.message,
    });
  }
};