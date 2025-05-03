import React from 'react';

const UdyamiHeader = () => {
  return (
    // bg-[#dddddd]
    <header className="bg-[#f7f7f7] h-16 py-4 px-6 flex items-center justify-between shadow-gray-300">
      {/* Logo & Title */}
      <div className="flex items-center space-x-3">
        <img
          src="\src\assets\udymai.png"
          alt="Udyami Logo"
          className="h-10 w-10 rounded-full border-2 border-[#afa4a8]"
        />
        <h1 className="text-xl font-bold text-[#362c30]">Udyami Scheme</h1>
      </div>

      {/* Navigation */}
      {/* <nav className="hidden md:flex space-x-6 font-medium">
        <a href="#home" className="text-[#2e2a2c] hover:text-[#575656]">Home</a>
        <a href="#about" className="text-[#2e2a2c] hover:text-[#575656]">About</a>
        <a href="#eligibility" className="text-[#2e2a2c] hover:text-[#575656]">Eligibility</a>
        <a href="#apply" className="text-[#2e2a2c] hover:text-[#575656]">Apply</a>
        <a href="#contact" className="text-[#2e2a2c] hover:text-[#575656]">Contact</a>
      </nav> */}

      {/* Apply Now Button */}
      {/* <a
        href="#apply"
        className="bg-[#606060] text-white px-4 py-2 rounded hover:bg-[#363535] transition"
      >
        Apply Now
      </a> */}
    </header>
  );
};

export default UdyamiHeader;
