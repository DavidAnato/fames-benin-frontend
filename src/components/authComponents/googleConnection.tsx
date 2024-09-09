import React, { useState } from 'react';
import Google from '../../assets/images/logos/google.png';


interface GoogleConnectionProps {
  text: string;
}

const GoogleConnection = ({ text }: GoogleConnectionProps) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const redirectURI = process.env.redirectURI;
    const scope = "openid email profile";
    const responseType = "code";

    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&prompt=consent&access_type=offline`;

    window.location.href = authURL;
  };

  return (
    <button className="btn border border-black w-full rounded-full flex items-center justify-center py-2 px-4" type="button" onClick={handleGoogleLogin} disabled={loading}>
    {loading ? (
      <span className="loading loading-spinner"></span>
      ) : (
      <img src={Google} alt="Google Logo" className="w-6 h-6 mr-2" />
    )}
    {text}
  </button>
  );
};

export default GoogleConnection;
