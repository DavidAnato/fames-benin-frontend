import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordResetConfirm } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importer les icônes d'œil
import WebPushMessage from './message'; // Import WebPushMessage component
import './login.css'; // Assurez-vous que ce fichier contient les styles nécessaires
import { useTranslation } from 'react-i18next';

const PasswordResetConfirm: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [loading, setLoading] = useState(false);
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
  }, []);

  useEffect(() => {
    setMessage(t('EmailSentMessage'));
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage(t('NewPasswordAndConfirmPasswordDoNotMatch'));
      setMessageType('error');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      await passwordResetConfirm(otp.join(''), newPassword);
      setMessage(t('PasswordResetSuccessfully'));
      setMessageType('success');
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error: any) {
      setMessage(error.message || 'An error occurred. Please try again later.');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
      }, 10000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mt-5">
      {message && <WebPushMessage msg={message} type={messageType} />}
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <img src={famesLogo} alt="FAMES Logo" className="h-24 mx-auto" />
          <h2 className="text-2xl font-bold text-center">{t("PasswordResetConfirmation")}</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <p className="text-sm text-center">OTP</p>
          <div className="flex justify-center pb-6">
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
          <div className="relative form-control">
            <input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered rounded-2xl w-full pl-3 py-5 placeholder-transparent"
              placeholder={t("EnterNewPassword")}
              required
            />
            <label htmlFor="newPassword" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
              {t("NewPassword")}
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
              className="input input-bordered rounded-2xl w-full pl-3 py-5 placeholder-transparent"
              placeholder={t("ConfirmNewPassword")}
              required
            />
            <label htmlFor="confirmPassword" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
              {t("ConfirmNewPassword")}
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
            {loading ? <span className="loading loading-spinner"></span> : t("Submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
