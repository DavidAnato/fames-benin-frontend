import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import famesLogo from '../../assets/images/logos/fames-logo.png';

const AboutUs = () => {
  const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg mx-auto md:mx-0 md:w-1/2">
          <img src={famesLogo} alt="FAMES Logo" className="mb-8 md:mb-0 mx-auto md:ml-0" />
        </div>
        <div className="max-w-lg mx-auto md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold text-center md:text-left mb-8">{t('about_us')}</h2>
          <p className="text-lg text-justify leading-relaxed">
            {t('about_us_description')}
          </p>
          <div className="mt-8 text-center md:text-left">
            <Link to='/about-us' className="btn btn-warning rounded-2xl">
              <i className="fas fa-info-circle mr-2"></i>
              {t('learn_more')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
