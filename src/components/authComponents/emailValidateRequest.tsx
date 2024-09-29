import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailValidateRequest } from '../../fetch/authFetch';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import WebPushMessage from './message';
import useUserProfile from '../../hooks/user';
import { useTranslation } from 'react-i18next';

const EmailValidateRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useUserProfile();

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
        setMessage(''); // Clear message before attempting to send email
        setLoading(true);
        try {
            const responseMessage = await emailValidateRequest(email);
            setMessage(responseMessage);
            setMessageType('success');
            localStorage.setItem('email', email);
            navigate('/active-email'); // Redirect to email activation page
        } catch (error: any) {
            setMessage(error.message);
            setMessageType('error');
            setTimeout(() => {
                navigate(user ? '/profile' : '/login');
                setMessage('');
            }, 10000); // Reset error message after 10 seconds
        } finally {
            setLoading(false);
        }
    };
    const { t } = useTranslation(); // Hook pour gérer la traduction

    return (
        <div className="flex flex-col items-center justify-center h-screen mt-5">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <div className="flex flex-col items-center mb-4">
                        <img src={famesLogo} alt="FAMES Logo" className="h-24 mx-auto" />
                        <h2 className="text-2xl font-bold text-center">{t("EmailValidateRequest")}</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered rounded-2xl w-full pl-3 pt-5 pb-2 placeholder-transparent"
                                placeholder="Enter your email"
                                required
                            />
                            <label htmlFor="email" className="absolute top-0 left-0 px-3 pt-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left">
                                E-mail
                            </label>
                        </div>
                        <button type="submit" className="w-full btn btn-accent font-bold shadow shadow-emerald-500/50 py-2 rounded-full">
                            {loading ? <span className="loading loading-spinner"></span> : t("Submit")}
                        </button>
                    </form>
                    {message && (
                        <WebPushMessage msg={message} type={messageType} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailValidateRequest;
