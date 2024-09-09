import React from 'react';
import famesLogo from '../assets/images/logos/fames-logo.png';
import AnimatedElement from '../function/AnimatedElement';
import { useTranslation } from 'react-i18next'; // Ajout de l'import manquant

const PreFooterCard: React.FC = () => {
  const { t } = useTranslation(); // Utilisation de `useTranslation` pour la traduction

  return (
    <AnimatedElement>
    <div className="card w-[90%] min-h-[300px] mx-auto bg-success bg my-4 -mb-40 relative">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${famesLogo})`, backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', filter: 'grayscale(100%)', opacity: 0.5 }}>
        </div>
        <div className="card-body relative z-10 flex flex-col justify-center items-center space-y-4">
            <span className='text-2xl md:text-3xl lg:text-4xl text-white font-bold text-center px-4 md:px-8 lg:px-16'>{t('contact2')}</span>
            <a href="mailto:contact@famesbenin.com" className='btn btn-warning text-lg md:text-xl lg:text-2xl rounded-xl'>
              <i className="fas fa-envelope mr-2"></i>{t('contact')}
            </a>
        </div>
    </div>
    </AnimatedElement>
  );
};

export default PreFooterCard;
