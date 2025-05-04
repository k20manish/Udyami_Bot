// components/UserProfileHeader.jsx
import React from "react";

const UserProfileHeader = () => {
    const Name = "user"
  return (
    <div className="flex flex-col items-center mt-1  mb-2 shadow-sm">
      <img
        src="\src\assets\user.png"
         alt= "User Avatar"
        className="w-7 h-7 rounded-full object-cover"
      />
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-normal text-black/70">{Name}</h2>
        <p className="text-sm text-gray-500">Asking a question...</p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
