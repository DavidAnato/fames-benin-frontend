import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './components/translate/en.json';
import frTranslations from './components/translate/fr.json';
import chTranslations from './components/translate/ch.json'; // Import des traductions chinoises

import useAuthStore from './store/authStore';

// Détection simple basée sur la langue du navigateur
const detectLanguage = () => {
  const { user } = useAuthStore.getState();
  if (user && user.language_preference) {
    return user.language_preference;
  }
  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage) {
    return storedLanguage;
  }
  const lang = navigator.language;
  return lang.startsWith('fr') ? 'fr' : lang.startsWith('zh') ? 'ch' : 'en'; // Détection de la langue chinoise
};

// Configurer i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      ch: {
        translation: chTranslations, // Ajout des ressources chinoises
      },
    },
    lng: detectLanguage(), // Définir la langue détectée par défaut
    fallbackLng: 'en', // Langue par défaut
    interpolation: {
      escapeValue: false, // Pas nécessaire pour React
    },
  });

export default i18n;
