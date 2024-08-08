import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { googleLogin } from '../fetch/authFetch';

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
            navigate('/dashboard');
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

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default GoogleConnectionToApi;
