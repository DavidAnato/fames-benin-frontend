import { Briefcase, Users } from 'lucide-react';
import AnimatedElement from '../../function/AnimatedElement';
import { useTranslation } from 'react-i18next'; // Importer le hook pour la traduction
import { Link } from 'react-router-dom';

const Opportunities = () => {
  const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  return (
    <section className="py-10 bg-gray-100 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 ">
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '20%', left: '70%', fontSize: '10rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '50%', left: '30%', fontSize: '6rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '10%', left: '20%', fontSize: '8rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '40%', left: '50%', fontSize: '7rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '1%', left: '85%', fontSize: '9rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '60%', left: '40%', fontSize: '5rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '70%', left: '60%', fontSize: '6rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '80%', left: '20%', fontSize: '8rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '90%', left: '50%', fontSize: '7rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '20%', left: '1%', fontSize: '9rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '25%', left: '75%', fontSize: '10rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '55%', left: '35%', fontSize: '6rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '15%', left: '25%', fontSize: '8rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '45%', left: '55%', fontSize: '7rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '5%', left: '90%', fontSize: '9rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '65%', left: '45%', fontSize: '5rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '75%', left: '65%', fontSize: '6rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '85%', left: '25%', fontSize: '8rem' }}></i>
        <i className="fas fa-circle text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '95%', left: '55%', fontSize: '7rem' }}></i>
        <i className="fas fa-square text-gray-300 opacity-50 floating-icon" style={{ position: 'absolute', top: '30%', left: '5%', fontSize: '9rem' }}></i>
      </div>
      <div className="container mx-auto px-4 lg:px-32 z-10">
        <h2 className="text-3xl font-bold text-center mb-12">{t('opportunities.title')}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <p className="text-lg text-center md:text-left">
            {t('opportunities.description')}
          </p>
        </div>
        <AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
            <div className="card bg-white bg-opacity-50 shadow-md p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Briefcase className="h-12 w-12 text-accent mr-4" />
                  {t('opportunities.jobOpportunities')}
                </h3>
                <p className="text-gray-700 text-justify">
                  {t('opportunities.jobOpportunitiesDescription')}
                </p>
              </div>
              <div className="text-center mt-8">
                <Link to="/opportunities" className="btn btn-accent rounded-2xl">
                  <i className="fas fa-briefcase mr-2"></i>{t('opportunities.show')}
                </Link>
              </div>
            </div>
            <div className="card bg-white bg-opacity-50 shadow-md p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Users className="h-12 w-12 text-accent mr-4" />
                  {t('opportunities.partnerOpportunities')}
                </h3>
                <p className="text-gray-700 text-justify">
                  {t('opportunities.partnerOpportunitiesDescription')}
                </p>
              </div>
              <div className="text-center mt-8">
                <Link to="/opportunities" className="btn btn-accent rounded-2xl">
                  <i className="fas fa-users mr-2"></i>{t('opportunities.show')}
                </Link>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default Opportunities;
