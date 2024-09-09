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
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false); // Nouveau flag pour empêcher la boucle infinie

  // Détecte le changement de langue
  useEffect(() => {
    setLanguageChanged(true);
  }, [i18n.language]);

  // Effet pour gérer la suppression du texte quand la langue change
  useEffect(() => {
    if (languageChanged) {
      if (index > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText((prevText) => prevText.slice(0, -1));
          setIndex((prevIndex) => prevIndex - 1);
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        const resetTimeout = setTimeout(() => {
          setLanguageChanged(false);
          setTextIndex(0);
          setDisplayedText('');
          setIndex(0);
          setHasFinishedTypingSecondText(false);
          setHasCompletedCycle(false); // Réinitialiser le flag pour autoriser une nouvelle animation
        }, 500);
        return () => clearTimeout(resetTimeout);
      }
    }
  }, [languageChanged, index]);

  // Effet pour gérer la saisie et la suppression de texte
  useEffect(() => {
    if (!languageChanged && !hasCompletedCycle) { // Empêche les boucles après la fin du cycle
      if (isErasing) {
        // Effacer le texte
        if (index > 0) {
          const timeout = setTimeout(() => {
            setDisplayedText((prevText) => prevText.slice(0, -1));
            setIndex((prevIndex) => prevIndex - 1);
          }, 20);
          return () => clearTimeout(timeout);
        } else if (textIndex === 0) {
          const pauseTimeout = setTimeout(() => {
            setIsErasing(false);
            setTextIndex(1);
            setIndex(0);
            setDisplayedText('');
          }, 750);
          return () => clearTimeout(pauseTimeout);
        }
      } else {
        // Taper le texte
        if (index < texts[textIndex].length) {
          const timeout = setTimeout(() => {
            setDisplayedText((prevText) => prevText + texts[textIndex].charAt(index));
            setIndex((prevIndex) => prevIndex + 1);
          }, 75);
          return () => clearTimeout(timeout);
        } else if (textIndex === 1) {
          setHasFinishedTypingSecondText(true);
          const pauseTimeout = setTimeout(() => {
            setIsErasing(true);
          }, 5000);
          return () => clearTimeout(pauseTimeout);
        } else {
          const pauseTimeout = setTimeout(() => {
            setIsErasing(true);
          }, 5000);
          return () => clearTimeout(pauseTimeout);
        }
      }
    }
  }, [index, isErasing, textIndex, texts, languageChanged, hasCompletedCycle]);

  // Contrôle de fin du cycle d'animation
  useEffect(() => {
    if (hasFinishedTypingSecondText && !isErasing && !hasCompletedCycle) {
      // Marquer la fin du cycle une fois la saisie du deuxième texte terminée
      setHasCompletedCycle(true);
    }
  }, [hasFinishedTypingSecondText, isErasing, hasCompletedCycle]);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '102vh',
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
};

export default Hero;
