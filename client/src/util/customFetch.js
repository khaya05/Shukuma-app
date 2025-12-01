import axios from 'axios';

const customFetch = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://shukuma-app-mn4p.onrender.com'
    : '/',
  withCredentials: true,
});


customFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default customFetch;