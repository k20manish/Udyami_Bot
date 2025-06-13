import React from "react";

const Registration_List = ({ data = [], handleMarkResolved }) => {
  return (
    <div className="p-4 sm:p-6 overflow-hidden">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Query List</h2>

      <div className="border rounded-xl shadow-md bg-white overflow-hidden">
        {/* Scrollable table wrapper for mobile */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] border-collapse table-auto">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-2 sm:px-4 py-2 w-[5%] text-left">S.No</th>
                <th className="px-2 sm:px-4 py-2 w-[15%] text-left">Name</th>
                <th className="px-2 sm:px-4 py-2 w-[15%] text-left">Registration ID</th>
                <th className="px-2 sm:px-4 py-2 w-[15%] text-left">Mobile</th>
                <th className="px-2 sm:px-4 py-2 w-[15%] text-left">Application Date</th>
                <th className="px-2 sm:px-4 py-2 w-[15%] text-left">Resolve Date</th>
                <th className="px-2 sm:px-4 py-2 w-[10%] text-left">Status</th>
                <th className="px-2 sm:px-4 py-2 w-[10%] text-left">Mark as Resolved</th>
                <th className="px-2 sm:px-4 py-2 w-[10%] text-left">Change Status</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable tbody inside wrapper */}
        <div className="max-h-[400px] overflow-y-auto w-full overflow-x-auto">
          <table className="min-w-[900px] border-collapse table-auto">
            <tbody>
              {data.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-2">{index + 1}</td>
                  <td className="px-2 sm:px-4 py-2">{user.name}</td>
                  <td className="px-2 sm:px-4 py-2">{user.registrationId}</td>
                  <td className="px-2 sm:px-4 py-2">{user.mobile}</td>
                  <td className="px-2 sm:px-4 py-2">{user.applicationDate}</td>
                  <td className="px-2 sm:px-4 py-2">
                    {user.approvedDate || (
                      <span className="text-gray-400 italic">Pending</span>
                    )}
                  </td>
                  <td className="px-2 sm:px-4 py-2">{user.status}</td>
                  <td className="px-2 sm:px-4 py-2 text-center">
                    <button
                      onClick={() => handleMarkResolved?.(user.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        user.status === "Approved"
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white hover:bg-gray-600 cursor-not-allowed"
                      }`}
                      disabled={user.status === "Approved"}
                    >
                      {user.status === "Approved" ? "Marked" : "Mark"}
                    </button>
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-center">
                    <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm">
                      Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registration_List;
