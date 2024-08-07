// src/utils/auth.ts
import api from '../utils/api';
import useAuthStore from '../store/authStore';

interface LoginResponse {
  access: string;
  refresh: string;
}

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isStaff: boolean;
  dateJoined: Date;
  lastLogin: Date;
  googleId: string;
  pictureUrl: string;
  picture: string;
  verifiedEmail: boolean;
  otpCode: string;
  otpGeneratedAt: Date;
  username: string;
  dateOfBirth: Date;
  phoneNumber: string;
  profilePicture: string;
  bio: string;
  gender: string;
  city: string;
  country: string;
  profession: string;
  education: string;
  relationshipStatus: string;
  onlineStatus: boolean;
  facebookName: string;
  facebookUrls: string;
  instagramName: string;
  instagramUrls: string;
  twitterName: string;
  twitterUrls: string;
  linkedinName: string;
  linkedinUrls: string;
  otherName: string;
  otherUrls: string;
  hasBadge: boolean;
  themeMode: string;
  subscriptionType: string;
  subscriptionStartDate: Date;
  addCount: number;
  pubCount: number;
  latitude: number;
  longitude: number;
  isSubscriptionManager: boolean;
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
    const response = await api.post('authentication/login/', {
      email: email,
      password,
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
    const response = await api.get('authentication/user-profile/');
    const data = response.data as UserProfile;
    useAuthStore.getState().setUser(data);
    console.log(data)
    return data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

export const register = async (payload: any): Promise<string> => {
  try {
    const response = await api.post('authentication/register/', payload);
    const data = response.data as RegisterResponse;
    return data.message || "Account created successfully without email.";
  } catch (error: any) {
    const errorMessage = error.response?.data?.email?.[0] || error.response?.data?.phone_number?.[0] || "Registration failed.";
    throw new Error(errorMessage);
  }
};

export const emailValidateRequest = async (email: string): Promise<string> => {
  try {
    const response = await api.post('authentication/email-validate/', { email });
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
    const response = await api.post('authentication/activate-email/', { email, otp_code: otp });
    const data = response.data as ActivateEmailResponse;
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
    throw new Error(errorMessage);
  }
};

export const passwordResetRequest = async (email: string): Promise<string> => {
  try {
    const response = await api.post('authentication/password-reset-request/', { email: email });
    const data = response.data as PasswordResetResponse;
    return data.message;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || 'Failed to send OTP. Please try again.';
    throw new Error(errorMessage);
  }
};

export const passwordResetConfirm = async (otp: string, newPassword: string): Promise<string> => {
  try {
    const response = await api.post('authentication/password-reset-confirm/', { otp, new_password: newPassword });
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

  const accessToken = useAuthStore.getState().accessToken;
  const refreshToken = useAuthStore.getState().refreshToken;

  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    data: { password }
  };

  try {
    const response = await api.post('authentication/set-password/', config);
    const data = response.data as SetPasswordResponse;
    return data.message;
  } catch (error: any) {
    if (error.response?.data?.code === 'token_not_valid') {
      try {
        const refreshResponse = await api.post('authentication/refresh/', { refresh: refreshToken });
        const newAccessToken = (refreshResponse.data as { access: string }).access;
        useAuthStore.getState().setAccessToken(newAccessToken);

        const retryConfig = {
          headers: {
            'Authorization': `Bearer ${newAccessToken}`
          },
          data: { password }
        };

        const retryResponse = await api.post('authentication/set-password/', retryConfig);
        const retryData = retryResponse.data as SetPasswordResponse;
        return retryData.message;
      } catch (refreshError) {
        throw new Error('Failed to refresh token. Please login again.');
      }
    } else {
      throw new Error('An error occurred. Please try again later.');
    }
  }
};

export const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string): Promise<string> => {
  if (newPassword !== confirmPassword) {
    throw new Error('New password and confirm password do not match.');
  }

  try {
    const response = await api.post('authentication/change-password/', { old_password: oldPassword, new_password: newPassword });
    const data = response.data as ChangePasswordResponse;
    return data.message;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
    throw new Error(errorMessage);
  }
};

export const googleLoginRequest = () => {
  const clientID = "435871596858-5tvfi6mhvdr1i60ktgsjl67d6brclkl4.apps.googleusercontent.com";
  const redirectURI = "http://localhost:3000/";
  const scope = "openid email profile";
  const responseType = "code";

  const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&prompt=consent&access_type=offline`;

  window.location.href = authURL;
};

export const googleLogin = async (code: string): Promise<boolean> => {
  try {
    const response = await api.post('authentication/google-login/', { code });
    const data = response.data as GoogleLoginResponse;
    const access = data.access;
    const refresh = data.refresh;
    useAuthStore.getState().setAccessToken(access);
    useAuthStore.getState().setRefreshToken(refresh);
    return true;
  } catch (error) {
    console.error('Google login failed:', error);
    return false;
  }
};

export const logout = () => {
  useAuthStore.getState().clearAuth();
  window.location.href = '/login'; // Redirect to login page after logout
};
