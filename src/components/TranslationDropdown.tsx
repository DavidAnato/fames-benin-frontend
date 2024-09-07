import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import englishLogo from '../assets/images/logos/anglaise_lang.png';
import franceLogo from '../assets/images/logos/france_lang.png';
import chineLogo from '../assets/images/logos/chine_lang.png';
import { updateUserLanguage } from '../fetch/langueFetch';
import useAuthStore from '../store/authStore';

interface TranslationDropdownProps {
  bgColor: string;
}

const TranslationDropdown: React.FC<TranslationDropdownProps> = ({ bgColor }) => {
  const { i18n } = useTranslation();
  const { user, setUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const initialLanguage = user?.language_preference || localStorage.getItem('language') || i18n.language || 'en';
  const [language, setLanguage] = useState(initialLanguage);
  const [flagSrc, setFlagSrc] = useState(
    initialLanguage === 'en' ? englishLogo : initialLanguage === 'fr' ? franceLogo : chineLogo
  );

  useEffect(() => {
    if (!user) {
      localStorage.setItem('language', language);
    }
    setFlagSrc(
      language === 'en' ? englishLogo : language === 'fr' ? franceLogo : chineLogo
    );
  }, [language, user]);

  const handleChangeLanguage = async (lng: string | undefined) => {
    if (lng) {
      i18n.changeLanguage(lng);
      setLanguage(lng);
      if (user) {
        try {
          const updatedUser = await updateUserLanguage(lng);
          setUser(updatedUser);
        } catch (error) {
          console.error('Failed to update language preference:', error);
        }
      } else {
        localStorage.setItem('language', lng);
      }
    }
  };

  return (
    <div className="dropdown dropdown-end ml-2">
      <div tabIndex={0} role="button" className="btn btn-ghost flex items-center px-1">
        <span className="hidden lg:inline">
          {language === 'en' ? 'EN' : language === 'fr' ? 'FR' : 'CH'}
        </span>
        <span className="inline-block w-5">
          <img 
            src={flagSrc} 
            alt={language === 'en' ? 'English' : language === 'fr' ? 'French' : 'Chinese'} 
            className="w-6 h-4" 
          />
        </span>
      </div>
      <ul
        tabIndex={0}
        className={`menu menu-sm dropdown-content ${bgColor} rounded-box z-[1] mt-3 w-20 p-2 shadow`}
      >
        <li>
          <button onClick={() => handleChangeLanguage('en')} className="w-full text-left flex items-center">
            EN
            <img src={englishLogo} alt="English" className="w-6 h-4 mr-2" />
          </button>
        </li>
        <li>
          <button onClick={() => handleChangeLanguage('fr')} className="w-full text-left flex items-center">
            FR
            <img src={franceLogo} alt="French" className="w-6 h-4 mr-2" />
          </button>
        </li>
        <li>
          <button onClick={() => handleChangeLanguage('ch')} className="w-full text-left flex items-center">
            CH
            <img src={chineLogo} alt="Chinese" className="w-6 h-4 mr-2" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TranslationDropdown;
