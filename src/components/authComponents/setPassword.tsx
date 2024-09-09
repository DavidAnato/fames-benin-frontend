import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPassword as setPasswordAPI } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import WebPushMessage from './message';
import { useTranslation } from 'react-i18next';

const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password and confirm password do not match.');
            setMessageType('error');
            return;
        }
        setLoading(true);
        setMessage('');
        setMessageType('info');

        try {
            const responseMessage = await setPasswordAPI(password, confirmPassword);
            setMessage(responseMessage);
            setMessageType('success');
            navigate('/profile'); // Redirect to login page after successful password set
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
    const { t } = useTranslation(); // Hook pour gérer la traduction

    return (
        <div className="flex items-center justify-center h-screen mt-5">
            <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md">
            <div className="max-w-lg md:w-1/2 flex flex-col md:flex-row items-center mb-8">
                <img src={famesLogo} alt="FAMES Logo" className="w-24 md:w-44 mb-8 md:mb-0 md:mr-4" />
                <h2 className="text-2xl font-bold text-center md:text-left">{t("SetPassword")}</h2>
            </div>
            <div className="card w-full max-w-md bg-base-100">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative form-control">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered rounded-2xl w-full pl-3 pt-5 pb-2 placeholder-transparent"
                                placeholder="Enter your password"
                                required
                            />
                            <label htmlFor="password" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y- scale-75 origin-top-left">
                                {t("Password")}
                            </label>
                        </div>
                        <div className="relative form-control">
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input input-bordered rounded-2xl w-full pl-3 pt-5 pb-2 placeholder-transparent"
                                placeholder="Confirm your password"
                                required
                            />
                            <label htmlFor="confirmPassword" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y- scale-75 origin-top-left">
                                {t("ConfirmPassword")}
                            </label>
                        </div>
                        <button type="submit" className="w-full btn btn-accent font-bold py-2 rounded-full shadow-lg" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : 'Submit'}
                        </button>
                        {message && (
                            <WebPushMessage msg={message} type={messageType} />
                        )}
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default SetPassword;
