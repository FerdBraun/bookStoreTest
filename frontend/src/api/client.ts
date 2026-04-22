import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';


const apiClient = axios.create({
    // @ts-ignore
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default apiClient;