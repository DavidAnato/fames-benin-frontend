import { NavLink } from 'react-router-dom';
import famesLogo from '../assets/images/logos/fames-logo.png';
import { Instagram, Facebook, Linkedin, Youtube, MapPin, Building, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container lg:px-12 mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-4">
          <div >
            <h6 className="font-bold text-lg mb-3">Useful links</h6>
            <ul>
              <li><NavLink to="/members" className="link hover:text-gray-300">BEF members</NavLink></li>
              <li><NavLink to="/opportunities" className="link hover:text-gray-300">Opportunities</NavLink></li>
              <li><NavLink to="/success-story" className="link hover:text-gray-300">Success story</NavLink></li>
              <li><NavLink to="/library" className="link hover:text-gray-300">Resources</NavLink></li>
            </ul>
          </div>
          <div >
            <h6 className="font-bold text-lg mb-3">Contacts</h6>
            <ul>
              <li><MapPin size={20} className="inline-block mr-2" /><span className="link hover:text-gray-300 ">Chongqing - CHINA</span></li>
              <li><Building size={20} className="inline-block mr-2" /><span className="link hover:text-gray-300 ">FAMES BENIN China</span></li>
              <li><Mail size={20} className="inline-block mr-2" /><a href="mailto:contact@famesbenin.com" className="link hover:text-gray-300">contact@famesbenin.com</a></li>
              <li><Phone size={20} className="inline-block mr-2" /><a href="tel:+8613841480424" className="link hover:text-gray-300">+86 1384 1480 424</a></li>
            </ul>
          </div>
          <div >
            <h6 className="font-bold text-lg mb-3">FAQs / Library</h6>
            <ul>
              <li><NavLink to="/consular-card" className="link hover:text-gray-300">Documents required to obtain a consular card</NavLink></li>
              <li><NavLink to="/passport-renewal" className="link hover:text-gray-300">Documents required for passport renewal</NavLink></li>
              <li><NavLink to="/scientific-articles" className="link hover:text-gray-300">Scientific article published by students in China</NavLink></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 mt-6" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <img src={famesLogo} alt="FAMES Logo" className="h-20" />
          </div>
          <div className="text-sm">
            <p>FAMES BENIN Copyright 2024</p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.instagram.com/famesbenin/" target='_blank' className="text-gray-300 hover:text-white">
                  <Instagram size={24} className="text-pink-500 hover:text-pink-600 transition-colors duration-300 animate-gradient" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/famesbenin" target='_blank' className="text-gray-300 hover:text-white">
                  <Facebook size={24} className="text-blue-500 hover:text-blue-600 transition-colors duration-300 animate-gradient" />
                </a>
              </li>
              <li>
                <a href="https://cn.linkedin.com/company/famesbeninchine" target='_blank' className="text-gray-300 hover:text-white">
                  <Linkedin size={24} className="text-blue-700 hover:text-blue-800 transition-colors duration-300 animate-gradient" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCR0dhSbalyJ5iAhSz8oPPbA" target='_blank' className="text-gray-300 hover:text-white">
                  <Youtube size={24} className="text-red-500 hover:text-red-600 transition-colors duration-300 animate-gradient" />
                </a>
              </li>
              <li>
                <a href="#" target='_blank' className="text-gray-300 hover:text-white">
                  <i className="text-green-500 hover:text-green-600 transition-colors duration-300 fa-brands fa-weixin animate-gradient" style={{ fontSize: '24px' }}></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;