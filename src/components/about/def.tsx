import { useTranslation } from 'react-i18next';
import famesLogo from '../../assets/images/logos/fames-logo.png';
import parse from 'html-react-parser';

const Def = () => {
  const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  return (
    <section className="py-8">
      <div className="px-10 justify-center flex flex-col md:flex-row items-center mx-auto">
        <div className="w-full md:w-1/3">
          <img src={famesLogo} alt="FAMES Logo" className="mb-8 md:mb-0 mx-auto md:ml-0" />
        </div>
        <div className="w-full md:w-3/3 md:pl-8">
          <p className="text-lg leading-relaxed text-justify">
            {parse(t('famesDefAbout'))}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Def;
