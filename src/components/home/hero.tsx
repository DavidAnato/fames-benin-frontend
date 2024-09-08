import { useTranslation } from 'react-i18next';
import { LogIn, ArrowDown } from 'lucide-react';
import heroBg from '../../assets/images/hero-bg.png';
import useUserProfile from '../../hooks/user';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = useUserProfile();

  const texts = [t('welcome1'), t('welcome2')];
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [languageChanged, setLanguageChanged] = useState(false);
  const [hasFinishedTypingSecondText, setHasFinishedTypingSecondText] = useState(false);

  // Détecte le changement de langue
  useEffect(() => {
    setLanguageChanged(true);
  }, [i18n.language]);

  useEffect(() => {
    if (languageChanged) {
      // Effacer le texte en cours avec une animation
      if (index > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
          setIndex(index - 1);
        }, 20); // Vitesse d'effacement

        return () => clearTimeout(timeout);
      } else {
        // Réinitialiser et recommencer le cycle
        const resetTimeout = setTimeout(() => {
          setLanguageChanged(false);
          setTextIndex(0);
          setDisplayedText('');
          setIndex(0);
          setHasFinishedTypingSecondText(false);
        }, 500); // Pause après l'effacement
        return () => clearTimeout(resetTimeout);
      }
    } else if (isErasing) {
      // Effacer le texte après affichage
      if (index > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
          setIndex(index - 1);
        }, 20); // Vitesse d'effacement

        return () => clearTimeout(timeout);
      } else {
        // Si le texte actuel est le premier texte
        if (textIndex === 0) {
          // Passer au deuxième texte
          const pauseTimeout = setTimeout(() => {
            setIsErasing(false);
            setTextIndex(1);
            setIndex(0);
            setDisplayedText('');
          }, 750); // Pause après l'effacement avant d'écrire le nouveau texte

          return () => clearTimeout(pauseTimeout);
        }
      }
    } else {
      // Écrire le texte
      if (index < texts[textIndex].length) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText + texts[textIndex].charAt(index));
          setIndex(index + 1);
        }, 75); // Vitesse de frappe

        return () => clearTimeout(timeout);
      } else if (textIndex === 1) {
        // Pour le deuxième texte, il reste affiché et ne sera pas effacé
        setHasFinishedTypingSecondText(true); // Marquer comme affichage terminé
        const pauseTimeout = setTimeout(() => {
          setIsErasing(true); // Commencer l'effacement uniquement si la langue change
        }, 5000); // Pause avant d'effacer

        return () => clearTimeout(pauseTimeout);
      } else {
        const pauseTimeout = setTimeout(() => {
          setIsErasing(true);
        }, 5000); // Pause avant d'effacer
        return () => clearTimeout(pauseTimeout);
      }
    }
  }, [index, displayedText, textIndex, isErasing, languageChanged, texts, hasFinishedTypingSecondText]);

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
          <h1 className="mb-5 text-5xl font-bold">
            <span>{displayedText}</span>
            
            {!hasFinishedTypingSecondText && <span className="cursor">|</span>}
          </h1>
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
