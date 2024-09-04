import AnimatedElement from '../../function/AnimatedElement';
import chineseUniversityOfGeosciences from '../../assets/images/partner/partner1.png';
import ministryOfForeignAffairsOfBenin from '../../assets/images/partner/embleme-benin.png';
import uneb from '../../assets/images/partner/partner3.png';
import fneb from '../../assets/images/partner/partner4.png';
import confuciusInstitute from '../../assets/images/partner/partenaire5.png';

const Partners = () => {

  const partners = [
      { src: ministryOfForeignAffairsOfBenin, name: "Ministère des Affaires Etrangères du Bénin", description: "Le Ministère des Affaires Etrangères du Bénin est chargé de la gestion des relations internationales et de la diplomatie du Bénin." },
      { src: ministryOfForeignAffairsOfBenin, name: "DBAU: Direction des Bourses et Aides Universitaires", description: "La Direction des Bourses et Aides Universitaires (DBAU) est responsable de la gestion et de l'attribution des bourses et aides financières aux étudiants béninois." },
      { src: ministryOfForeignAffairsOfBenin, name: "Ambassade du Bénin près la Chine", description: "L\'Ambassade du Bénin en Chine représente les intérêts du Bénin et offre des services consulaires aux citoyens béninois résidant en Chine." },
      { src: confuciusInstitute, name: "Institut Confucius BENIN (UAC)", description: "L\'Institut Confucius BENIN (UAC) est dédié à la promotion de la langue et de la culture chinoises au Bénin." },
      { src: chineseUniversityOfGeosciences, name: "Université chinoise de Géosciences", description: "L\'Université chinoise de Géosciences est une institution de premier plan en Chine, spécialisée dans les sciences de la terre et les ressources naturelles." },
      { src: uneb, name: "UNEB: Union Nationale des Étudiants du Bénin", description: "L\'Union Nationale des Étudiants du Bénin (UNEB) est une association qui promeut la solidarité et l\'entraide entre les étudiants béninois." },
      { src: fneb, name: "FNEB: Fédération Nationale des Étudiants du Bénin", description: "La Fédération Nationale des Étudiants du Bénin (FNEB) est une organisation qui défend les droits et intérêts des étudiants béninois." },
  ];

  return (
    <section className="">
        <h2 className="text-3xl font-bold text-center my-5">Nos Partenaires</h2>
      <div className="mx-auto">
        {partners.map((partner, index) => (
          <AnimatedElement key={index}>
            <div className={`flex flex-col md:flex-row items-center px-10 lg:px-40 ${index % 2 === 0 ? 'md:flex-row-reverse md:justify-end' : ''} ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
              <div className={`w-full md:w-1/2 flex justify-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} p-4`}>
                <img src={partner.src} alt={partner.name} className="w-auto h-24 object-contain" />
              </div>
              <div className="w-full md:w-1/2 p-4">
                <div className={`mt-2 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="font-bold">{partner.name}</p>
                  <p>{partner.description}</p>
                </div>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
}

export default Partners;

