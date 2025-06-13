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

  //count logic
  const totalQuery = data.length;
  const totalResolved = data.filter(
    (item) => item.status === "Resolved"
  ).length;
  const totalPending = data.filter((item) => item.status === "Pending").length;

  return (
    <div className="flex flex-wrap justify-evenly items-center">
      <div className="mt-6 mx-4 flex items-center justify-between bg-white shadow-md px-6 py-2 rounded-full w-full max-w-xl">
        <div className="flex items-center gap-3 flex-grow">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, ID, or mobile..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-blue-300 mt-6 px-4 py-2 rounded-full">
        Total Query: {totalQuery}
      </div>
      <div className="bg-green-300 mt-6 px-4 py-2 rounded-full">
        Resolved: {totalResolved}
      </div>
      <div className="bg-yellow-300 mt-6 px-4 py-2 rounded-full">
        Pending: {totalPending}
      </div>

      <button
        onClick={handleDownload}
        className="ml-6 h-10 mt-6 px-4  bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700"
      >
        Download Excel
      </button>
    </div>
  );
};

export default Registration_Navbar;
