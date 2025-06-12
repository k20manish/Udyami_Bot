import React, { useState } from 'react';
import {
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ setActiveSection }) => {
  const [active, setActive] = useState('Dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon },
  ];

  const handleClick = (name) => {
    setActive(name);
    setActiveSection(name);
  };

  const handleLogout = () => {
    // Optional: clear any auth tokens or user data
    // localStorage.clear();
    navigate('/');
  };

  return (
    <div className="w-20 h-full bg-[#1E1E2D] text-white flex flex-col items-center py-6 z-50">

      {/* Menu Items + Admin Button */}
      <div className="flex-grow w-full flex flex-col gap-6 items-center">
        {/* Menu Buttons */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`p-3 rounded-xl transition-colors ${
                active === item.name ? 'bg-[#2A2A3B]' : 'hover:bg-[#2A2A3B]'
              }`}
            >
              <Icon className="h-6 w-6" />
            </button>
          );
        })}

        {/* Admin Button (just below menu) */}
        <button
          onClick={() => handleClick('Admin')}
          className={`p-3 rounded-xl transition-colors ${
            active === 'Admin' ? 'bg-[#2A2A3B]' : 'hover:bg-[#2A2A3B]'
          }`}
        >
          <UserCircleIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Logout Button at the very bottom */}
      <div className="w-full flex justify-center mt-6 mb-2">
        <button
          onClick={handleLogout}
          className="p-3 rounded-xl hover:bg-[#2A2A3B] bg-[#2A2A3B] transition-colors"
          title="Logout"
        >
          {/* Logout Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3h-9m9 0l-3-3m3 3l-3 3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
