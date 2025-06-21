import React from 'react';

const HeaderSection = () => {
  return (
    <header className="w-full mx-auto h-18  px-6 py-4 shadow-md  flex items-center justify-between">
      <div className="max-w-7xl  flex items-center px-6 py-4">
        {/* Logo */}
        <img
          src="/udymai.png" // Replace with actual path
          alt="Logo"
          className="h-10 w-10 rounded-full"
        />

        {/* Text */}
        <div className="ml-4 text-lg sm:text-xl font-medium text-gray-800 flex-grow">
          Welcome, <span className="text-gray-700 font-bold">HelloUdyami</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
