import React, { useState } from "react";
import ApplicationModal from "./ApplicationModal";

const Registration_List = ({ data = [], handleMarkResolved }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState("All");

  // Calculate counts
  const totalQuery = data.length;
  const totalResolved = data.filter((user) => user.status === "Resolved").length;
  const totalPending = data.filter((user) => user.status === "Pending").length;

  // Filter the data based on selected filter
  const filteredData =
    filter === "Pending"
      ? data.filter((user) => user.status === "Pending")
      : data;

  return (
    <div className="p-2 sm:p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
        <h2 className="text-base sm:text-lg font-bold">Query List</h2>

        {/* Count Stats */}
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md shadow-gray-300 px-4 py-1">
          <div className="px-2 py-1 rounded-full text-sm font-bold">
            Total: {totalQuery}
          </div>
          <div className="px-2 py-1 rounded-full text-sm font-bold">
            Resolved: {totalResolved}
          </div>
          <div className="px-2 py-1 rounded-full text-sm font-bold">
            Pending: {totalPending}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="space-x-2">
          <button
            onClick={() => setFilter("All")}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${
              filter === "All"
                ? "bg-[#3f1063] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Pending")}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${
              filter === "Pending"
                ? "bg-[#3f1063] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="border rounded-lg shadow bg-white overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full table-fixed text-[10px] sm:text-xs md:text-sm">
              <thead className="bg-[#3f1063] text-white">
                <tr>
                  <th className="px-2 py-1 text-left w-[5%]">S.No</th>
                  <th className="px-2 py-1 text-left w-[13%]">Name</th>
                  <th className="px-2 py-1 text-left w-[13%]">Registration ID</th>
                  <th className="px-2 py-1 text-left w-[13%]">Mobile</th>
                  <th className="px-2 py-1 text-left w-[13%]">District</th>
                  <th className="px-2 py-1 text-left w-[13%]">Issue</th>
                  <th className="px-2 py-1 text-left w-[13%]">Application Date</th>
                  <th className="px-2 py-1 text-left w-[13%]">Resolve Date</th>
                  <th className="px-2 py-1 text-left w-[10%]">Action</th>
                </tr>
              </thead>
            </table>

            <div className="max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              <table className="w-full table-fixed text-[10px] sm:text-xs md:text-sm">
                <tbody>
                  {filteredData.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="px-2 py-1 w-[5%]">{index + 1}</td>
                      <td className="px-2 py-1 w-[13%]">{user.name}</td>
                      <td className="px-3 py-1 w-[13%]">{user.registrationId}</td>
                      <td className="px-3 py-1 w-[13%]">{user.mobile}</td>
                      <td className="px-3 py-1 w-[13%]">{user.district}</td>
                      <td className="px-3 py-1 w-[13%]">{user.issue}</td>
                      <td className="px-4 py-1 w-[13%]">{user.applicationDate}</td>
                      <td className="px-4 py-1 w-[13%]">
                        {user.approvedDate || (
                          <span className="text-gray-400 italic">
                            {user.resolvedDate}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-1 w-[10%]">
                        <button
                          className={`px-3 py-[2px] rounded text-[10px] sm:text-xs ${
                            user.status === "Resolved"
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-amber-500 text-white cursor-default"
                          }`}
                        >
                          {user.status === "Resolved" ? "Resolved" : "Pending"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredData.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No queries found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <ApplicationModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onConfirmResolve={() => {
            handleMarkResolved?.(selectedUser.id);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default Registration_List;
