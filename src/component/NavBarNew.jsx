import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBarNew = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-indigo-600 shadow-md">
      <nav className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-[#7965ee]">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <RouterLink to="/" className="p-1.5">
            <img
              className="h-12 w-auto rounded-full"
              src="/udymai.png"
              alt="Company Logo"
            />
          </RouterLink>
        </div>

        {/* Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg sm:text-xl text-white font-glida">
          HelloUdyami
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-x-6">
          <RouterLink
            to="/"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/AboutUs"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            About Us
          </RouterLink>
          <RouterLink
            to="/Contact"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            Contact Us
          </RouterLink>
          <RouterLink
            to="/LoginPage"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            Login Page
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

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#7965ee] px-4 pt-2 pb-4 space-y-2 shadow-md">
          <RouterLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-semibold text-white hover:text-gray-200"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/AboutUs"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-semibold text-white hover:text-gray-200"
          >
            About Us
          </RouterLink>
          <RouterLink
            to="/Contact"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-semibold text-white hover:text-gray-200"
          >
            Contact Us
          </RouterLink>
          <RouterLink
            to="/LoginPage"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-semibold text-white hover:text-gray-200"
          >
            Login Page
          </RouterLink>
        </div>
      )}
    </header>
  );
};

export default NavBarNew;
