// import { useTranslation } from 'react-i18next';
import famesLogo from '../../assets/images/logos/fames-logo.png';

const Def = () => {
//   const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  return (
    <section className="py-8">
      <div className="px-10 justify-center flex flex-col md:flex-row items-center mx-auto">
        <div className="w-full md:w-1/3">
          <img src={famesLogo} alt="FAMES Logo" className="mb-8 md:mb-0 mx-auto md:ml-0" />
        </div>
        <div className="w-full md:w-3/3 md:pl-8">
          <p className="text-lg leading-relaxed text-justify">
            <strong>FAMES BENIN</strong>, officiellement connue sous le nom de <strong><em>Fédération des Étudiants et Stagiaires Béninois en Chine</em></strong>, est une organisation à but non lucratif, non politique et laïque, fondée en <strong>2010</strong>. Depuis sa création, elle opère sur l'ensemble du territoire chinois, offrant un soutien inestimable aux étudiants et stagiaires béninois résidant en Chine. Sa mission principale est de promouvoir des solutions de développement continu, en s'inscrivant dans le cadre de la coopération sino-béninoise. <div className='mb-2'/>
            Sous la direction de <strong>Mlle Koudenoukpo Dossi Isbath</strong>, qui occupe le poste de présidente, et avec l'appui de <strong>Mr Segbo Silas Fidèle Gbèwèdo</strong>, le secrétaire général, FAMES BENIN s'engage à créer un environnement propice à l'épanouissement personnel et académique de ses membres. L'organisation encourage la solidarité, facilite l'intégration culturelle, et promeut des initiatives de coopération entre le Bénin et la Chine. En tant que plateforme de dialogue et de collaboration, FAMES BENIN joue un rôle essentiel dans le renforcement des liens entre les deux nations, tout en soutenant les ambitions académiques et professionnelles des Béninois en Chine.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Def;
