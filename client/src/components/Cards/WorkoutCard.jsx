import { useState } from 'react';

const WorkoutCard = ({ exercise, onComplete, onSkip, loading }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (loading) {
    return (
      <div className='w-full max-w-sm aspect-[3/4] bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-white gap-4 shadow-2xl'>
        <div className='animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full'></div>
        <p className='text-lg'>Loading your next exercise...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className='w-full max-w-sm aspect-[3/4] bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-white gap-4 shadow-2xl'>
        <p className='text-lg'>No exercise available</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-sm aspect-[9/16] rounded-2xl'>
      <div className='exercise-card' onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className='card-face card-front w-full h-full flex flex-col items-center justify-center text-white p-8 bg-black'>
            <div className='text-6xl font-bold text-yellow-500 mb-4'>
              {exercise.reps}
            </div>
            <h2 className='text-3xl font-bold text-center mb-6 capitalize'>
              {exercise.name}
            </h2>
            <p className='text-sm text-gray-400 italic'>
              Click to see exercise
            </p>
          </div>

          <div className='card-face card-back w-full h-full flex flex-col items-start justify-start text-white p-6 overflow-y-auto bg-gray-950'>
            {exercise.image && (
              <div className='w-full mb-4 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center h-40'>
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className='w-full h-full object-contain'
                />
              </div>
            )}

            <h2 className='text-xl font-bold text-yellow-500 mb-3 capitalize'>
              {exercise.name}
            </h2>

            <div className='flex flex-wrap gap-2 mb-4'>
              <span className='bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full'>
                {exercise.reps} reps
              </span>
              <span className='bg-yellow-500 text-black text-xs font-bold px-2.5 py-1 rounded-full'>
                {exercise.difficulty || 'Medium'}
              </span>
              <span className='bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full'>
                {exercise.duration}s
              </span>
              <span className='bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full capitalize'>
                {exercise.category}
              </span>
            </div>

            <div className='mb-3'>
              <h4 className='font-bold text-yellow-500 mb-2 text-sm'>Steps:</h4>
              {exercise.instructions && exercise.instructions.length > 0 ? (
                <ol className='list-decimal list-inside space-y-1 text-xs text-gray-300'>
                  {exercise.instructions
                    .slice(0, 3)
                    .map((instruction, index) => (
                      <li key={index} className='truncate'>
                        {instruction}
                      </li>
                    ))}
                  {exercise.instructions.length > 3 && (
                    <li className='text-gray-500 italic'>
                      +{exercise.instructions.length - 3} more steps
                    </li>
                  )}
                </ol>
              ) : (
                <p className='text-xs text-gray-400'>
                  No instructions available
                </p>
              )}
            </div>

            {exercise.tips && exercise.tips.length > 0 && (
              <div className='mb-3'>
                <h4 className='font-bold text-yellow-500 mb-1 text-sm'>
                  💡 Tips:
                </h4>
                <ul className='space-y-0.5 text-xs text-gray-300'>
                  {exercise.tips.slice(0, 2).map((tip, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <span className='text-yellow-500 mt-0.5'>•</span>
                      <span className='truncate'>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className='text-xs text-gray-500 italic mt-2'>
              Click card to close
            </p>
          </div>
        </div>

        <div className='flex gap-4 mt-6 w-full'>
          <button
            onClick={onSkip}
            className='flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:-translate-y-0.5'
          >
            Skip
          </button>
          <button className='  bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2'>
            Watch Demo
          </button>
          <button
            onClick={onComplete}
            className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all transform hover:-translate-y-0.5'
          >
            ✓ Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
