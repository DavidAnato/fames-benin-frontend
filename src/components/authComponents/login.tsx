import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../fetch/authFetch';
import useUserProfile from '../../hooks/user';
import GoogleConnection from './googleConnection';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css'
import WebPushMessage from './message';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUserProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed. Please check your credentials and try again.');
    }
  };
  const { t } = useTranslation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (user) {
    navigate('/');
  }

  return (
    <div className="flex items-center justify-center h-screen mt-5">
      {error && <WebPushMessage msg={error} type='error' />}
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <img src={famesLogo} alt="FAMES Logo" className="h-24 mx-auto" />
          <h2 className="text-2xl font-bold text-center">{t("Login")}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="floating-label mb-4 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-3 border rounded placeholder-transparent"
              placeholder="Email"
            />
            <label className='text-black'><i className="fa fa-envelope text-gray-500 pe-2"></i> E-mail</label>
          </div>
          <div className="floating-label mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-3 border rounded placeholder-transparent"
              placeholder="Password"
            />
            <label className="flex items-center">
              <i className="fa fa-lock text-gray-500 pe-2"></i>{t("Password")}
            </label>
            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye className="text-gray-500" size={20} /> : <FaEyeSlash className="text-gray-500" size={20} />}
              </button>
          </div>
          <button type="submit" className="w-full btn btn-accent font-bold shadow shadow-emerald-500/50 py-2 rounded-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : <i className="fas fa-sign-in-alt mr-2"></i>} {t("Login")}
          </button>
        </form>
        <div className='my-3 flex items-center'>
          <div className='flex-grow border-t border-gray-300'></div>
          <Link to="/password-reset-request" className="text-blue-300 mx-4 hover:text-blue-500 duration-100">{t("ForgotPassword")}?</Link>
          <div className='flex-grow border-t border-gray-300'></div>
        </div>          
        <div>
          <GoogleConnection text={t('LoginWithGoogle')}></GoogleConnection>
        </div>
      </div>
    </div>
  );
};

export default Login;
