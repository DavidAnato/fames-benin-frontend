import { useTranslation } from 'react-i18next';
import DamienProfil from '../../assets/images/membres/damien_tiando.png'; // Importez l'image
import FamesLOgo from '../../assets/images/logos/fames-logo.png';
import Info1 from '../../assets/images/membres/info_1.png';

const DamienProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mx-4 md:mx-14 mb-6">
      <div className="w-full max-w-7xl p-10 rounded-3xl">
        {/* Titre avec espacement */}
        <h1 className="text-5xl font-light text-center text-gray-900 mb-12 md:mb-20 lg:mb-28 xl:mb-36 leading-tight tracking-tight md:text-left">
          {t('damienProfile.title')}
        </h1>

        {/* Première section : Texte principal et image */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10 md:mb-16 lg:mb-24 xl:mb-32">
          <div className="md:w-2/3">
            <p className="text-xl text-gray-700 leading-relaxed mb-6 text-justify">
              {t('damienProfile.description')}
            </p>
            <p className="text-lg leading-relaxed mb-6 text-justify">
              {t('damienProfile.content')}
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <img 
              src={DamienProfil} 
              alt="Damien S. Tiando"
              style={{
                boxShadow: '20px -20px 0px 0px #d5d8dc',
              }}
              className="w-full max-w-xs rounded-3xl shadow-2xl duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Deuxième section : Texte additionnel */}
        <div className="mt-10 md:mt-16 lg:mt-24 xl:mt-32">
          <p className="text-lg leading-relaxed text-justify">
            {t('damienProfile.additional_info')}
          </p>
        </div>

        {/* Troisième section : Texte et image */}
        <div className="mt-10 md:mt-16 lg:mt-24 xl:mt-32 flex gap-7">
          <p className="text-lg leading-relaxed text-justify flex-1">
            {t('damienProfile.additional_info2')}
          </p>
          <img 
            src={Info1} 
            alt="Info1"
            className="w-full max-w-xs rounded-3xl shadow-2xl duration-300 ease-in-out"
          />
        </div>

        {/* Quatrième section : Logo et texte */}
        <div className="mt-10 md:mt-16 lg:mt-24 xl:mt-32">
          <div className="flex flex-col md:flex-row gap-5">
            <img 
              src={FamesLOgo} 
              alt="FamesLOgo"
              className="w-full max-w-xs rounded-3xl shadow-2xl duration-300 ease-in-out"
            />
            <div className="text-lg text-justify flex-1">
              <p>
                {t('damienProfile.additional_info3')}
              </p>
              <br />
              <p>
                {t('damienProfile.additional_info4')}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-16 lg:mt-24 xl:mt-32 text-lg text-justify md:flex gap-7">
          <p className="flex-1">
            {t('damienProfile.additional_info5')}
          </p>
          <br />
          <p className="flex-1">
            {t('damienProfile.additional_info6')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DamienProfile;
