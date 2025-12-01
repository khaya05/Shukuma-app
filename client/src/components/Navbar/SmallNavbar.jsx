import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useDashboardContext } from '../../pages/DashboardLayout';
import ProfileBtn from '../Buttons/ProfileBtn';
import Logo from '../Logo/Logo';

const SmallNavbar = () => {
  const { showModal, setShowModal, currentTab } = useDashboardContext();

  return (
    <nav className='w-full z-3 shadow-xl md:hidden border-b border-gray-300 flex items-center justify-between p-2 bg-white'>
      <div className=' flex items-center justify-between gap-2'>
        <Logo />
        <h3>{currentTab}</h3>
        <button
          type='button'
          className='hover:text-yellow-600 hover:cursor-pointer'
          onClick={() => setShowModal(!showModal)}
        >
          {showModal ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      <div className='hidden md:block'>
        <ProfileBtn />
      </div>
    </nav>
  );
};

export default SmallNavbar;
