import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Lucide icons for toggle

const NavBarNew = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-indigo-600 shadow-md">
      <nav className="flex items-center justify-between h-16 p-6 lg:px-8 bg-[#7965ee]">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <RouterLink to="/" className="-m-1.5 p-1.5">
            <img
              className="h-12 w-auto rounded-full"
              src="/src/assets/udymai.png"
              alt="Company Logo"
            />
          </RouterLink>
        </div>

        {/* Title */}
        <div className="absolute sm:left-1/8 left-1/4 font-bold text-xl font-glida text-white">
          HelloUdyami
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-x-8">
          <RouterLink
            to="/AboutUs"
            className="text-sm font-semibold leading-6 text-white hover:text-gray-200"
          >
            About Us
          </RouterLink>
          <RouterLink
            to="/Contact"
            className="text-sm font-semibold leading-6 text-white hover:text-gray-200"
          >
            Contact Us
          </RouterLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#7965ee] px-6 pb-4 pt-2 shadow-md">
          <RouterLink
            to="/AboutUs"
            className="block py-2 text-sm font-semibold text-white hover:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </RouterLink>
          <RouterLink
            to="/Contact"
            className="block py-2 text-sm font-semibold text-white hover:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </RouterLink>
        </div>
      )}
    </header>
  );
};

export default NavBarNew;
