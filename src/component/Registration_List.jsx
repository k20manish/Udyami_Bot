const Registration_List = ({ data = [], handleMarkResolved }) => {
  return (
    <div className="p-6 overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Query List</h2>

      <div className="border rounded-xl shadow-md bg-white overflow-hidden">
        <table className="min-w-full border-collapse table-fixed">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 w-[5%]">S.No</th>
              <th className="px-4 py-2 w-[15%]">Name</th>
              <th className="px-4 py-2 w-[15%]">Registration ID</th>
              <th className="px-4 py-2 w-[15%]">Mobile</th>
              <th className="px-4 py-2 w-[15%]">Application Date</th>
              <th className="px-4 py-2 w-[15%]">Resolve Date</th>
              <th className="px-4 py-2 w-[10%]">Status</th>
              <th className="px-4 py-2 w-[10%]">Mark as Resolved</th>
              <th className="px-4 py-2 w-[10%]">Change Status</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable tbody inside a wrapper */}
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full border-collapse table-fixed">
            <tbody>
              {data.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 w-[5%]">{index + 1}</td>
                  <td className="px-4 py-2 w-[15%]">{user.name}</td>
                  <td className="px-4 py-2 w-[15%]">{user.registrationId}</td>
                  <td className="px-4 py-2 w-[15%]">{user.mobile}</td>
                  <td className="px-4 py-2 w-[15%]">{user.applicationDate}</td>
                  <td className="px-4 py-2 w-[15%]">
                    {user.approvedDate || (
                      <span className="text-gray-400 italic">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 w-[10%]">{user.status}</td>
                  <td className="px-4 py-2 w-[10%] text-center">
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
                  <td className="px-4 py-2 w-[10%] text-center">
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
