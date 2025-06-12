import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Registration_Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(dummyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "registration_list.xlsx");
  };

  return (
    <div className="mt-6 mx-4 flex items-center justify-between bg-white shadow-md px-6 py-2 rounded-full w-full max-w-5xl">
      {/* Search Box */}
      <div className="flex items-center gap-3 flex-grow">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Download Excel Button */}
      <button
        onClick={handleDownload}
        className="ml-6 px-4 py-1 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700"
      >
        Download Excel
      </button>
    </div>
  );
};

export default Registration_Navbar;
