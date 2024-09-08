// Fichier: AboutPage.tsx
// import DamienProfile from '../components/about/DamienProfile.tsx';
import { useEffect } from 'react';
import Membres from '../components/about/membres.tsx'; // Importation du composant Membres
import Def from '../components/about/def.tsx';
import Statistics from '../components/home/statistics.tsx';
import Partners from '../components/about/partners.tsx';
import MiniHero from '../components/miniHero.tsx';
import AnimatedElement from '../function/AnimatedElement.tsx';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
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
  const { t } = useTranslation(); // Hook pour gérer la traduction

  return (
    <section className="min-h-screen pt-[7.5rem]">
      <AnimatedElement>
        <MiniHero content={t("About")} />
      </AnimatedElement>
      <AnimatedElement>
        <Def />     
      </AnimatedElement>
      <AnimatedElement>
      <div id='members'>
        <Membres />
      </div>
      </AnimatedElement>
      <AnimatedElement>
      <Statistics />
      </AnimatedElement>
      <AnimatedElement>
      <Partners />
      </AnimatedElement>
    </section>
  );
};

export default AboutPage;
