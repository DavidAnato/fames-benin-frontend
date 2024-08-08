// src/utils/api.ts
import redaxios from 'redaxios';
import useAuthStore from '../store/authStore';

const API_URL = process.env.API_URL;

const api = redaxios.create({
  baseURL: API_URL,
});

// Définir un type pour les en-têtes de requête
interface RequestHeaders {
  [key: string]: string;
}

const addAuthHeaders = (): RequestHeaders => {
  const { accessToken } = useAuthStore.getState();
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

// Définir un type pour les méthodes HTTP
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const request = async (method: HttpMethod, url: string, data?: any) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: addAuthHeaders(),
    });
    return response;
  } catch (error) {
    if ((error as any).response?.status === 401) {
      const { refreshToken } = useAuthStore.getState();
      try {
        const refreshResponse = await api.post('authentication/token/refresh/', { refresh: refreshToken });
        const { access, refresh } = refreshResponse.data;
        useAuthStore.getState().setAccessToken(access);
        useAuthStore.getState().setRefreshToken(refresh);
        
        // Retry the original request with the new token
        const retryResponse = await api({
          method,
          url,
          data,
          headers: { ...addAuthHeaders(), Authorization: `Bearer ${access}` },
        });
        return retryResponse;
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        throw refreshError;
      }
    }
    throw error;
  }
};

export default {
  get: (url: string) => request('get', url),
  post: (url: string, data?: any) => request('post', url, data),
  put: (url: string, data?: any) => request('put', url, data),
  delete: (url: string) => request('delete', url),
};
