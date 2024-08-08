import React, { useState } from 'react';

interface GoogleConnectionProps {
  text: string;
}

const GoogleConnection = ({ text }: GoogleConnectionProps) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
    const clientID = "435871596858-5tvfi6mhvdr1i60ktgsjl67d6brclkl4.apps.googleusercontent.com";  // Remplacez par votre propre client ID
    const redirectURI = "http://localhost:3000/"; // Assurez-vous de configurer cette URL dans la Google Cloud Console
    const scope = "openid email profile";
    const responseType = "code";

    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&prompt=consent&access_type=offline`;

    // Redirection vers l'URL d'authentification Google
    window.location.href = authURL;
  };


  return (
    <button className="btn btn-warning" type="button" onClick={handleGoogleLogin} disabled={loading}>
      {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fab fa-google mr-2"></i>}
      {text}
    </button>
  );
};

export default GoogleConnection;
