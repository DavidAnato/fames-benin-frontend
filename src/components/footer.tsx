import { NavLink } from 'react-router-dom';
import famesLogo from '../assets/images/logos/fames-logo.png';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container lg:px-12 mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-4">
          <div className='w-'>
            <h6 className="font-bold text-lg mb-3">Services</h6>
            <ul>
              <li><NavLink to="/jobs" className="link hover:text-gray-300">Job Opportunities</NavLink></li>
              <li><NavLink to="/partners" className="link hover:text-gray-300">Partnership Opportunities</NavLink></li>
            </ul>
          </div>
          <div className='w-'>
            <h6 className="font-bold text-lg mb-3">Links</h6>
            <ul>
              <li><NavLink to="/home" className="link hover:text-gray-300">Home</NavLink></li>
              <li><NavLink to="/news" className="link hover:text-gray-300">News</NavLink></li>
              <li><NavLink to="/gallery" className="link hover:text-gray-300">Gallery</NavLink></li>
            </ul>
          </div>
          <div className='w-'>
            <h6 className="font-bold text-lg mb-3">Legal</h6>
            <ul>
              <li><NavLink to="/terms" className="link hover:text-gray-300">Terms of Use</NavLink></li>
              <li><NavLink to="/privacy" className="link hover:text-gray-300">Privacy Policy</NavLink></li>
              <li><NavLink to="/cookies" className="link hover:text-gray-300">Cookie Policy</NavLink></li>
            </ul>
          </div>
          <div className='w-'>
            <h6 className="font-bold text-lg mb-3">Contact</h6>
            <ul>
              <li><NavLink to="/contact" className="link hover:text-gray-300">Contact Us</NavLink></li>
              <li><NavLink to="/about-us" className="link hover:text-gray-300">About Us</NavLink></li>
              <li><NavLink to="/press-kit" className="link hover:text-gray-300">Press Kit</NavLink></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 mt-6" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <img src={famesLogo} alt="FAMES Logo" className="h-20" />
          </div>
          <div className="text-sm">
            <p>FAMES BENIN</p>
            <p>Providing reliable tech since 1992</p>
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

// # Logs
// logs
// *.log
// npm-debug.log*
// yarn-debug.log*
// yarn-error.log*
// pnpm-debug.log*
// lerna-debug.log*

// node_modules
// dist
// dist-ssr
// *.local

// # Editor directories and files
// .vscode/*
// !.vscode/extensions.json
// .idea
// .DS_Store
// *.suo
// *.ntvs*
// *.njsproj
// *.sln
// *.sw?
