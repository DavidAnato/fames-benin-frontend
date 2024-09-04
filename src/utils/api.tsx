// src/utils/api.ts
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
});

const apiFormData = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'multipart/form-data', 'accept': 'application/json' },
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiFormData.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const handleResponseError = async (error: any) => {
  const navigate = useNavigate();
  if (error.response?.status === 401) {
    const { refreshToken } = useAuthStore.getState();
    try {
      const refreshResponse = await api.post('authentication/token/refresh/', { refresh: refreshToken });
      const { access, refresh } = refreshResponse.data;
      useAuthStore.getState().setAccessToken(access);
      useAuthStore.getState().setRefreshToken(refresh);

      // Retry the original request with the new token
      error.config.headers.Authorization = `Bearer ${access}`;
      return api.request(error.config);
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();
      navigate('/login');
      throw refreshError;
    }
  }
  throw error;
};

api.interceptors.response.use(
  (response) => response,
  (error) => handleResponseError(error)
);

apiFormData.interceptors.response.use(
  (response) => response,
  (error) => handleResponseError(error)
);

export const apiRequest = (config: any) => api(config);
export const apiFormDataRequest = (config: any) => apiFormData(config);