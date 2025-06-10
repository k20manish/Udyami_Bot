import React, { useState } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  FolderIcon,
  BellIcon,
  UsersIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

import { PiRankingBold } from "react-icons/pi";


const SideBar = ({ setActiveSection }) => {
  const [active, setActive] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon },
  ];

  const handleClick = (name) => {
    setActive(name);
    setActiveSection(name);
  };

  return (
    <div className="w-20 h-full bg-[#1E1E2D] text-white flex flex-col items-center py-6 z-50 ">

      {/* Scrollable Menu Container */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col gap-6 items-center">
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
      </div>

      {/* Fixed Bottom Admin Button */}
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => handleClick('Admin')}
          className={`p-3 rounded-xl transition-colors ${
            active === 'Admin' ? 'bg-[#2A2A3B]' : 'hover:bg-[#2A2A3B]'
          }`}
        >
          <UserCircleIcon className="h-6 w-6" />
        </button>
      </div>

    </div>
  );
};

export default SideBar;