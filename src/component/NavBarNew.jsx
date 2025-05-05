import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const NavBarNew = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenu(prev => !prev);

  const menuLinks = [
    { to: 'coworking', label: 'Vision' },
    { to: 'mentors', label: 'Facilities' },
    { to: 'work', label: 'Work with Us' },
    { to: 'contact', label: 'Contact Us' }
  ];

  const staticLinks = [
    { to: '/about-us', label: 'About Us' },
    { to: '/Events', label: 'Events' }
  ];

  return (
    <div className={`container ${sticky ? "dark-nav" : ""}`}>
      <div className={`transition-shadow duration-300 ${sticky ? "bg-[#3f1063] shadow-lg" : "bg-[#3f1063]"}`}>
        <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 translate-y-0">
          <nav className={`flex items-center justify-between h-16 p-6 lg:px-8 ${sticky ? "bg-[#ed71c4]" : "bg-[#ed71c4]"}`}>
            <div className="flex lg:flex-1">
              <RouterLink onClick={() => scroll.scrollToTop()} to="/" className="-m-1.5 p-1.5 cursor-pointer">
                <img className="h-12 w-auto rounded-full" src="/src/assets/udymai.png" alt="Company Logo" />
              </RouterLink>
            </div>

            <div className="hidden lg:flex lg:gap-x-12">
              {menuLinks.map(link => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="text-sm font-semibold leading-6 text-white cursor-pointer hover:text-gray-200"
                >
                  <RouterLink to="/">{link.label}</RouterLink>
                </ScrollLink>
              ))}
              {staticLinks.map(link => (
                <RouterLink
                  key={link.to}
                  to={link.to}
                  className="text-sm font-semibold leading-6 text-white hover:text-gray-200"
                >
                  {link.label}
                </RouterLink>
              ))}
            </div>

            <button onClick={toggleMenu} className="lg:hidden flex items-center text-white">
              {mobileMenu ? "Close" : "Menu"}
            </button>
          </nav>

          {mobileMenu && (
            <div className="flex flex-col lg:hidden p-4 bg-white shadow-md">
              {menuLinks.map(link => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="text-sm font-semibold leading-6 text-gray-700 py-2 hover:text-gray-500"
                  onClick={toggleMenu}
                >
                  {link.label}
                </ScrollLink>
              ))}
              {staticLinks.map(link => (
                <RouterLink
                  key={link.to}
                  to={link.to}
                  className="text-sm font-semibold leading-6 text-gray-700 py-2 hover:text-gray-500"
                >
                  {link.label}
                </RouterLink>
              ))}
            </div>
          )}
        </header>
      </div>
    </div>
  );
};

export default NavBarNew;
