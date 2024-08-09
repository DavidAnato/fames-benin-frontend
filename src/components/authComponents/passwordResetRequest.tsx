import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordResetRequest } from '../../fetch/authFetch';

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="card w-full max-w-md shadow-2xl bg-base-100 p-6 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="card-body">
            <h2 className="card-title text-center text-xl font-bold mb-4">Password Reset Request</h2>
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
                  className="absolute left-3 text-gray-500 duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-5 peer-focus:scale-75"
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
            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
