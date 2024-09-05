import AnimatedElement from '../../function/AnimatedElement';
import partner1 from '../../assets/images/partner/partner1.png';
import partner2 from '../../assets/images/partner/embleme-benin.png';
import partner3 from '../../assets/images/partner/partner3.png';
import partner4 from '../../assets/images/partner/partner4.png';
import partner5 from '../../assets/images/partner/partenaire5.png';

// Importer vos traductions ici
import { useTranslation } from 'react-i18next';

const Partners = () => {
  const { t } = useTranslation();  // Hook pour accéder aux traductions

  const partners = [
    { src: partner2, name: t('partenaire.deuxiemePartenaire') },
    { src: partner5, name: t('partenaire.cinquièmePartenaire') },
    { src: partner1, name: t('partenaire.premierPartenaire') },
    { src: partner3, name: t('partenaire.troisièmePartenaire') },
    { src: partner4, name: t('partenaire.qutrièmePartenaire') },
  ];

  return (
<section className="py-5 bg-gradient-to-r from-gray-100 via-slate-200 to-gray-100 text-white animate-bg">
  <div className="container mx-auto px-4 flex flex-wrap justify-center lg:justify-between items-center">
    {partners.map((partner, index) => (
      <AnimatedElement key={index}>
        <div className="flex flex-col items-center justify-center m-5">
          <img src={partner.src} alt={partner.name} className="w-auto h-28 object-contain" />
        </div>
      </AnimatedElement>
    ))}
  </div>
</section>

  );
}

export default Partners;