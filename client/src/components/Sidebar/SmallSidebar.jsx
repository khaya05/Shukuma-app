import { LogoutBtn, SidebarPages } from '..';

const SmallSidebar = () => {
  return (
    <div className='md:hidden relative z-10 bg-white w-[20rem] mx-auto rounded-sm p-4'>
      <SidebarPages />
      <div className='mx-4'>
        <LogoutBtn />
      </div>
    </div>
  );
};

export default SmallSidebar;
