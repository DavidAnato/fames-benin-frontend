import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../fetch/authFetch';
import useUserProfile from '../../hooks/user';
import GoogleConnection from './googleConnection';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  if (user) {
    navigate('/dashboard');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/password-reset-request" className="text-blue-500">Forgot Password?</Link>
        </div>
        <GoogleConnection text='Se connecter avec Google'></GoogleConnection>
      </div>
    </div>
  );
};

export default Login;