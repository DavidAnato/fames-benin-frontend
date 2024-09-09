import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { activateEmail } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import WebPushMessage from './message';
import { useTranslation } from 'react-i18next';

const ActiveEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem('email') || '';
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { t } = useTranslation(); // Hook pour gérer la traduction

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
    setMessage(t('OtpSentToEmail'));
    setMessageType('info');
  }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const response = await activateEmail(email, otp.join(''));
      setMessage(response.message);
      setMessageType('success');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error: any) {
      setMessage(error.message || t('ErrorOccurred'));
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
      }, 10000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {message && <WebPushMessage msg={message} type={messageType} />}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <img src={famesLogo} alt="FAMES Logo" className="h-24 mx-auto" />
          <h2 className="text-2xl font-bold text-center">
            {t("ActivateEmail")}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-center">OTP</p>
          <div className="flex justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-16 text-2xl text-center border-4 mx-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                maxLength={1}
                required
              />
            ))}
          </div>
          <div>
            <button type="submit" className="btn btn-accent w-full rounded-full shadow shadow-emerald-500/50" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : t("Submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActiveEmail;
