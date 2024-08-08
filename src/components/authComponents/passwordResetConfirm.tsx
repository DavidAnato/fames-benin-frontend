import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordResetConfirm } from '../../fetch/authFetch';

const PasswordResetConfirm: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Password Reset Confirmation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label htmlFor="otp" className="label">
            <span className="label-text">OTP</span>
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input input-bordered w-full pl-10"
            placeholder="Enter OTP"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="newPassword" className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full pl-10"
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword" className="label">
            <span className="label-text">Confirm New Password</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full pl-10"
            placeholder="Confirm new password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {message && <div className="alert alert-error shadow-lg mt-4">
          <div>
            <i className="fas fa-exclamation-circle"></i>
            <span>{message}</span>
          </div>
        </div>}
      </form>
    </div>
  );
};

export default PasswordResetConfirm;
