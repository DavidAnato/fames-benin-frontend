import { NavLink } from 'react-router-dom';
import famesLogo from '../assets/images/logos/fames-logo.png';
import { useEffect } from 'react';


const NavBar = () => {
    useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar-scroll-anime');
      if (navbar) {
        if (window.scrollY >= 700) {
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

  return (
    <div className="w-auto flex sticky top-0 z-50 nav-enter-anime">
      <div className="navbar navbar-scroll-anime m-5 bg-gray-100 rounded-full shadow-2xl w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
              <li><NavLink to="/news" className={({ isActive }) => isActive ? 'active-link' : ''}>News</NavLink></li>
              <li><NavLink to="/opportunities" className={({ isActive }) => isActive ? 'active-link' : ''}>Opportunities</NavLink></li>
              <li><NavLink to="/gallery" className={({ isActive }) => isActive ? 'active-link' : ''}>Gallery</NavLink></li>
              <li><NavLink to="/about-us" className={({ isActive }) => isActive ? 'active-link' : ''}>About Us</NavLink></li>
            </ul>
          </div>
          <NavLink to="/" className="text-xl font-extrabold flex items-center text-red-700 ml-2">
            <img src={famesLogo} alt="FAMES Logo" className="h-10 mr-2" />
            FAMES BENIN
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''}>News</NavLink></li>
            <li><NavLink to="/opportunities" className={({ isActive }) => isActive ? 'active' : ''}>Opportunities</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''}>Gallery</NavLink></li>
            <li><NavLink to="/about-us" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>
                  Profile
                  <span className="badge">New</span>
                </NavLink>
              </li>
              <li><NavLink to="/settings" className={({ isActive }) => isActive ? 'active-link' : ''}>Settings</NavLink></li>
              <li><NavLink to="/logout" className={({ isActive }) => isActive ? 'active-link' : ''}>Logout</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
