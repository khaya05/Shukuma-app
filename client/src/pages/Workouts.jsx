import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import customFetch from '../util/customFetch';
import { toastService } from '../util/toastUtil';
import { WorkoutCard } from '../components';
import { useDashboardContext } from './DashboardLayout';

export default function Workouts() {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(0);
  const navigate = useNavigate();
  const { user } = useDashboardContext();
  console.log(user);

  useEffect(() => {
    fetchRandomExercise();
  }, []);

  const fetchRandomExercise = async () => {
    setLoading(true);
    try {
      const response = await customFetch.get('/exercises/random');
      setExercise(response.data);
    } catch (error) {
      toastService.error('Failed to load exercise');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    fetchRandomExercise();
  };

  const handleComplete = async () => {
    try {
      await customFetch.post('/workouts', {
        userId: user._id,
        exerciseId: exercise._id,
        duration: exercise.duration,
        completed: true,
      });
      toastService.success('Workout logged! Great job!');
      setCompleted(completed + 1);
      fetchRandomExercise();
    } catch (_) {
      toastService.error('Failed to log workout');
    }
  };

  const handleBack = () => {
    if (completed > 0) {
      toastService.success(`Completed ${completed} exercises!`);
    }
    navigate('/dashboard');
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <main className='flex-1 overflow-y-auto px-8 flex flex-col items-center justify-start pt-6'>
        <div className='w-full max-w-2xl mb-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 flex justify-between items-center '>
          <button
            onClick={handleBack}
            className='hover:cursor-pointer hover:text-yellow-500 text-white bg-black font-semibold px-4 py-2 rounded-lg transition-all'
          >
            ← Back
          </button>
          <h2 className='text-2xl font-bold'>Let's Get Moving!</h2>
          <div className='bg-yellow-500 text-black font-bold px-6 py-2 rounded-full'>
            Completed: <span className='text-xl'>{completed}</span>
          </div>
        </div>
        <div className='w-full h-full grid place-items-center mb-8'>
          <WorkoutCard
            exercise={exercise}
            onComplete={handleComplete}
            onSkip={handleSkip}
            loading={loading}
          />
        </div>

        <div className='m-4 text-center  text-lg font-semibold'>
          Keep pushing! You're doing great!
        </div>
      </main>
    </div>
  );
}
