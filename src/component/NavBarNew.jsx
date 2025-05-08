import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AboutUs from "./AboutUs";

const NavBarNew = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-indigo-600 shadow-md">
      <nav className="flex items-center justify-between h-16 p-6 lg:px-8 bg-[#7965ee]">
        <div className="flex lg:flex-1">
          <RouterLink to="/" className="-m-1.5 p-1.5">
            <img
              className="h-12 w-auto rounded-full"
              src="/src/assets/udymai.png"
              alt="Company Logo"
            />
          </RouterLink>
        </div>
        <div className="flex gap-x-8">
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
      </nav>
    </header>
  );
};

export default NavBarNew;
