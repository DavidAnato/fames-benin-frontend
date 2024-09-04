import { Calendar, Users, MapPin, GraduationCap } from 'lucide-react';
import AnimatedElement from '../../function/AnimatedElement';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importer le hook pour la traduction

const useCountUp = (end: number, start: number = 0, duration: number = 2000) => {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.unobserve(ref.current!); // Unobserve after the first animation
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, start, duration]);

  return [count, ref] as const;
};

const Statistics = () => {
  const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  const [since, sinceRef] = useCountUp(2010);
  const [members, membersRef] = useCountUp(292);
  const [cities, citiesRef] = useCountUp(12);
  const [graduates, graduatesRef] = useCountUp(3000);

  return (
    <section className="py-10 bg-gray-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('statistics.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 text-center" ref={sinceRef}>
              <Calendar className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('statistics.since')}</h3>
              <p className="text-3xl font-bold">{since}</p>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 text-center" ref={membersRef}>
              <Users className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('statistics.activeMembers')}</h3>
              <p className="text-3xl font-bold">{members}</p>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 text-center" ref={citiesRef}>
              <MapPin className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('statistics.activeCities')}</h3>
              <p className="text-3xl font-bold">{cities}</p>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 text-center" ref={graduatesRef}>
              <GraduationCap className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('statistics.graduates')}</h3>
              <p className="text-3xl font-bold">+{graduates}</p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
