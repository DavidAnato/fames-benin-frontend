// src/utils/auth.ts
import { apiRequest, apiFormDataRequest } from '../utils/api';
import useAuthStore from '../store/authStore';

interface LoginResponse {
  access: string;
  refresh: string;
}

export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string;
  profile_cover: string;
  bio: string;
  date_of_birth: string;
  city: string;
  country: string;
  gender: string;
  language_preference: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: Date;
  last_login: Date;
  google_id: string;
  picture_url: string;
  verified_email: boolean;
  otp_code: string;
  otp_generated_at: Date;
}

interface RegisterResponse {
  message: string;
}

interface EmailValidateResponse {
  message: string;
}

interface ActivateEmailResponse {
  message: string;
  success: boolean;
}

interface PasswordResetResponse {
  message: string;
}

interface PasswordResetConfirmResponse {
  message: string;
}

interface SetPasswordResponse {
  message: string;
}

interface ChangePasswordResponse {
  message: string;
}

interface GoogleLoginResponse {
  access: string;
  refresh: string;
}

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: 'authentication/login/',
      data: {
        email: email,
        password,
      },
    });
    const data = response.data as LoginResponse;
    const access = data.access;
    const refresh = data.refresh;
    useAuthStore.getState().setAccessToken(access);
    useAuthStore.getState().setRefreshToken(refresh);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const fetchUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: 'authentication/user-profile/',
    });
    const data = response.data as UserProfile;
    useAuthStore.getState().setUser(data);
    console.log(data)
    return data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

export const editUserProfile = async (payload: FormData | any): Promise<UserProfile | null> => {
  try {
    const response = await apiFormDataRequest({
      method: 'patch',
      url: 'authentication/user-profile/',
      data: payload,
    });
    const data = response.data as UserProfile;
    useAuthStore.getState().setUser(data);
    return data;
  } catch (error) {
    console.error('Failed to edit user profile:', error);
    return null;
  }
};




export const register = async (payload: any): Promise<string> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: 'authentication/register/',
      data: payload,
    });
    const data = response.data as RegisterResponse;
    return data.message || "Account created successfully without email.";
  } catch (error: any) {
    const errorMessage = error.response?.data?.email?.[0] || error.response?.data?.phone_number?.[0] || "Registration failed.";
    throw new Error(errorMessage);
  }
};

export const emailValidateRequest = async (email: string): Promise<string> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: 'authentication/email-validate/',
      data: { email },
    });
    const data = response.data as EmailValidateResponse;
    useAuthStore.getState().setEmail(email);
    return data.message;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
    throw new Error(errorMessage);
  }
};

export const activateEmail = async (email: string, otp: string): Promise<ActivateEmailResponse> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: 'authentication/activate-email/',
      data: { email, otp_code: otp },
    });
    const data = response.data as ActivateEmailResponse;
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
    throw new Error(errorMessage);
  }
};

export const passwordResetRequest = async (email: string): Promise<string> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: 'authentication/password-reset-request/',
      data: { email: email },
    });
    const data = response.data as PasswordResetResponse;
    return data.message;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || 'Failed to send OTP. Please try again.';
    throw new Error(errorMessage);
  }
};

export const passwordResetConfirm = async (otp: string, newPassword: string): Promise<string> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: 'authentication/password-reset-confirm/',
      data: { otp_code: otp, new_password: newPassword },
    });
    const data = response.data as PasswordResetConfirmResponse;
    return data.message;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || 'Failed to reset password. Please try again.';
    throw new Error(errorMessage);
  }
};

export const setPassword = async (password: string, confirmPassword: string): Promise<string> => {
  if (password !== confirmPassword) {
    throw new Error('Password and confirm password do not match.');
  }

  try {
    const response = await apiRequest({
      method: 'put',
      url: 'authentication/set-password/',
      data: { password },
    });
    const data = response.data as SetPasswordResponse;
    return data.message;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
    throw new Error(errorMessage);
  }
};

export const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string): Promise<string> => {
  if (newPassword !== confirmPassword) {
    throw new Error('New password and confirm password do not match.');
  }

  try {
    const response = await apiRequest({
      method: 'put',
      url: 'authentication/change-password/',
      data: { old_password: oldPassword, new_password: newPassword },
    });
    const data = response.data as ChangePasswordResponse;
    return data.message;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
    throw new Error(errorMessage);
  }
};

export const googleLoginRequest = () => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const redirectURI = process.env.redirectURI;
  const scope = "openid email profile";
  const responseType = "code";

  const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&prompt=consent&access_type=offline`;

  window.location.href = authURL;
};

export const googleLogin = async (code: string): Promise<{ success: boolean; data?: GoogleLoginResponse; error?: string }> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: 'authentication/google-login/',
      data: { code, redirect_uri: process.env.redirectURI },
    });
    const data = response.data as GoogleLoginResponse;
    const access = data.access;
    const refresh = data.refresh;
    useAuthStore.getState().setAccessToken(access);
    useAuthStore.getState().setRefreshToken(refresh);
    return { success: true, data };
  } catch (error: any) {
    console.error('Google login failed:', error);
    return { success: false, error: error.response?.data?.error || 'Failed to obtain access token.' };
  }
};
