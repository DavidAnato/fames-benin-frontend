import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordResetConfirm } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importer les icônes d'œil
import './login.css'; // Assurez-vous que ce fichier contient les styles nécessaires

const PasswordResetConfirm: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      await passwordResetConfirm(otp, newPassword);
      setMessage('Password reset successfully.');
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error: any) {
      setMessage(error.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mt-5">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md">
        <div className="max-w-lg mx-auto md:mx-0 md:w-1/2 flex flex-col md:flex-row items-center mb-8">
          <img src={famesLogo} alt="FAMES Logo" className="mb-8 md:mb-0 md:mr-4 w-24 md:w-44" />
          <h2 className="text-2xl font-bold text-center md:text-left">Password Reset Confirmation</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="relative form-control">
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input input-bordered w-full pl-3 py-5 placeholder-transparent"
              placeholder="Enter OTP"
              required
            />
            <label htmlFor="otp" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
              OTP
            </label>
          </div>
          <div className="relative form-control">
            <input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full pl-3 py-5 placeholder-transparent"
              placeholder="Enter new password"
              required
            />
            <label htmlFor="newPassword" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
              New Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEye className="text-gray-500" size={20} /> : <FaEyeSlash className="text-gray-500" size={20} />}
            </button>
          </div>
          <div className="relative form-control">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full pl-3 py-5 placeholder-transparent"
              placeholder="Confirm new password"
              required
            />
            <label htmlFor="confirmPassword" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
              Confirm New Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye className="text-gray-500" size={20} /> : <FaEyeSlash className="text-gray-500" size={20} />}
            </button>
          </div>
          <button type="submit" className="w-full btn btn-accent font-bold shadow shadow-emerald-500/50 py-2 rounded-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {message && (
            <div className="alert alert-error shadow-lg mt-4">
              <div>
                <i className="fas fa-exclamation-circle"></i>
                <span>{message}</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
