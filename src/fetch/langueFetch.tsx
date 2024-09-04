import { apiRequest } from '../utils/api';

export const updateUserLanguage = async (language_preference: string) => {
  try {
    const response = await apiRequest({
      method: 'patch',
      url: 'authentication/user-profile/',
      data: { language_preference }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update language preference:', error);
    throw error;
  }
};