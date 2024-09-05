import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { activateEmail } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import WebPushMessage from './message';

const ActiveEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem('email') || '';
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
    setMessage('The OTP code has been sent to your email.');
    setMessageType('info');
  }, []);

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
      setMessage(error.message || 'An error occurred. Please try again.');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
      }, 10000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {message && <WebPushMessage msg={message} type={messageType} />}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="max-w-lg mx-auto md:mx-0 md:w-1/2 flex flex-col md:flex-row items-center">
          <img src={famesLogo} alt="FAMES Logo" className="md:mb-0 md:mr-4 w-24 md:w-44 mx-auto" />
          <h2 className="text-2xl font-bold text-center md:text-left">Activate Email</h2>
        </div>
          <p className="text-sm text-center mb-6">Enter the code sent to your email to activate your account.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? <span className="loading loading-spinner"></span> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActiveEmail;
