import { FaClipboard } from 'react-icons/fa';
import { GrAchievement } from 'react-icons/gr';
import { TbTargetArrow } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { label: 'Total Workouts', value: '12' },
    { label: 'Day Streak', value: '5' },
    { label: 'Exercises Done', value: '45' },
    { label: 'Total Time', value: '3h 24m' },
  ];

  const actions = [
    {
      icon: <TbTargetArrow />,
      title: 'Start Workout',
      description: 'Pick a random exercise card and begin your session',
      featured: true,
      link: '/workout',
    },
    {
      icon: <FaClipboard />,
      title: 'Workout History',
      description: 'Track your completed exercises and progress',
      featured: false,
      link: '#',
    },
    {
      icon: <GrAchievement />,
      title: 'Achievements',
      description: 'View your streaks and accomplishments',
      featured: false,
      link: '#',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='flex-1 overflow-y-auto  px-8 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-white border-l-4 border-yellow-500 p-8 rounded-lg mb-8 shadow-sm'>
            <h1 className='text-4xl font-bold mb-2'>
              Ready to move? Let's{' '}
              <span className='text-yellow-500'>get fit</span> !
            </h1>
            <p className='text-gray-600 text-lg'>
              Stay consistent, stay motivated. Your next workout is waiting for
              you.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            {actions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`p-6 rounded-lg transition-all transform hover:-translate-y-1 ${
                  action.featured
                    ? 'bg-gradient-to-br from-black to-gray-900 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white border-2 border-gray-200 text-gray-900 shadow-sm hover:border-yellow-500 hover:shadow-md'
                }`}
              >
                <div
                  className={`text-4xl mb-4 ${
                    action.featured ? 'text-yellow-500' : ''
                  }`}
                >
                  {action.icon}
                </div>
                <h3 className='text-xl font-bold mb-2'>{action.title}</h3>
                <p
                  className={`text-sm mb-4 ${
                    action.featured ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {action.description}
                </p>
                <button
                  className={`px-4 py-2 rounded font-semibold transition-all ${
                    action.featured
                      ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                      : 'bg-yellow-500 text-black hover:bg-yellow-600'
                  }`}
                >
                  {action.featured ? 'Start Now' : 'View'}
                </button>
              </Link>
            ))}
          </div>

          <div className='bg-white rounded-lg p-8 shadow-sm'>
            <h2 className='text-2xl font-bold mb-6 pb-4 border-b-2 border-gray-200'>
              Your Progress
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className='bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg text-center border border-gray-200 hover:from-black hover:to-gray-900 hover:text-white hover:-translate-y-1 transition-all'
                >
                  <div className='text-4xl font-bold text-yellow-500 mb-2'>
                    {stat.value}
                  </div>
                  <div className='text-sm uppercase tracking-wider text-gray-600 hover:text-gray-300'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
