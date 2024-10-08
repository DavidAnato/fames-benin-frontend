import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importer les icônes d'œil
import WebPushMessage from './message';
import { useTranslation } from 'react-i18next';
import './changePassword.css'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
    const [isLoading, setIsLoading] = useState(false);
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
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            setMessageType('error');
            return;
        }
        setIsLoading(true);
        try {
            const responseMessage = await changePassword(oldPassword, newPassword, confirmPassword);
            setMessage(responseMessage);
            setMessageType('success');
            navigate('/profile'); // Redirect to profile after successful password change
        } catch (error: any) {
            setMessage(error.detail || 'An error occurred. Please try again.');
            setMessageType('error');
            setTimeout(() => {
                setMessage('');
            }, 10000);
        } finally {
            setIsLoading(false);
        }
    };
    const { t } = useTranslation(); // Hook pour gérer la traduction

    return (
        <div className="flex flex-col items-center justify-center h-screen mt-5">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <div className="flex flex-col items-center mb-4">
                        <img src={famesLogo} alt="FAMES Logo" className="h-24 mx-auto" />
                        <h2 className="text-2xl font-bold text-center">{t("ChangePassword")}</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div className="form-control relative">
                            <input
                                id="oldPassword"
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="input input-bordered rounded-2xl w-full pl-3 py-5 placeholder-transparent"
                                placeholder="Enter old password"
                                required
                            />
                            <label htmlFor="oldPassword" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
                                {t("EnterOldPassword")}
                            </label>
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
                            </button>
                        </div>
                        <div className="form-control relative">
                            <input
                                id="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input input-bordered rounded-2xl w-full pl-3 py-5 placeholder-transparent"
                                placeholder="Enter new password"
                                required
                            />
                            <label htmlFor="newPassword" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
                            {t("NewPassword")}
                            </label>
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
                            </button>
                        </div>
                        <div className="form-control relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input input-bordered rounded-2xl w-full pl-3 py-5 placeholder-transparent"
                                placeholder="Confirm new password"
                                required
                            />
                            <label htmlFor="confirmPassword" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
                            {t("ConfirmNewPassword")}
                            </label>
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
                            </button>
                        </div>
                        <button type="submit" className="w-full btn btn-accent font-bold shadow shadow-emerald-500/50 py-2 rounded-full">
                            {isLoading ? <span className="loading loading-spinner"></span> : t("Submit")}
                        </button>
                    </form>
                    {message && <WebPushMessage msg={message} type={messageType} />}
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
