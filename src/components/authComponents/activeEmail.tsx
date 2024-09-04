import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activateEmail } from '../../fetch/authFetch';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import des icônes
import famesLogo from '../../assets/images/logos/fames-logo.png';

const ActiveEmail = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour la visibilité du mot de passe
  const email = localStorage.getItem('email') || '';
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await activateEmail(email, otp);
      setMessage(response.message);
      if (response.success) {
        navigate('/login');
      }
    } catch (error: any) {
      setMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="max-w-lg mx-auto md:mx-0 md:w-1/2 flex flex-col md:flex-row items-center">
        <img src={famesLogo} alt="FAMES Logo" className="mb-8 md:mb-0 md:mr-4 w-24 md:w-44 mx-auto" />
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Activate Email</h2>
      </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative mb-4">
            <input
              id="otp"
              type={showPassword ? 'text' : 'password'}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="peer w-full px-3 py-2 border rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder=" "
              maxLength={5}
              required
            />
            <label
              htmlFor="otp"
              className="absolute top-2 left-3 text-gray-500 transition-transform transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-7 peer-focus:scale-75"
            >
              OTP
            </label>
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
            </button>
          </div>
          <div>
            <button type="submit" className="btn btn-accent w-full rounded-full shadow shadow-emerald-500/50">
              Submit
            </button>
          </div>
        </form>
        {message && (
          <div className="alert alert-error shadow-lg mt-4">
            <div>
              <i className="fas fa-exclamation-circle"></i>
              <span>{message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveEmail;
