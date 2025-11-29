import { CgProfile } from 'react-icons/cg';
import { useDashboardContext } from '../../pages/DashboardLayout';

const ProfileBtn = () => {
  const { user } = useDashboardContext();
  const { name } = user;
  return (
    <div className='flex items-center justify-between gap-1 bg-yellow-500 p-2 rounded-sm text-black'>
      <div className='capitalize'>{`${name}`}</div>
      <CgProfile className='text-[1.5rem]' />
    </div>
  );
};

export default ProfileBtn;
