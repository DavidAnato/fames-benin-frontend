import { useEffect } from 'react';
import { fetchUserProfile } from '../fetch/authFetch';
import useAuthStore from '../store/authStore';

const useUserProfile = () => {
  const { accessToken, user, setUser } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    if (accessToken && !user) {
      fetchUserProfile().then(fetchedUser => {
        setUser(fetchedUser);
      });
    }
  }, [accessToken, user, setUser]);

  return { accessToken, user };
};

export default useUserProfile;