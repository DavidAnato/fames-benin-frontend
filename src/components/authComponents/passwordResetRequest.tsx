import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordResetRequest } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import WebPushMessage from './message';

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const responseMessage = await passwordResetRequest(email);
      setMessage(responseMessage);
      navigate('/password-reset-confirm'); // Redirect to email activation page
    } catch (error: any) {
      setMessage(error.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src={famesLogo} alt="FAMES Logo" className="w-24 md:w-44 mb-4" />
          <h2 className="text-2xl font-bold mb-6 text-center">Password Reset Request</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full pl-10 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-0 text-gray-500 duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-5 peer-focus:scale-75"
            >
              <i className="fa fa-envelope text-gray-500 pe-2"></i> Email
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-accent font-bold shadow shadow-emerald-500/50 py-2 w-full rounded-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        </form>
        {message && <WebPushMessage msg={message} type='error'></WebPushMessage>}
      </div>
    </div>
  );
};

export default PasswordResetRequest;
