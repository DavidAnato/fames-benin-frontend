// src/utils/api.ts
import axios from 'axios';
import useAuthStore from '../store/authStore';

const API_URL = process.env.API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json', accept: 'application/json' },
});

const apiFormData = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'multipart/form-data', accept: 'application/json' },
});

// Intercepteur pour ajouter le token dans les headers
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

// Fonction pour gérer les erreurs de réponse
const handleResponseError = async (error: any, navigate: any) => {
  if (error.response?.status === 401) {
    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      useAuthStore.getState().clearAuth();
      navigate('/login');
      throw error;
    }

    try {
      const refreshResponse = await api.post('authentication/token/refresh/', { refresh: refreshToken });
      const { access, refresh } = refreshResponse.data;
      useAuthStore.getState().setAccessToken(access);
      useAuthStore.getState().setRefreshToken(refresh);

      // Retry the original request avec le nouveau token
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

// Utilisation des intercepteurs pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // navigate doit être passé en paramètre
    return Promise.reject(error);
  }
);

apiFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    // navigate doit être passé en paramètre
    return Promise.reject(error);
  }
);

// Export des fonctions pour les appels API
export const apiRequest = (config: any) => api(config);
export const apiFormDataRequest = (config: any) => apiFormData(config);
export const handleResponseErrorWithNavigate = handleResponseError;
