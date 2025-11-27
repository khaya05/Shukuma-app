import mongoose from 'mongoose';
import Exercise from './models/exerciseModel.js';
import dotenv from 'dotenv';

dotenv.config();

const exercises = [
  // ============ SIT UPS ============
  {
    name: 'Sit-ups',
    image: 'https://i.ibb.co/b5MZrVyW/1.jpg',
    reps: 20,
    difficulty: 'Beginner',
    duration: 45,
    category: 'Core',
    equipment: ['None'],
    instructions: [
      'Lie on your back with knees bent and feet flat',
      'Place hands behind your head lightly',
      'Engage your core and lift your shoulders off the ground',
      'Lower back down slowly with control',
      'Repeat for desired repetitions'
    ],
    tips: [
      'Do not pull on your neck',
      'Keep feet firmly on the ground',
      'Move slowly and controlled'
    ],
    video: 'https://example.com/situps.mp4'
  },

  // ============ V-UPS ============
  {
    name: 'V-Ups',
    image: 'https://i.ibb.co/JjDf04kr/12.jpg',
    reps: 15,
    difficulty: 'Advanced',
    duration: 60,
    category: 'Core',
    equipment: ['None'],
    instructions: [
      'Lie flat on your back with arms extended above your head',
      'In one explosive movement, bring your torso and legs up',
      'Try to touch your toes with your hands',
      'Lower back down with control',
      'Repeat explosively'
    ],
    tips: [
      'This is an advanced move - master sit-ups first',
      'Keep your core tight throughout',
      'Move explosively for better results'
    ],
    video: 'https://example.com/vups.mp4'
  },

  // ============ CRAB TOE TOUCHES ============
  {
    name: 'Crab Toe Touches',
    image: 'https://i.ibb.co/BVfTdzWm/13.jpg',
    reps: 20,
    difficulty: 'Intermediate',
    duration: 45,
    category: 'Core',
    equipment: ['None'],
    instructions: [
      'Sit on the ground with hands behind you supporting your weight',
      'Lift your hips off the ground',
      'Reach one hand forward to touch the opposite foot',
      'Return to starting position',
      'Alternate sides'
    ],
    tips: [
      'Keep your hips elevated',
      'Engage your core throughout',
      'Move with control'
    ],
    video: 'https://example.com/crabtoes.mp4'
  },

  // ============ PUSH-UP TO TOE TOUCH ============
  {
    name: 'Push-up to Toe Touch',
    image: 'https://i.ibb.co/vxRfNVqZ/2.jpg',
    reps: 12,
    difficulty: 'Advanced',
    duration: 60,
    category: 'Strength',
    equipment: ['None'],
    instructions: [
      'Start in a push-up position',
      'Do one push-up',
      'From the top position, rotate and touch your right foot with left hand',
      'Return to center and touch left foot with right hand',
      'Repeat'
    ],
    tips: [
      'Maintain plank form throughout',
      'Keep your core tight',
      'This combines cardio and strength'
    ],
    video: 'https://example.com/pushuptoetouchmp4'
  },

  // ============ SQUATS ============
  {
    name: 'Squats',
    image: 'https://i.ibb.co/1tz2MyLP/15.jpg',
    reps: 25,
    difficulty: 'Beginner',
    duration: 45,
    category: 'Strength',
    equipment: ['None'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body by bending knees and hips',
      'Keep chest up and weight in heels',
      'Go down until thighs are parallel to ground',
      'Push through heels to return'
    ],
    tips: [
      'Keep knees behind toes',
      'Maintain upright torso',
      'Do not let knees cave inward'
    ],
    video: 'https://example.com/squats.mp4'
  },

  // ============ JUMPING SPLIT LUNGE ============
  {
    name: 'Jumping Split Lunge',
    image: 'https://i.ibb.co/DP9Xhd7Z/25.jpg',
    reps: 16,
    difficulty: 'Advanced',
    duration: 60,
    category: 'Cardio',
    equipment: ['None'],
    instructions: [
      'Start in a lunge position',
      'Jump explosively in the air',
      'Switch legs mid-air',
      'Land in opposite lunge position',
      'Continue alternating'
    ],
    tips: [
      'Land softly to reduce joint impact',
      'Keep your torso upright',
      'Maintain a steady pace'
    ],
    video: 'https://example.com/jumpinglunge.mp4'
  },

  // ============ PRISON SQUATS ============
  {
    name: 'Prison Squats',
    image: 'https://i.ibb.co/ym6wYXRC/26.jpg',
    reps: 20,
    difficulty: 'Intermediate',
    duration: 45,
    category: 'Strength',
    equipment: ['None'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Place hands behind your head with elbows out',
      'Perform a regular squat',
      'Keep hands in position throughout',
      'Repeat for reps'
    ],
    tips: [
      'Do not let elbows flare out too much',
      'Keep chest upright',
      'This adds balance challenge to regular squats'
    ],
    video: 'https://example.com/prisonsquats.mp4'
  },

  // ============ CURTSY LUNGE ============
  {
    name: 'Curtsy Lunge',
    image: 'https://i.ibb.co/5x1crf7J/27.jpg',
    reps: 18,
    difficulty: 'Intermediate',
    duration: 50,
    category: 'Strength',
    equipment: ['None'],
    instructions: [
      'Stand with feet together',
      'Step diagonally back with one leg',
      'Lower your body into a lunge position',
      'Return to starting position',
      'Alternate legs'
    ],
    tips: [
      'This targets outer glutes',
      'Keep torso upright',
      'Move with control'
    ],
    video: 'https://example.com/curtsynlunge.mp4'
  },

  // ============ BURPEES ============
  {
    name: 'Burpees',
    image: 'https://i.ibb.co/bM3dtYr7/28.jpg',
    reps: 15,
    difficulty: 'Advanced',
    duration: 90,
    category: 'Cardio',
    equipment: ['None'],
    instructions: [
      'Stand upright with feet shoulder-width apart',
      'Squat down and place hands on the floor',
      'Jump feet back into plank position',
      'Do a push-up',
      'Jump feet forward and jump up with hands overhead',
      'Repeat'
    ],
    tips: [
      'This is a full-body workout',
      'Move explosively for better results',
      'Control your landing to avoid injury'
    ],
    video: 'https://example.com/burpees.mp4'
  },

  // ============ JUMPING JACKS ============
  {
    name: 'Jumping Jacks',
    image: 'https://i.ibb.co/k2FyLwJp/38.jpg',
    reps: 30,
    difficulty: 'Beginner',
    duration: 45,
    category: 'Cardio',
    equipment: ['None'],
    instructions: [
      'Stand with feet together and arms at sides',
      'Jump while spreading feet shoulder-width apart',
      'Simultaneously raise arms above head',
      'Jump back to starting position',
      'Repeat at steady pace'
    ],
    tips: [
      'Keep a steady rhythm',
      'Land softly on balls of feet',
      'Maintain good posture'
    ],
    video: 'https://example.com/jumpingjacks.mp4'
  },

  // ============ PUSH-UPS ============
  {
    name: 'Push-up',
    image: 'https://i.ibb.co/zhvgp4Dp/41.jpg',
    reps: 20,
    difficulty: 'Intermediate',
    duration: 60,
    category: 'Strength',
    equipment: ['None'],
    instructions: [
      'Get in plank position with hands shoulder-width apart',
      'Keep your body straight from head to heels',
      'Lower yourself by bending elbows',
      'Go down until chest is near ground',
      'Push back up to starting position',
      'Repeat for reps'
    ],
    tips: [
      'Keep core tight throughout',
      'Do not let hips sag',
      'Control the descent'
    ],
    video: 'https://example.com/pushups.mp4'
  },

  // ============ PIKE PUSH-UP ============
  {
    name: 'Pike Push-up',
    image: 'https://i.ibb.co/N2Y3Vj5w/52.jpg',
    reps: 12,
    difficulty: 'Advanced',
    duration: 60,
    category: 'Strength',
    equipment: ['None'],
    instructions: [
      'Start in downward dog position',
      'Lower the top of your head toward the ground',
      'Your elbows should point back',
      'Push back up',
      'This targets shoulders more than regular push-ups'
    ],
    tips: [
      'This is an advanced shoulder exercise',
      'Keep your core engaged',
      'Progress to this after mastering regular push-ups'
    ],
    video: 'https://example.com/pikepushup.mp4'
  }
];


const seedExercises = async () => {
  try {
    await mongoose.connect('mongodb+srv://khaya05:Qn0NbKa0TfM3J3fX@cluster0.jjunxd4.mongodb.net/SHUKUMA?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');

    await Exercise.deleteMany({});
    console.log('Cleared existing exercises');

    await Exercise.insertMany(exercises);
    console.log(`✅ Successfully seeded ${exercises.length} exercises`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding exercises:', error.message);
    process.exit(1);
  }
};

seedExercises();