import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

// Attach token to every request
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;