import heroImg from '../asserts/undraw_morning-workout_73u9.svg';
import { CustomLink, Logo } from '../components';

const Landing = () => {
  return (
    <div className='w-full h-[calc(100vh-2rem)] flex flex-col gap-[10rem] max-w-5xl mx-auto p-6 lg:p-16'>
      <Logo />
      <header>
        <div className='md:flex md:items-center gap-4'>
          <div className='md:w-1/1'>
            <h1>
              Shukuma <span className='text-yellow-500'>Workout </span> Cards
            </h1>
            <p className='md:text-sm/loose'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              sequi ex minus sit dolorum nobis sunt consequuntur blanditiis.
              Voluptas esse aut ea veritatis tempora ullam error ex vel beatae
              nam!
            </p>
            <div className=' flex justify-between w-fit items-center gap-4 mt-4'>
              <CustomLink to='/register' label='register' />
              <CustomLink to='/login' label='login' />
            </div>
          </div>
          <div className='hidden md:block '>
            <img
              src={heroImg}
              alt='hero'
              className='object-cover transform'
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Landing;
