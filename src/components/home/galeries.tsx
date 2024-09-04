import { useTranslation } from 'react-i18next'; // Importer le hook pour la traduction
import image1 from '../../assets/images/galeries/image1.png';
import image2 from '../../assets/images/galeries/image2.png';
import image3 from '../../assets/images/galeries/image3.png';
import image4 from '../../assets/images/galeries/image4.png';
import image5 from '../../assets/images/galeries/image5.png';
import image6 from '../../assets/images/galeries/image6.png';
import AnimatedElement from '../../function/AnimatedElement';
import { Link } from 'react-router-dom';

const photos = [
  { src: image1 },
  { src: image2 },
  { src: image4 },
  { src: image3 },
  { src: image5 },
  { src: image6 },
];

const Galleries = () => {
  const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  return (
    <section className="py-10 bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">{t('galleries.title')}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <p className="text-lg text-center md:text-left">
            {t('galleries.description')}
          </p>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex flex-col gap-4">
            {photos.filter((_, index) => index % 3 === 0).map((photo, index) => (
              <AnimatedElement key={index}>
                <div className="relative w-full rounded overflow-hidden">
                  <img src={photo.src} className="w-full h-auto object-cover" alt={`Gallery image ${index + 1}`} />
                </div>
              </AnimatedElement>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {photos.filter((_, index) => index % 3 === 1).map((photo, index) => (
              <AnimatedElement key={index}>
                <div className="relative w-full rounded overflow-hidden">
                  <img src={photo.src} className="w-full h-auto object-cover" alt={`Gallery image ${index + 1}`} />
                </div>
              </AnimatedElement>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {photos.filter((_, index) => index % 3 === 2).map((photo, index) => (
              <AnimatedElement key={index}>
                <div className="relative w-full rounded overflow-hidden">
                  <img src={photo.src} className="w-full h-auto object-cover" alt={`Gallery image ${index + 1}`} />
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
        <AnimatedElement>
          <div className="carousel rounded-box md:hidden" style={{ height: '250px' }}>
            {photos.map((photo, index) => (
              <div key={index} className="carousel-item">
                <img src={photo.src} alt={`Gallery image ${index + 1}`} />
              </div>
            ))}
          </div>
        </AnimatedElement>
        <div className="text-center mt-8">
          <Link to="/gallery" className="btn btn-accent rounded-2xl">
            <i className="fas fa-images mr-2"></i>{t('galleries.showGallery')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Galleries;
