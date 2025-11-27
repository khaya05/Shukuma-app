import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  reps: {
    type: Number,
    required: true,
    description: 'Number of repetitions or duration indicator',
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate',
  },
  duration: {
    type: Number,
    required: true,
    description: 'Duration in seconds',
  },
  category: {
    type: String,
    enum: ['Cardio', 'Strength', 'Flexibility', 'Balance', 'Core'],
    required: true,
  },
  instructions: [
    {
      type: String,
      description: 'Step-by-step instructions',
    },
  ],
  tips: [
    {
      type: String,
      description: 'Helpful tips for performing the exercise',
    },
  ],
  image: {
    type: String,
    description: 'URL to exercise image or illustration',
  },
  equipment: [
    {
      type: String,
      default: 'None',
      description: 'Equipment needed (if any)',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Exercise', exerciseSchema);