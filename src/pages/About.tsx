// Fichier: AboutPage.tsx
// import DamienProfile from '../components/about/DamienProfile.tsx';
import { useEffect } from 'react';
import Membres from '../components/about/membres.tsx'; // Importation du composant Membres
import Def from '../components/about/def.tsx';
import Statistics from '../components/home/statistics.tsx';
import Partners from '../components/about/partners.tsx';

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

  return (
    <section className="min-h-screen pt-[7.5rem]">
      <div className="flex justify-center mb-5 bg-accent rounded-xl mx-5 py-20">
        <h1 className="text-5xl font-bold">About</h1>
      </div>
      <Def />     
      <div id='members'>
        <Membres />
      </div>
      <Statistics />
      {/* <hr /> */}
      <Partners />
      {/* <DamienProfile /> */}
    </section>
  );
};

export default AboutPage;
