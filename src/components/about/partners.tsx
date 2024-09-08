import AnimatedElement from '../../function/AnimatedElement';
import chineseUniversityOfGeosciences from '../../assets/images/partner/partner1.png';
import ministryOfForeignAffairsOfBenin from '../../assets/images/partner/embleme-benin.png';
import uneb from '../../assets/images/partner/partner3.png';
import fneb from '../../assets/images/partner/partner4.png';
import confuciusInstitute from '../../assets/images/partner/partenaire5.png';
import { useTranslation } from 'react-i18next';

const Partners = () => {
  const { t, i18n } = useTranslation(); // Hook pour gérer la traduction

  const partners = [
    {
      src: ministryOfForeignAffairsOfBenin,
      nameFr: "Ministère des Affaires Etrangères du Bénin",
      nameEn: "Ministry of Foreign Affairs of Benin",
      nameCh: "贝宁外交部",
      descriptionFr: "Le Ministère des Affaires Etrangères du Bénin est chargé de la gestion des relations internationales et de la diplomatie du Bénin.",
      descriptionEn: "The Ministry of Foreign Affairs of Benin is responsible for managing the international relations and diplomacy of Benin.",
      descriptionCh: "贝宁外交部负责管理贝宁的国际关系和外交事务。"
    },
    {
      src: ministryOfForeignAffairsOfBenin,
      nameFr: "DBAU: Direction des Bourses et Aides Universitaires",
      nameEn: "DBAU: Directorate of Scholarships and University Aid",
      nameCh: "DBAU：奖学金和大学援助司",
      descriptionFr: "La Direction des Bourses et Aides Universitaires (DBAU) est responsable de la gestion et de l'attribution des bourses et aides financières aux étudiants béninois.",
      descriptionEn: "The Directorate of Scholarships and University Aid (DBAU) is responsible for managing scholarships and financial aid for Beninese students.",
      descriptionCh: "DBAU（奖学金和大学援助司）负责管理贝宁学生的奖学金和经济援助。"
    },
    {
      src: ministryOfForeignAffairsOfBenin,
      nameFr: "Ambassade du Bénin près la Chine",
      nameEn: "Embassy of Benin in China",
      nameCh: "贝宁驻中国大使馆",
      descriptionFr: "L'Ambassade du Bénin en Chine représente les intérêts du Bénin et offre des services consulaires aux citoyens béninois résidant en Chine.",
      descriptionEn: "The Embassy of Benin in China represents Beninese interests and provides consular services to Beninese citizens residing in China.",
      descriptionCh: "贝宁驻中国大使馆代表贝宁的利益，并为居住在中国的贝宁公民提供领事服务。"
    },
    {
      src: confuciusInstitute,
      nameFr: "Institut Confucius BENIN (UAC)",
      nameEn: "Confucius Institute BENIN (UAC)",
      nameCh: "贝宁孔子学院 (阿博美加拉维大学)",
      descriptionFr: "L'Institut Confucius BENIN (UAC) est dédié à la promotion de la langue et de la culture chinoises au Bénin.",
      descriptionEn: "The Confucius Institute BENIN (UAC) is dedicated to promoting Chinese language and culture in Benin.",
      descriptionCh: "贝宁孔子学院（阿博美加拉维大学）致力于在贝宁推广中文语言和文化。"
    },
    {
      src: chineseUniversityOfGeosciences,
      nameFr: "Université chinoise de Géosciences",
      nameEn: "China University of Geosciences",
      nameCh: "中国地质大学",
      descriptionFr: "L'Université chinoise de Géosciences est une institution de premier plan en Chine, spécialisée dans les sciences de la terre et les ressources naturelles.",
      descriptionEn: "The China University of Geosciences is a leading institution in China, specializing in earth sciences and natural resources.",
      descriptionCh: "中国地质大学是一所中国顶尖的机构，专门研究地球科学和自然资源。"
    },
    {
      src: uneb,
      nameFr: "UNEB: Union Nationale des Étudiants du Bénin",
      nameEn: "UNEB: National Union of Students of Benin",
      nameCh: "贝宁全国学生联盟 (UNEB)",
      descriptionFr: "L'Union Nationale des Étudiants du Bénin (UNEB) est une association qui promeut la solidarité et l'entraide entre les étudiants béninois.",
      descriptionEn: "The National Union of Students of Benin (UNEB) is an association that promotes solidarity and mutual aid among Beninese students.",
      descriptionCh: "贝宁全国学生联盟（UNEB）是一个促进贝宁学生之间团结和互助的协会。"
    },
    {
      src: fneb,
      nameFr: "FNEB: Fédération Nationale des Étudiants du Bénin",
      nameEn: "FNEB: National Federation of Students of Benin",
      nameCh: "贝宁全国学生联合会 (FNEB)",
      descriptionFr: "La Fédération Nationale des Étudiants du Bénin (FNEB) est une organisation qui défend les droits et intérêts des étudiants béninois.",
      descriptionEn: "The National Federation of Students of Benin (FNEB) is an organization that defends the rights and interests of Beninese students.",
      descriptionCh: "贝宁全国学生联合会（FNEB）是一个维护贝宁学生权利和利益的组织。"
    }
  ];
  
  return (
    <section className="">
      <h2 className="text-3xl font-bold text-center my-5">{t('Nos Partenaires')}</h2>
      <div className="mx-auto">
        {partners.map((partner, index) => (
          <AnimatedElement key={index}>
            <div className={`flex flex-col md:flex-row items-center px-10 lg:px-40 ${index % 2 === 0 ? 'md:flex-row-reverse md:justify-end' : ''} ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
              <div className={`w-full md:w-1/2 flex justify-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} p-4`}>
                <img src={partner.src} alt={i18n.language === 'fr' ? partner.nameFr : i18n.language === 'ch' ? partner.nameCh : partner.nameEn} className="w-auto h-24 object-contain" />
              </div>
              <div className="w-full md:w-1/2 p-4">
                <div className={`mt-2 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="font-bold">
                    {i18n.language === 'fr' ? partner.nameFr : i18n.language === 'ch' ? partner.nameCh : partner.nameEn}
                  </p>
                  <p>
                    {i18n.language === 'fr' ? partner.descriptionFr : i18n.language === 'ch' ? partner.descriptionCh : partner.descriptionEn}
                  </p>
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
