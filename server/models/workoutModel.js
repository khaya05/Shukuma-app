import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  },
  duration: {
    type: Number,
    description: 'Duration in seconds',
  },
  completed: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
    description: 'User notes about the workout',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Workout', workoutSchema);
