import { useNavigate } from 'react-router-dom';
import customFetch from '../../util/customFetch';
import { toastService } from '../../util/toastUtil';

const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await customFetch('/auth/logout');
    localStorage.removeItem('token');
    toastService.success('Logged out!');
    navigate('/login');
  };

  return (
    <button
      to='/login'
      className='yellow-btn w-full px-4 text-black bg-yellow-400 hover:bg-yellow-500 text-center'
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
