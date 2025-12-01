import { SidebarPages } from '..';
import { useDashboardContext } from '../../pages/DashboardLayout';
import { FaEyeSlash } from 'react-icons/fa';
import LogoutBtn from '../Buttons/LogoutBtn';

const BigSidebar = () => {
  const { setShowSidebar } = useDashboardContext();
  return (
    <aside className='hidden text-white bg-black w-[300px] absolute top-0 h-[100vh] border-r border-gray-200 md:fixed md:flex md:flex-col items-start justify-between'>
      <div className='w-full'>
        <div className='px-6 py-8 h-26 border-b border-yellow-300'>
          <h1 className='text-2xl font-bold text-yellow-500 tracking-widest'>
            SHUKUMA
          </h1>
        </div>
        <br />
        <br />
        <SidebarPages />
      </div>
      <div className='w-full md:flex md:flex-col items-center'>
        <LogoutBtn />
        <button
          type='button'
          className='flex items-center gap-2 text-center hover:cursor-pointer text-yellow-500 mt-4 p-2 px-4 rounded-sm hover:shadow'
          onClick={() => setShowSidebar(false)}
        >
          <FaEyeSlash /> <span className='capitalize'>hide sidebar</span>
        </button>
      </div>
    </aside>
  );
};

export default BigSidebar;
