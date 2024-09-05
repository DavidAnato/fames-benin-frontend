import { useEffect } from 'react';
import { fetchUserProfile } from '../fetch/authFetch';
import useAuthStore from '../store/authStore';

const useUserProfile = () => {
  const { accessToken, user, setUser, clearAuth } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    user: state.user,
    setUser: state.setUser,
    clearAuth: state.clearAuth,
  }));

  useEffect(() => {
    const verifyUser = async () => {
      if (accessToken) {
        const fetchedUser = await fetchUserProfile();
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          clearAuth();
        }
      }
    };

    verifyUser();
  }, [accessToken, setUser, clearAuth]);

  return { accessToken, user };
};

export default useUserProfile;