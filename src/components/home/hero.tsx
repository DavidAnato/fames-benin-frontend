// src/components/Hero.js
import { useTranslation } from 'react-i18next';
import { LogIn, ArrowDown } from 'lucide-react';
import heroBg from '../../assets/images/hero-bg.png';
import useUserProfile from '../../hooks/user';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useTranslation();
  const user = useUserProfile();

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "102vh"
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
        <div>
          <h1 className="mb-5 text-5xl font-bold">{t('welcome')}</h1>
          <p className="mb-5 text-lg">
            {t('mission')}
            <br />
            {t('join')}
          </p>
          
          {user ? (
            <button 
              className="btn md:btn-md lg:btn-lg btn-accent font-bold shadow-lg shadow-emerald-500/50 rounded-2xl"
              onClick={handleScroll}
            >
              <ArrowDown /> {t('getStarted')}
            </button>
          ) : (
            <Link 
              to="/login" 
              className="btn md:btn-md lg:btn-lg btn-accent font-bold shadow-lg shadow-emerald-500/50 rounded-2xl"
            >
              <LogIn /> {t('getStarted')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
