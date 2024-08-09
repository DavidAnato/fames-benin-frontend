import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../fetch/authFetch';
import useUserProfile from '../../hooks/user';
import GoogleConnection from './googleConnection';
import famesLogo from '../../assets/images/logos/fames-logo.png';

import './login.css'

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
    <div className="flex items-center justify-center h-screen mt-5">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <div className="max-w-lg mx-auto md:mx-0 md:w-1/2 flex flex-col md:flex-row items-center">
        <img src={famesLogo} alt="FAMES Logo" className="mb-8 md:mb-0 md:mr-4 w-24 md:w-44 mx-auto" />
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Login</h2>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="floating-label mb-4 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded placeholder-transparent"
              placeholder="Email"
            />
            <label className='text-black'><i className="fa fa-envelope text-gray-500 pe-2"></i> Email</label>
          </div>
          <div className="floating-label mb-4 relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded placeholder-transparent"
              placeholder="Password"
            />
            <label><i className="fa fa-lock text-gray-500 pe-2"></i>Password</label>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button type="submit" className="w-full btn btn-accent font-bold shadow shadow-emerald-500/50 py-2 rounded-full">Login</button>
        </form>
        <div className='my-3 flex items-center'>
          <div className='flex-grow border-t border-gray-300'></div>
          <Link to="/password-reset-request" className="text-blue-300 mx-4 hover:text-blue-500 duration-100">Forgot Password?</Link>
          <div className='flex-grow border-t border-gray-300'></div>
        </div>          
        <div>
          <GoogleConnection text='log in with google'></GoogleConnection>
        </div>
      </div>
    </div>
  );
};

export default Login;
