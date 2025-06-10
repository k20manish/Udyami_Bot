import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Registration_Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-xl mx-2 mt-6 px-6 py-2 bg-white shadow-md rounded-full flex items-start justify-start">
      {/* Left: Search */}
      <div className="flex items-center gap-3 w-full">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 "
        />
      </div>
    </div>
  );
};

export default Registration_Navbar;
