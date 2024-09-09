import React from 'react';
import { NavLink } from 'react-router-dom';
import famesLogo from '../assets/images/logos/fames-logo.png';
import { Instagram, Facebook, Linkedin, Youtube, MapPin, Building, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TranslationDropdown from './TranslationDropdown'; // Import the new component
import PreFooterCard from './preFooter';
import AnimatedElement from '../function/AnimatedElement';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AnimatedElement>
      <PreFooterCard />
      <footer className="bg-gray-800 text-white py-6 pt-60 -z-1">
        <div className="container lg:px-12 mx-auto px-4">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <h6 className="font-bold text-lg mb-3">{t('footer.usefulLinks')}</h6>
              <ul>
                <li><NavLink to="/about-us#members" className="link hover:text-gray-300">{t('footer.befMembers')}</NavLink></li>
                <li><NavLink to="/opportunities" className="link hover:text-gray-300">{t('footer.opportunities')}</NavLink></li>
                <li><NavLink to="/news" className="link hover:text-gray-300">{t('footer.new')}</NavLink></li>
                <li><NavLink to="/about-us" className="link hover:text-gray-300">{t('footer.about')}</NavLink></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-lg mb-3">{t('footer.contacts')}</h6>
              <ul>
                <li><MapPin size={20} className="inline-block mr-2" /><span className="link hover:text-gray-300">Chongqing - CHINA</span></li>
                <li><Building size={20} className="inline-block mr-2" /><span className="link hover:text-gray-300">FAMES BENIN China</span></li>
                <li><Mail size={20} className="inline-block mr-2" /><a href="mailto:contact@famesbenin.com" className="link hover:text-gray-300">contact@famesbenin.com</a></li>
                <li><Phone size={20} className="inline-block mr-2" /><a href="tel:+8613841480424" className="link hover:text-gray-300">+86 1384 1480 424</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-lg mb-3">{t('footer.faqsLibrary')}</h6>
              <ul>
                <li><NavLink to="/consular-card" className="link hover:text-gray-300">{t('footer.consularCard')}</NavLink></li>
                <li><NavLink to="/passport-renewal" className="link hover:text-gray-300">{t('footer.passportRenewal')}</NavLink></li>
                <li><NavLink to="/scientific-articles" className="link hover:text-gray-300">{t('footer.scientificArticles')}</NavLink></li>
              </ul>
            </div>
            <div className="flex justify-center">
            <TranslationDropdown isDrop={false} bgColor="bg-gray-500 bg-opacity-20" />            </div>
          </div>
          <hr className="border-gray-700 mt-6" />
          <div className="flex justify-between items-center mt-6">
            <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src={famesLogo} alt="FAMES Logo" className="h-20" />
            </NavLink>
            <div className="text-sm">
              <p>FAMES BENIN <span className="text-lg">©</span>  Copyright 2024</p>
            </div>
            <div>
              <ul className="flex space-x-4">
                <li>
                  <a href="https://www.instagram.com/famesbenin/" target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white">
                    <Instagram size={24} className="text-pink-500 hover:text-pink-600 transition-colors duration-300" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/famesbenin" target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white">
                    <Facebook size={24} className="text-blue-500 hover:text-blue-600 transition-colors duration-300" />
                  </a>
                </li>
                <li>
                  <a href="https://cn.linkedin.com/company/famesbeninchine" target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white">
                    <Linkedin size={24} className="text-blue-700 hover:text-blue-800 transition-colors duration-300" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCR0dhSbalyJ5iAhSz8oPPbA" target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white">
                    <Youtube size={24} className="text-red-500 hover:text-red-600 transition-colors duration-300" />
                  </a>
                </li>
                <li>
                  <a href="#" target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white">
                    <i className="text-green-500 hover:text-green-600 transition-colors duration-300 fa-brands fa-weixin" style={{ fontSize: '24px' }}></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </AnimatedElement>
  );
};

export default Footer;