import { useNavigate, Form, redirect } from 'react-router-dom';
import { Logo, FormInputElement } from '../components';
import { GoogleSignInButton } from '../components';
import customFetch from '../util/customFetch';
import { toastService } from '../util/toastUtil';

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { password, passwordConfirm } = data;

  if (password !== passwordConfirm) {
    toastService.error("Passwords don't match");
    return null;
  }

  try {
    const response = await customFetch.post('/api/v1/auth/register', data);
    localStorage.setItem('token', response.data.token);
    toastService.success(
      'Registration successful! Check your email for verification code.'
    );
    return redirect('/verify-email');
  } catch (error) {
    toastService.error(
      error?.response?.data?.message || 'Registration failed.'
    );
    return null;
  }
};

const Register = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (data) => {
    navigate('/dashboard');
  };

  const handleGoogleError = (error) => {
    console.error('Google auth error:', error);
  };

  return (
    <div className='grid place-items-center h-[100vh]'>
      <div className='form-wrapper'>
        <Logo />
        <h2>Sign Up</h2>

        <Form method='post' className='w-full'>
          <FormInputElement name='name' placeholder='e.g John Doe' required />
          <FormInputElement
            name='email'
            placeholder='e.g john@email.com'
            required
          />
          <FormInputElement
            name='password'
            type='password'
            placeholder='password'
            required
          />
          <FormInputElement
            name='passwordConfirm'
            label='confirm password'
            type='password'
            placeholder='confirm password'
            required
          />
          <button type='submit' className='yellow-btn w-full'>
            Sign Up
          </button>
        </Form>

        <div className='my-4 flex items-center gap-2'>
          <div className='flex-1 h-px bg-gray-300'></div>
          <span className='text-gray-600 text-sm'>or</span>
          <div className='flex-1 h-px bg-gray-300'></div>
        </div>

        <div className='flex justify-center'>
          <GoogleSignInButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            action='signup'
          />
        </div>

        <p className='text-sm mt-4'>
          Already have an account?{' '}
          <a href='/login' className='text-yellow-500 hover:text-yellow-600'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
