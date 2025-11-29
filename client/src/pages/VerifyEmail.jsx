import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customFetch from '../util/customFetch';
import { toastService } from '../util/toastUtil';
import { Logo } from '../components';

export default function VerifyEmail() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(
    () => localStorage.getItem('pendingVerificationEmail') || ''
  );
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      toastService.error('Please enter email and verification code');
      return;
    }

    setLoading(true);

    try {
      await customFetch.post('/api/v1/auth/verify-email', {
        email,
        code,
      });

      localStorage.removeItem('pendingVerificationEmail');
      toastService.success('Email verified successfully!');
      navigate('/dashboard');
    } catch (error) {
      toastService.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          'Verification failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toastService.error('Please enter your email');
      return;
    }

    setResending(true);
    try {
      await customFetch.post('/api/v1/auth/resend-verification', { email });
      toastService.success('Verification code sent to your email');
    } catch (error) {
      toastService.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          'Failed to resend code'
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className='grid place-items-center h-[100vh] bg-gray-50'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
        <div className='text-center mb-6'>
          <div className='w-fit mx-auto'>
            <Logo />
          </div>
          <h2 className='text-2xl font-bold mt-4 mb-2'>Verify Your Email</h2>
          <p className='text-gray-600'>
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        <form onSubmit={handleVerify} className='space-y-4'>
          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your@email.com'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
              required
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Verification Code
            </label>
            <input
              type='text'
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              placeholder='000000'
              maxLength='6'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center text-2xl letter-spacing font-mono'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50'
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={resending}
          className='w-full mt-4 text-yellow-500 hover:text-yellow-600 font-semibold disabled:opacity-50'
        >
          {resending ? 'Sending...' : 'Resend Code'}
        </button>
      </div>
    </div>
  );
}
