import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token on every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('creatix_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('creatix_token');
      localStorage.removeItem('creatix_admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
