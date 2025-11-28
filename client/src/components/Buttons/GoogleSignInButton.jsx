import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import customFetch from '../../util/customFetch';
import { toastService } from '../../util/toastUtil';

const GoogleSignInButton = ({ onSuccess, onError, action = 'login' }) => {
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await customFetch.post('/api/v1/auth/google', {
        googleId: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });

      localStorage.setItem('token', response.data.token);
      toastService.success(
        `${action === 'login' ? 'Logged in' : 'Signed up'} with Google`
      );
      onSuccess(response.data);
    } catch (error) {
      const message =
        error.response?.data?.message || `Google ${action} failed`;
      toastService.error(message);
      onError(error);
    }
  };

  const handleGoogleError = () => {
    toastService.error('Google authentication failed');
    onError(new Error('Google auth failed'));
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        text={action === 'login' ? 'signin_with' : 'signup_with'}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;
