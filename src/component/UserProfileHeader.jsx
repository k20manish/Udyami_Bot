// components/UserProfileHeader.jsx
import React from "react";

const UserProfileHeader = () => {
    const Name = "user"
  return (
    <div className="flex flex-col items-center  mt-2  rounded-t-xl mb-2 shadow-sm">
      <img
        src="\src\assets\user.png"
         alt= "User Avatar"
        className="sm:w-7 w-4 sm:h-8 h-4 rounded-full object-cover"
      />
      <div className="flex flex-col items-center">
        <h2 className="sm:text-lg text-sm font-normal text-black/70">{Name}</h2>
        <p className="sm:text-sm text-xs text-gray-500">Asking a question...</p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
