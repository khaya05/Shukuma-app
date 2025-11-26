import logo from '../../asserts/new-logo.PNG';

const Logo = () => {
  return (
    <div className='flex justify-between items-center w-fit gap-4'>
      <div className='h-[7rem] m-0 p-0 grid place-items-start'>
        <img
          src={logo}
          alt='logo'
          className='object-fill m-0 p-0 w-[80%] h-auto'
        />
      </div>
    </div>
  );
};

export default Logo;
