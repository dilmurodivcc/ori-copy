import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

});
API.interceptors.request.use((config) => {
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});
export default API;

