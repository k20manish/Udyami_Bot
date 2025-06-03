import React from 'react';
import { ArrowLeft, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center mt-20'>
      <button
        onClick={() => navigate("/")}
        className="absolute top-18 left-10 flex items-center text-[#3f1063] hover:text-[#7171ed] cursor-pointer p-2"
      >
        <ArrowLeft className="mr-2" />
        Back
      </button>

      <div className="mt-10 space-y-4">
        <div className="flex items-center space-x-2">
          <Instagram className="text-[#3f1063] hover:text-[#7171ed] w-6 h-6" />
          <span className="text-[#3f1063] hover:text-[#7171ed]">Instagram</span>
        </div>
        <div className="flex items-center space-x-2">
          <Twitter className="text-[#3f1063] hover:text-[#7171ed] w-6 h-6" />
          <span className="text-[#3f1063] hover:text-[#7171ed]">Twitter</span>
        </div>
        <div className="flex items-center space-x-2">
          <Facebook className="text-[#3f1063] hover:text-[#7171ed] w-6 h-6" />
          <span className="text-[#3f1063] hover:text-[#7171ed]">Facebook</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="text-[#3f1063] hover:text-[#7171ed] w-6 h-6" />
          <span className="text-[#3f1063] hover:text-[#7171ed]">Email</span>
        </div>
      </div>
    </div>
  );
}

export default Contact;
