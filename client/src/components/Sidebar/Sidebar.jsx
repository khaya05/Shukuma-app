import { Link, useLocation } from 'react-router-dom';

export const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className='fixed left-0 top-0 w-[280px] h-screen bg-black text-white overflow-y-auto z-100 shadow-lg'>
      {/* Logo */}
      <div className='px-6 py-8 border-b border-yellow-500 border-opacity-30'>
        <h1 className='text-2xl font-bold text-yellow-500 tracking-widest'>
          🃏 SHUKUMA
        </h1>
        <p className='text-xs text-gray-500 uppercase tracking-widest mt-1'>
          Fitness Cards
        </p>
      </div>

      {/* Main Navigation */}
      <nav className='py-6'>
        <Link
          to='/dashboard'
          className={`flex items-center gap-4 px-6 py-4 transition-all border-l-4 ${
            isActive('/dashboard')
              ? 'text-yellow-500 bg-yellow-500 bg-opacity-15 border-l-yellow-500 font-semibold'
              : 'text-gray-400 hover:text-white hover:bg-yellow-500 hover:bg-opacity-10 hover:border-l-yellow-500 border-l-transparent'
          }`}
        >
          <span className='text-xl'>🏠</span>
          <span>Dashboard</span>
        </Link>

        <Link
          to='/workout'
          className={`flex items-center gap-4 px-6 py-4 transition-all border-l-4 ${
            isActive('/workout')
              ? 'text-yellow-500 bg-yellow-500 bg-opacity-15 border-l-yellow-500 font-semibold'
              : 'text-gray-400 hover:text-white hover:bg-yellow-500 hover:bg-opacity-10 hover:border-l-yellow-500 border-l-transparent'
          }`}
        >
          <span className='text-xl'>🎯</span>
          <span>Start Workout</span>
        </Link>

        <Link
          to='#'
          className='flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white transition-all border-l-4 border-l-transparent hover:bg-yellow-500 hover:bg-opacity-10 hover:border-l-yellow-500'
        >
          <span className='text-xl'>📋</span>
          <span>History</span>
        </Link>

        <Link
          to='#'
          className='flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white transition-all border-l-4 border-l-transparent hover:bg-yellow-500 hover:bg-opacity-10 hover:border-l-yellow-500'
        >
          <span className='text-xl'>🏆</span>
          <span>Achievements</span>
        </Link>
      </nav>

      {/* Settings Section */}
      <div className='mt-8 pt-6 border-t border-yellow-500 border-opacity-20'>
        <p className='px-6 text-xs uppercase text-gray-600 tracking-widest font-semibold mb-4'>
          Settings
        </p>
        <Link
          to='#'
          className='flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white transition-all border-l-4 border-l-transparent hover:bg-yellow-500 hover:bg-opacity-10 hover:border-l-yellow-500'
        >
          <span className='text-xl'>⚙️</span>
          <span>Preferences</span>
        </Link>
        <Link
          to='#'
          className='flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white transition-all border-l-4 border-l-transparent hover:bg-yellow-500 hover:bg-opacity-10 hover:border-l-yellow-500'
        >
          <span className='text-xl'>❓</span>
          <span>Help</span>
        </Link>
      </div>

      {/* Footer */}
      <div className='absolute bottom-0 w-full p-6 border-t border-yellow-500 border-opacity-20 bg-gray-950'>
        <button
          onClick={onLogout}
          className='w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-600 transition-all transform hover:-translate-y-0.5'
        >
          Logout
        </button>
      </div>
    </aside>
  );
};
