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
    <div className="flex flex-col items-center justify-center h-screen">

      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center">Password Reset Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full pl-10"
                  placeholder="Votre adresse email"
                  required
                />
                <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2"></i>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
          {message && <p className="text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
