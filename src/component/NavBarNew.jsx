import React, { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { FiChevronDown } from 'react-icons/fi';

const NavBarNew = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
      if (window.scrollY > lastScrollY) setVisible(false);
      else setVisible(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setMobileMenu(prev => !prev);

  const menuLinks = [
    { to: 'startups', label: 'Startups List' },
    { to: 'coworking', label: 'Vision' },
    { to: 'mentors', label: 'Facilities' },
    { to: 'work', label: 'Work with Us' },
    { to: 'contact', label: 'Contact Us' }
  ];

  const staticLinks = [
    { to: '/about-us', label: 'About Us' },
    { to: '/contact-us', label: 'Startup Team' },
    { to: '/Events', label: 'Events' }
  ];

  const dropdownLinks = [
    { type: 'external', href: 'https://iciitp.com/zerolab/', label: 'Zero Lab' },
    { type: 'scroll', to: 'bfsc-image', label: 'BSFT' },
    { type: 'scroll', to: 'psc-image', label: 'PSC' },
    { type: 'scroll', to: 'smic-image', label: 'SMIC' },
    { type: 'scroll', to: 'ssu-image', label: 'SSU' },
    { type: 'internal', to: '/StartupCell', label: 'Startup Cell' },
    { type: 'internal', to: '/IncubationCell', label: 'Incubation Cell' },
    { type: 'internal', to: '/Mentors', label: 'Mentors' },
    { type: 'divider' },
    { type: 'external', href: 'https://bhub.org.in/', label: 'B-Hub' },
    { type: 'external', href: 'https://startup.bihar.gov.in/static/media/Acceleration%20Program.bf71b2d74535485bfc5f.pdf', label: 'Acceleration Program' },
    { type: 'external', href: 'https://startup.bihar.gov.in/static/media/SOP%20for%20Early%20Stage%20Funding-%20Revised.51d15bea123ee299bd5f.pdf', label: 'Early Stage Funding' },
    { type: 'external', href: 'https://startup.bihar.gov.in/static/media/Exit%20Policy.929b6eb912040f50f1f7.pdf', label: 'Exit Policy' },
    { type: 'external', href: 'https://startup.bihar.gov.in/static/media/Intellectual%20Property%20Rights.fb6778157b1d80402ab0.pdf', label: 'Intellectual Property Rights' },
    { type: 'external', href: 'https://startup.bihar.gov.in/static/media/Matching%20Loan.14234dba2d6580a941c6.pdf', label: 'Matching Loan' },
    { type: 'external', href: 'https://startup.bihar.gov.in/static/media/Second%20Tranche.beabb8973b7e3b174e5d.pdf', label: 'Second Tranche' }
  ];

  return (
    <div className={`container ${sticky ? "dark-nav" : ""}`}>
      <div className={`transition-shadow duration-300 ${sticky ? "bg-[#3f1063] shadow-lg" : "bg-[#3f1063]"}`}>
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
          <nav className={`flex items-center justify- h-16 p-6 lg:px-8 ${sticky ? "bg-[#ed71c4]" : "bg-[#ed71c4]"}`}>
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
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setIsDropDownOpen(true)}
                onMouseLeave={() => setIsDropDownOpen(false)}
              >
                <RouterLink to="/ecosystem" className="text-sm font-semibold leading-6 text-white flex items-center gap-1 cursor-pointer">
                  Startup Ecosystem
                  <FiChevronDown className={`transition-transform duration-300 ${isDropDownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </RouterLink>
                {isDropDownOpen && (
                  <div className="absolute left-0 top-full mt-2 flex flex-col bg-white shadow-lg z-50 w-64 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
                    {dropdownLinks.map((item, index) => {
                      if (item.type === 'divider') return <hr key={index} className="border-t border-gray-200" />;
                      if (item.type === 'external') return (
                        <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm hover:bg-indigo-100 text-gray-800">
                          {item.label}
                        </a>
                      );
                      if (item.type === 'internal') return (
                        <RouterLink key={index} to={item.to} className="px-4 py-2 text-sm hover:bg-indigo-100 text-gray-800">
                          {item.label}
                        </RouterLink>
                      );
                      return (
                        <ScrollLink key={index} to={item.to} smooth={true} offset={-50} duration={500} className="px-4 py-2 text-sm hover:bg-indigo-100 text-gray-800 cursor-pointer">
                          {item.label}
                        </ScrollLink>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:flex lg:flex-1 lg:justify-end">
              <RouterLink to="/login">
                <button className="ml-2 flex items-center text-m font-semibold leading-6 text-white hover:text-gray-200">
                  Login <span aria-hidden="true" className="ml-1">&rarr;</span>
                </button>
              </RouterLink>
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
