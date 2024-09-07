import React, { useState, useEffect } from 'react';
import { fetchOpportunities } from '../fetch/opportunityFetch';
import AnimatedElement from '../function/AnimatedElement';
import chineseUniversityOfGeosciences from '../assets/images/partner/partner1.png';
import ministryOfForeignAffairsOfBenin from '../assets/images/partner/embleme-benin.png';
import uneb from '../assets/images/partner/partner3.png';
import fneb from '../assets/images/partner/partner4.png';
import confuciusInstitute from '../assets/images/partner/partenaire5.png';
import MiniHero from '../components/miniHero';
import { useTranslation } from 'react-i18next';

// Définir l'interface pour une opportunité
interface Opportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
}

// Définir l'interface pour un partenaire
interface Partner {
  src: string;
  nameFr: string;
  nameEn: string;
  nameCh: string;
}

const OpportunityPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lang , setLang] = useState(i18n.language);

  useEffect(() => {
    setLang(i18n.language);
    console.log(i18n.language)
  }, [i18n.language]);

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

  useEffect(() => {
    const loadOpportunities = async (page: number) => {
      setLoading(true);
      try {
        const response = await fetchOpportunities(`opportunities/opportunities/?page=${page}`);
        setOpportunities(response.results.map(opportunity => ({
          ...opportunity,
          location: 'Unknown' // Default location as the fetched data does not have location
        })));
        setTotalPages(Math.ceil(response.count / 10)); // Assuming 10 items per page
      } catch (error) {
        console.error('Failed to load opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities(currentPage);
  }, [currentPage]);

  // Exemple de données de partenaires
  const partners: Partner[] = [
    { src: ministryOfForeignAffairsOfBenin, nameFr: "Ministère des Affaires Etrangères du Bénin", nameEn:"Ministry of Foreign Affairs of Benin", nameCh:"贝宁外交部" },
    { src: ministryOfForeignAffairsOfBenin, nameFr: "DBAU: Direction des Bourses et Aides Universitaires", nameEn:"DBAU: Directorate of Scholarships and University Aid", nameCh:"大学奖学金和助学金管理处"},
    { src: ministryOfForeignAffairsOfBenin, nameFr: "Ambassade du Bénin près la Chine", nameEn:"Embassy of Benin near China", nameCh:"贝宁驻华大使馆" },
    { src: confuciusInstitute, nameFr: "Institut Confucius BENIN (UAC)", nameEn:"Confucius Institute BENIN (UAC)", nameCh:"贝宁孔子学院 (阿波美卡拉维大学)" },
    { src: chineseUniversityOfGeosciences, nameFr: "Université chinoise de Géosciences", nameEn:"China University of Geosciences", nameCh:"中国地质大学" },
    { src: uneb, nameFr: "UNEB: Union Nationale des Étudiants du Bénin", nameEn:"UNEB: National Union of Students of Benin", nameCh:"贝宁全国学生联盟" },
    { src: fneb, nameFr: "FNEB: Fédération Nationale des Étudiants du Bénin", nameEn:"FNEB: National Federation of Students of Benin", nameCh:"贝宁全国学生联合会" },
  ];

  // Fonction pour ouvrir le popup avec les détails de l'opportunité
  const openPopup = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    (document.getElementById('opportunity_modal') as HTMLDialogElement)?.showModal();
  };

  // Fonction pour fermer le popup
  const closePopup = () => {
    setSelectedOpportunity(null);
    (document.getElementById('opportunity_modal') as HTMLDialogElement)?.close();
  };

  return (
    <div className='pb-20 min-h-screen pt-[7.5rem]'>
      {/* En-tête de la page */}
      <MiniHero content={t('Opportunitiés')} />
      
      <div className="md:flex px-5">
        <div className='lg:w-3/4 w-full mx-auto md:mr-5'>
          {/* Barre de recherche */}
        <AnimatedElement>
          <div className="flex justify-center mb-6">
            <form className="w-full relative lg:mr-3 lg:pr-2">
              <input
                type="text"
                placeholder={t('Opportunitiés.placeholder')}
                className="w-full p-3 px-5 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {/* Icône de recherche */}
              <button type='submit' className="absolute inset-y-0 right-5 flex items-center pr-5">
                <i className="fas fa-search text-gray-400"></i>
              </button>
            </form>
          </div>
        </AnimatedElement>

          {/* Contenu principal */}
          <div className="flex flex-col lg:flex-row lg:pr-5 mb-10 justify-center">
            {/* Section des opportunités */}
              {loading ? (
                <div className='flex justify-center items-center h-50'>
                  <span className="loading loading-spinner loading-lg mx-auto"></span>
                </div>
              ) : (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                {opportunities.length > 0 ? (
                  opportunities.map(opportunity => (
                    <AnimatedElement key={opportunity.id}>
                      <div 
                        className="card bg-white shadow-lg rounded-lg overflow-hidden mb-6 cursor-pointer"
                        onClick={() => openPopup(opportunity)}
                      >
                        <figure>
                          <img
                            className="w-full h-48 object-cover"
                            src={opportunity.image}
                            alt={opportunity.title}
                          />
                        </figure>
                        <div className="card-body">
                          <h2 
                            className="text-xl sm:text-2xl font-bold mb-2">
                            {opportunity.title}
                          </h2>
                          <p className="text-gray-700 mb-4 text-justify">
                            {opportunity.description.replace(/<\/?[^>]+(>|$)/g, "").length > 100 
                              ? `${opportunity.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100)}…` 
                              : opportunity.description.replace(/<\/?[^>]+(>|$)/g, "")}
                          </p>
                          <p className="text-gray-500">{opportunity.location}</p>
                        </div>
                      </div>
                    </AnimatedElement>
                  ))
                ) : (
                  <AnimatedElement>
                    <p className="text-center text-gray-500"> {t('Opportunitiés.disponible')}</p>
                  </AnimatedElement>
                )}
            </div>
              )}
          </div>
        {!loading && opportunities.length > 0 && (
          <AnimatedElement>
            <div className="flex justify-center mt-4">
              <div className="join shadow">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn ${currentPage === index + 1 ? 'btn-accent' : ''}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedElement>
          )}
        </div>
        {/* Informations sur les partenaires */}
        <aside className="w-full lg:w-1/4 ">
        <AnimatedElement>
          <div className='bg-white shadow-2xl rounded-lg p-6 flex flex-col justify-between'>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{t('Opportunitiés.Partenaires')}</h2>
            <p className="text-gray-700 mb-4">
            {t('Opportunitiés.PartenairesText')}
            </p>
            <ul className="list-style-none">
              {partners.map(partner => (
                <>
                 {lang=="en" && 
                  <li key={partner.nameEn} className="-2 items-center flex">
                    <img src={partner.src} alt={partner.nameEn} className="w-10 h-10 block mr-2" />
                    <p>{partner.nameEn}</p>
                  </li>
                  }
                 {lang=="fr" && 
                  <li key={partner.nameFr} className="-2 items-center flex">
                    <img src={partner.src} alt={partner.nameFr} className="w-10 h-10 block mr-2" />
                    <p>{partner.nameFr}</p>
                  </li>
                  }
                  {lang=="ch" && 
                  <li key={partner.nameCh} className="-2 items-center flex">
                    <img src={partner.src} alt={partner.nameCh} className="w-10 h-10 block mr-2" />
                    <p>{partner.nameCh}</p>
                  </li>
                  }
                  <hr className='my-5' />
                </>
              ))}
            </ul>
          </div>
          {/* Miniature chaîne YouTube */}
          <div className="flex justify-center mt-4">
            <div className="w-full max-w-md px-5">
              <a href="https://www.youtube.com/channel/UCXXXXXXX" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn.pixabay.com/photo/2020/03/19/14/03/youtube-4947565_1280.jpg"
                  alt="Chaîne YouTube"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </a>
            </div>
          </div>
        </AnimatedElement>
        </aside>
      </div>

      {/* Popup avec les détails de l'opportunité */}
      {selectedOpportunity && (
        <dialog id="opportunity_modal" className="modal">
          <div className="modal-box lg:w-[70vw] max-w-4xl max-h-screen overflow-y-auto mx-5" style={{ maxWidth: '90vw' }}>
            <button 
              onClick={closePopup} 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedOpportunity.title}</h2>
            <img
              className="w-full h-48 object-cover rounded-lg mb-4"
              src={selectedOpportunity.image}
              alt={selectedOpportunity.title}
            />
            <p className="text-gray-700 mb-4 text-justify" dangerouslySetInnerHTML={{ __html: selectedOpportunity.description }}></p>
            <p className="text-gray-500 mb-4">{selectedOpportunity.location}</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default OpportunityPage;