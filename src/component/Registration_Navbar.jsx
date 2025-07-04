import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Registration_Navbar = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
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
    const worksheet = XLSX.utils.json_to_sheet(data);
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // send to parent
  };

  // Count logic
  const totalQuery = data.length;
  const totalResolved = data.filter((item) => item.status === "Resolved").length;
  const totalPending = data.filter((item) => item.status === "Pending").length;

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap justify-between items-center px-4 gap-4">
      
      {/* Search Input */}
      <div className="mt-4 w-full max-w-sm">
        <div className="flex items-center bg-white shadow-md   shadow-gray-400 px-4 py-2 rounded-full w-full" style={{
    boxShadow: "0 -4px 6px -2px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.1)",
  }}>
          
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, ID, or mobile..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full ml-2 border-none focus:outline-none"
          />
        </div>
      </div>

     
      <div className="mt-2">
        <button
          onClick={handleDownload}
          className="h-10 px-6 bg-[#3f1063] text-white rounded-full text-sm hover:opacity-90 transition cursor-pointer"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default Registration_Navbar;
