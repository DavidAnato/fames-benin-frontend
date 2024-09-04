import { Briefcase, Users } from 'lucide-react';
import AnimatedElement from '../../function/AnimatedElement';
import { useTranslation } from 'react-i18next'; // Importer le hook pour la traduction
import { Link } from 'react-router-dom';

const Opportunities = () => {
  const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  return (
    <section className="py-10 bg-gray-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-32">
        <h2 className="text-3xl font-bold text-center mb-12">{t('opportunities.title')}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <p className="text-lg text-center md:text-left">
            {t('opportunities.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 flex items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Briefcase className="h-12 w-12 text-accent mr-4" />
                  {t('opportunities.jobOpportunities')}
                </h3>
                <p className="text-gray-700 text-justify">
                  {t('opportunities.jobOpportunitiesDescription')}
                </p>
                <div className="text-center mt-8">
                  <Link to="/opportunities" className="btn btn-accent rounded-2xl">{t('opportunities.show')}</Link>
                </div>
              </div>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 flex items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Users className="h-12 w-12 text-accent mr-4" />
                  {t('opportunities.partnerOpportunities')}
                </h3>
                <p className="text-gray-700 text-justify">
                  {t('opportunities.partnerOpportunitiesDescription')}
                </p>
                <div className="text-center mt-8">
                  <Link to="/opportunities" className="btn btn-accent rounded-2xl">{t('opportunities.show')}</Link>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

export default Opportunities;
