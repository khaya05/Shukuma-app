import logo from '../../asserts/new-logo.PNG';

const Logo = () => {
  return (
    <div className='flex justify-between items-center w-fit gap-4 bg-white'>
      <div className='h-[4rem] w-[8rem] m-0 p-0 grid place-items-center overflow-hidden'>
        <img src={logo} alt='logo' className='object-contain w-full h-full' />
      </div>
    </div>
  );
};

export default Logo;
