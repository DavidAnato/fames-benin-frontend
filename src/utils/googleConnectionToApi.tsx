import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { googleLogin } from '../fetch/authFetch';
import WebPushMessage from '../components/authComponents/message';

const GoogleConnectionToApi: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code) {
      googleLogin(code).then((response: any) => {
        if (isMounted) {
          if (response.success) {
            navigate('/profile');
          } else {
            setError(response.error || 'Google login failed. Please try again.');
          }
        }
      }).catch((err: any) => {
        if (isMounted) {
          console.error('Google login error:', err);
          setError('Google login failed. Please try again.');
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [location, navigate]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className='hidden'>
      {error && <WebPushMessage msg={error} type='error'></WebPushMessage>}
    </div>
  );
};

export default GoogleConnectionToApi;
