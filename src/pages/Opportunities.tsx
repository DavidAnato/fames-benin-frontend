import React, { useState, useEffect } from 'react';
import { fetchOpportunities } from '../fetch/opportunityFetch';
import AnimatedElement from '../function/AnimatedElement';
import chineseUniversityOfGeosciences from '../assets/images/partner/partner1.png';
import ministryOfForeignAffairsOfBenin from '../assets/images/partner/embleme-benin.png';
import uneb from '../assets/images/partner/partner3.png';
import fneb from '../assets/images/partner/partner4.png';
import confuciusInstitute from '../assets/images/partner/partenaire5.png';
import MiniHero from '../components/miniHero';

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
  name: string;
  description: string;
}

const OpportunityPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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
    { src: ministryOfForeignAffairsOfBenin, name: "Ministère des Affaires Etrangères du Bénin", description: "Le Ministère des Affaires Etrangères du Bénin est chargé de la gestion des relations internationales et de la diplomatie du Bénin." },
    { src: ministryOfForeignAffairsOfBenin, name: "DBAU: Direction des Bourses et Aides Universitaires", description: "La Direction des Bourses et Aides Universitaires (DBAU) est responsable de la gestion et de l'attribution des bourses et aides financières aux étudiants béninois." },
    { src: ministryOfForeignAffairsOfBenin, name: "Ambassade du Bénin près la Chine", description: "L'Ambassade du Bénin en Chine représente les intérêts du Bénin et offre des services consulaires aux citoyens béninois résidant en Chine." },
    { src: confuciusInstitute, name: "Institut Confucius BENIN (UAC)", description: "L'Institut Confucius BENIN (UAC) est dédié à la promotion de la langue et de la culture chinoises au Bénin." },
    { src: chineseUniversityOfGeosciences, name: "Université chinoise de Géosciences", description: "L'Université chinoise de Géosciences est une institution de premier plan en Chine, spécialisée dans les sciences de la terre et les ressources naturelles." },
    { src: uneb, name: "UNEB: Union Nationale des Étudiants du Bénin", description: "L'Union Nationale des Étudiants du Bénin (UNEB) est une association qui promeut la solidarité et l'entraide entre les étudiants béninois." },
    { src: fneb, name: "FNEB: Fédération Nationale des Étudiants du Bénin", description: "La Fédération Nationale des Étudiants du Bénin (FNEB) est une organisation qui défend les droits et intérêts des étudiants béninois." },
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
      <MiniHero content="Opportunities" />
      
      <div className="md:flex px-5">
        <div className='lg:w-3/4 w-full mx-auto md:mr-5'>
          {/* Barre de recherche */}
        <AnimatedElement>
          <div className="flex justify-center mb-6">
            <form className="w-full relative lg:mr-3 lg:pr-2">
              <input
                type="text"
                placeholder="Rechercher des opportunités..."
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
                    <p className="text-center text-gray-500">Aucune opportunité disponible pour le moment.</p>
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
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Nos Partenaires</h2>
            <p className="text-gray-700 mb-4">
              Découvrez les informations sur nos partenaires et comment ils contribuent à nos projets.
            </p>
            <ul className="list-style-none">
              {partners.map(partner => (
                <>
                  <li key={partner.name} className="-2 items-center flex">
                    <img src={partner.src} alt={partner.name} className="w-10 h-10 block mr-2" />
                    <p>{partner.name}</p>
                  </li>
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