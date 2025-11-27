import { FaEye } from 'react-icons/fa';
import { useDashboardContext } from '../../pages/DashboardLayout';

const BigSidebarBtn = () => {
  const { setShowSidebar } = useDashboardContext();
  return (
    <button
      type='button'
      onClick={() => setShowSidebar(true)}
      className='hidden md:block md:absolute bottom-4 bg-yellow-500 text-white p-2 rounded-r-full hover:bg-yellow-400 hover:cursor-pointer'
    >
      <FaEye />
    </button>
  );
};

export default BigSidebarBtn;
