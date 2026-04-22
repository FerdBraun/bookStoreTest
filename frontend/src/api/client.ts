import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';


const apiClient = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: true, // важно для cookie (us)
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Response interceptor:
 * - handles auth errors globally
 * - logs out user if session expired
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // session expired or invalid
    if (status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default apiClient;