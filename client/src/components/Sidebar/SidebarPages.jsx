import { Link } from 'react-router-dom';
import { useDashboardContext } from '../../pages/DashboardLayout';
import { FaClipboard, FaHome } from 'react-icons/fa';
import { TbTargetArrow } from 'react-icons/tb';
import { GrAchievement } from 'react-icons/gr';
import { FaGear } from 'react-icons/fa6';
import { CiCircleQuestion } from 'react-icons/ci';

const topSidebarPages = [
  {
    page: 'Dashboard',
    icon: <FaHome />,
    path: '/dashboard',
  },
  {
    page: 'Workouts',
    icon: <TbTargetArrow />,
    path: 'workouts',
  },
  {
    page: 'History',
    icon: <FaClipboard />,
    path: '#',
  },
  {
    page: 'Achievements',
    icon: <GrAchievement />,
    path: '#',
  },
];

const bottomSidebarPages = [
  {
    page: 'Preferences',
    icon: <FaGear />,
    path: '#',
  },
  {
    page: 'Help',
    icon: <CiCircleQuestion />,
    path: '#',
  },
];

const SmallSidebar = () => {
  const { setCurrentTab, setShowModal, currentTab } = useDashboardContext();

  const handlePageClick = (e) => {
    const page = e.currentTarget.getAttribute('data-page');
    setCurrentTab(page);
    setShowModal(false);
  };

  return (
    <>
      <div className='rounded-sm py-4 '>
        {topSidebarPages.map(({ path, icon, page }) => {
          return (
            <Link
              to={path}
              key={page}
              onClick={handlePageClick}
              data-page={page}
            >
              <div
                className={`flex justify-start items-center gap-4 h-10 px-4 text-gray-500 font-semibold  hover:text-yellow-300 hover:text-yellow-60 ${
                  currentTab === page &&
                  'bg-yellow-500 font-semibold hover:text-gray-500'
                }`}
              >
                {icon}
                <p>{page}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className='rounded-sm py-4 mt-8 pt-6 border-t border-yellow-300'>
        <p className='px-6 text-xs uppercase text-gray-600 tracking-widest font-semibold mb-4'>
          Settings
        </p>
        {bottomSidebarPages.map(({ path, icon, page }) => {
          return (
            <Link
              to={path}
              key={page}
              onClick={handlePageClick}
              data-page={page}
            >
              <div
                className={`flex justify-start items-center gap-4 h-10 px-4 text-gray-500 font-semibold  hover:text-yellow-300 hover:text-yellow-60 ${
                  currentTab === page &&
                  'bg-yellow-500 font-semibold hover:text-gray-500'
                }`}
              >
                {icon}
                <p>{page}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SmallSidebar;
