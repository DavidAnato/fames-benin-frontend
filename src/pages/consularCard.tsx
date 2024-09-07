import React, { useEffect } from 'react';
import famesLogo from '../assets/images/logos/fames-logo.png';
import ambassade from '../assets/images/logos/ambassade .png';
import MiniHero from '../components/miniHero';
import AnimatedElement from '../function/AnimatedElement';
import { useTranslation } from 'react-i18next';


const ConsularCardRequest: React.FC = () => {
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
    const { t } = useTranslation(); // Hook pour gérer la traduction

  return (
    <div className="min-h-screen pt-[7.5rem]">
      {/* Header Section */}
      <MiniHero content={t("consularCard")}/>

      {/* Explanation Section */}
      <AnimatedElement>
      <div className="container mx-auto mt-16 px-5">
        <h2 className="text-xl font-bold mb-4">{t('consulat1')}</h2>
        <p className="mb-4 text-justify">
        {t('consulat2')}
        </p>
        <p className="text-justify">
        {t('consulat3')}
        </p>
      </div>
      </AnimatedElement>
      {/* Requirements List and Image Section */}
      <AnimatedElement>
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row md:space-x-6 items-center">
          <div className="w-full md:w-3/5">
            <h2 className="text-xl font-bold mb-4">{t("consulatList")}</h2>
            <ul className="list-decimal list-inside space-y-2">
              {/* List Items */}
              <li>{t("consulatList1")}</li>
              <li>{t("consulatList2")}</li>
              <li>{t("consulatList3")}</li>
              <li>{t("consulatList4")}</li>
              <li>{t("consulatList5")}</li>
              <li>{t("consulatList6")}</li>
              <div dangerouslySetInnerHTML={{ __html: t('consulatList7') }}></div>
              {/* <li dangerouslySetInnerHTML={{ __html: t('consulatList7') }}
              >{t("consulatList7")}
                Une photo numérique format JPG fonds blanc à envoyer à
                <a href="mailto:beninembassy.cn@yahoo.com" className="text-blue-500"> beninembassy.cn@yahoo.com</a> après avoir envoyé les dossiers. Mentionner son nom sous la photo.
              </li> */}
              <li>{t("consulatList8")}
              </li>
            </ul>
          </div>
          {/* Image */}
          <img src={famesLogo} alt="FAMES Logo" className="hidden lg:block lg:w-2/5 mx-auto mt-6 md:mt-0" />
        </div>

        {/* Important Notes Section */}
        <div className="mt-6 p-4 bg-gray-100 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">NB :</h2>
          <p className="mb-2">
          {t("consulatNB1")}
          </p>
          <p className="mb-2">
          {t("consulatNB2")}
          </p>
          <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('consulatNB3') }}>
          </p>
          <p className="font-semibold">
            {t("consulatNB4")}
          </p>
        </div>
        <hr className='mt-20'/>
      </div>
      </AnimatedElement>
      {/* Information Form Section */}
      <AnimatedElement>
      <h1 className='text-center text-2xl md:text-3xl font-extrabold my-8'>
        {t("consulatInfo")}
      </h1>
      <div className="w-full md:w-11/12 lg:w-3/4 xl:w-2/3 mx-auto p-8 bg-slate-50 shadow-2xl rounded-md my-4">
        {/* Header with Logo and Contact Information */}
        <div className="md:flex items-center justify-between mb-8">
          <img src={ambassade} alt="Ambassade Logo" className="w-64 mx-auto md:mx-0" />
          <div className="text-right text-sm mt-2 md:mt-0">
            <p>38, Guang Hua Lu, 100600</p>
            <p>Tel: 008614-676524234 | Fax: 008614-676524233</p>
            <p>Email: <a href="mailto:beninembassy.cn@yahoo.com" className="text-blue-500">beninembassy.cn@yahoo.com</a></p>
          </div>
        </div>

        {/* Information Fields */}
        <h1 className="text-2xl font-bold text-center mb-4">Fiche de Renseignements<br/>Carte consulaire</h1>
        <div className="space-y-4">
          <p className="flex justify-between"><span>Nom et prénoms :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Date et lieu de naissance :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Nom du père :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Nom de la mère :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Taille :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Couleur des yeux :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Couleur des cheveux :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Signes particuliers :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Profession :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Date d’entrée en Chine :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Adresse en Chine :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Adresse e-mail :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span><span>Tél:</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p>Personne à contacter en cas d’urgence :</p>
          <p className="flex justify-between"><span>Au Bénin :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span><span>Tél:</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>En Chine :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span><span>Tél:</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
          <p className="flex justify-between"><span>Références du passeport :</span><span className="flex-grow border-b border-dotted border-black mx-2"></span></p>
        </div>

        {/* Signature Section */}
        <div className="mt-8 text-end">
          <p>....................(Ville), le ....................</p>
          <p className="mt-4">Signature, Nom et Prénoms</p>
        </div>
      </div>
      </AnimatedElement>
    </div>
  );
}

export default ConsularCardRequest;

