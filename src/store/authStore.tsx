import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  email: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: any) => void;
  setEmail: (email: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      email: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      setRefreshToken: (token: string) => set({ refreshToken: token }),
      setUser: (user: any) => set({ user }),
      setEmail: (email: string) => set({ email }),
      clearAuth: () => set({ accessToken: null, refreshToken: null, user: null, email: null })
    }),
    { name: 'auth' }
  )
);

export default useAuthStore;