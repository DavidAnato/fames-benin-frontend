import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordResetRequest } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import WebPushMessage from './message';
import { useTranslation } from 'react-i18next';

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setMessageType('success');
      navigate('/password-reset-confirm'); // Redirect to email activation page
    } catch (error: any) {
      setMessage(error.message || 'An error occurred. Please try again later.');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
      }, 10000); // Reset error message after 10 seconds
    } finally {
      setLoading(false);
    }
  };
  const { t } = useTranslation(); // Hook pour gérer la traduction

  return (
    <div className="flex items-center justify-center min-h-screen">
      {message && <WebPushMessage msg={message} type={messageType} />}
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <img src={famesLogo} alt="FAMES Logo" className="h-24 mx-auto" />
          <h2 className="text-2xl font-bold text-center">{t("PasswordResetRequest")}</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered rounded-2xl w-full pl-10 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-0 text-gray-500 duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-5 peer-focus:scale-75"
            >
              <i className="fa fa-envelope text-gray-500 pe-2"></i> E-mail
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-accent font-bold shadow shadow-emerald-500/50 py-2 w-full rounded-full"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : t('Submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
