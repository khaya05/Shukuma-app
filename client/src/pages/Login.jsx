/* eslint-disable no-unused-vars */
import { Logo, FormInputElement, GoogleSignInButton } from '../components';
import customFetch from '../util/customFetch';
import { redirect, Form, Link, useNavigate } from 'react-router-dom';
import { toastService } from '../util/toastUtil';
import { useState } from 'react';

export const LoginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/api/v1/auth/login', data);
    localStorage.setItem('token', response?.data?.token);

    toastService.success('Logged in successfully');
    return redirect('/dashboard');
  } catch (error) {
    if (error?.response?.status === 403) {
      localStorage.setItem(
        'pendingVerificationEmail',
        error?.response?.data?.email
      );
      toastService.error(error?.response?.data?.message);
      return redirect('/verify-email');
    }

    toastService.error(error?.response?.data?.msg || 'Login failed.');
    return { error: error?.response?.data?.msg };
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSuccess = (data) => {
    navigate('/dashboard');
  };

  const handleGoogleError = (error) => {
    console.error('Google auth error:', error);
  };

  const handleFormSubmit = async (e) => {
    setIsSubmitting(true);
  };

  return (
    <div className='center-form'>
      <div className='form-wrapper'>
        <Logo />
        <h2>Login</h2>
        <Form
          method='post'
          className='w-full space-y-4'
          onSubmit={handleFormSubmit}
        >
          <FormInputElement
            name='email'
            placeholder='e.g tommy@email.com'
            defaultValue='tommy@email.com'
          />
          <FormInputElement
            name='password'
            type='password'
            placeholder='password here'
            defaultValue='pass1234'
          />
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 rounded-lg transition-all disabled:opacity-50'
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </Form>

        <div className='flex items-center gap-3 my-6'>
          <div className='flex-1 h-px bg-gray-300'></div>
          <span className='text-gray-500 text-sm font-medium'>or</span>
          <div className='flex-1 h-px bg-gray-300'></div>
        </div>

        <div className='mb-6 flex justify-center'>
          <GoogleSignInButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            action='login'
          />
        </div>

        <div className='text-center mb-6'>
          <a
            href='#'
            className='text-yellow-500 hover:text-yellow-600 font-semibold text-sm'
          >
            Forgot password?
          </a>
        </div>

        <p className='text-sm'>
          Not a member yet?{' '}
          <Link
            to='/register'
            className='text-yellow-500 hover:text-yellow-600'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
