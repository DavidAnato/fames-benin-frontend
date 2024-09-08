import { Link, NavLink } from 'react-router-dom';
import famesLogo from '../assets/images/logos/fames-logo.png';
import { useEffect } from 'react';
import useUserProfile from '../hooks/user';
import useAuthStore from '../store/authStore';
import { useTranslation } from 'react-i18next';
import TranslationDropdown from './TranslationDropdown'; // Import the new component
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { t } = useTranslation();
  const { user } = useUserProfile();
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar-scroll-anime');
      if (navbar) {
        if (window.scrollY >= 200) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');; // Redirect to login page after logout
  };

  return (
    <div className="w-auto flex sticky top-0 z-50 nav-enter-anime">
      <div className="navbar navbar-scroll-anime m-5 bg-gray-100 rounded-full shadow-lg w-full px-6">
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><NavLink to="/" className={({ isActive }) => `text-xl mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.home')}</NavLink></li>
              <li><NavLink to="/news" className={({ isActive }) => `text-xl mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.news')}</NavLink></li>
              <li><NavLink to="/opportunities" className={({ isActive }) => `text-xl mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.opportunities')}</NavLink></li>
              <li><NavLink to="/gallery" className={({ isActive }) => `text-xl mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.gallery')}</NavLink></li>
              <li><NavLink to="/about-us" className={({ isActive }) => `text-xl mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.aboutUs')}</NavLink></li>
            </ul>
          </div>
          <NavLink to="/" className="text-xl font-extrabold items-center text-red-700 ml-2 hidden lg:flex">
            <img src={famesLogo} alt="FAMES Logo" className="h-10 mr-2" />
            {t('navbar.logo')}
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/" className={({ isActive }) => `text-[17px] mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.home')}</NavLink></li>
            <li><NavLink to="/news" className={({ isActive }) => `text-[17px] mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.news')}</NavLink></li>
            <li><NavLink to="/opportunities" className={({ isActive }) => `text-[17px] mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.opportunities')}</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => `text-[17px] mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.gallery')}</NavLink></li>
            <li><NavLink to="/about-us" className={({ isActive }) => `text-[17px] mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>{t('navbar.aboutUs')}</NavLink></li>
          </ul>
        </div>
        <div className="navbar-end flex items-center justify-end">
          {user ? (
            <>
              <Link to="/profile" className="hidden lg:inline font-bold capitalize mr-2">{user.first_name}</Link>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-circle bg-gray-200">
                  <div className="w-10 rounded-full flex items-center justify-center">
                    {user.profile_picture || user.picture_url ? (
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        alt={t('navbar.userAvatarAlt')}
                        src={user.profile_picture || user.picture_url}
                      />
                    ) : (
                      <i className="fa fa-user text-2xl" aria-hidden="true"></i>
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow"
                >
                  <li>
                    <NavLink to="/profile" className={({ isActive }) => `mx-1 rounded-xl hover:bg-gray-300 hover:rounded-full transition-all duration-500 ${isActive ? 'active' : ''}`}>
                      <i className="fas fa-user text-xl"></i>
                      {t('navbar.profile')}
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="mx-1 rounded-xl hover:bg-red-300 hover:rounded-full transition-all duration-500">
                      <i className="fas fa-sign-out-alt text-xl"></i>
                      {t('navbar.logout')}
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <NavLink to="/login" className="btn btn-ghost font-bold shadow rounded-full lg:btn-sm btn-xs">{t('navbar.login')}</NavLink>
              <NavLink to="/register" className="btn btn-accent font-bold shadow shadow-emerald-500/50 rounded-full lg:btn-sm btn-xs">{t('navbar.signup')}</NavLink>
            </div>
          )}
          <TranslationDropdown isDrop bgColor="bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;