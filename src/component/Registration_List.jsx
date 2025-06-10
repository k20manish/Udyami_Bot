import React from 'react';

const Registration_List = () => {
  // Dummy data for example
  const data = [
  {
    id: 1,
    name: 'Rahul Sharma',
    registrationId: 'REG12345',
    mobile: '9876543210',
    status: 'Pending',
    applicationDate: '2025-06-01',
    approvedDate: '',
  },
  {
    id: 2,
    name: 'Anita Verma',
    registrationId: 'REG12346',
    mobile: '9123456789',
    status: 'Approved',
    applicationDate: '2025-05-28',
    approvedDate: '2025-06-03',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    registrationId: 'REG12347',
    mobile: '9988776655',
    status: 'Rejected',
    applicationDate: '2025-06-02',
    approvedDate: '',
  },
  {
    id: 4,
    name: 'Neha Mishra',
    registrationId: 'REG12348',
    mobile: '9090909090',
    status: 'Approved',
    applicationDate: '2025-05-30',
    approvedDate: '2025-06-04',
  },
  {
    id: 5,
    name: 'Rohit Mehta',
    registrationId: 'REG12349',
    mobile: '9876543201',
    status: 'Pending',
    applicationDate: '2025-06-04',
    approvedDate: '',
  },
  {
    id: 6,
    name: 'Pooja Gupta',
    registrationId: 'REG12350',
    mobile: '9911223344',
    status: 'Approved',
    applicationDate: '2025-06-01',
    approvedDate: '2025-06-06',
  },
  {
    id: 7,
    name: 'Suresh Kumar',
    registrationId: 'REG12351',
    mobile: '9999888877',
    status: 'Pending',
    applicationDate: '2025-06-03',
    approvedDate: '',
  },
  {
    id: 8,
    name: 'Divya Rani',
    registrationId: 'REG12352',
    mobile: '9876501234',
    status: 'Approved',
    applicationDate: '2025-05-29',
    approvedDate: '2025-06-02',
  },
  {
    id: 9,
    name: 'Amitabh Das',
    registrationId: 'REG12353',
    mobile: '9080706050',
    status: 'Rejected',
    applicationDate: '2025-06-05',
    approvedDate: '',
  },
  {
    id: 10,
    name: 'Kiran Yadav',
    registrationId: 'REG12354',
    mobile: '9191919191',
    status: 'Approved',
    applicationDate: '2025-05-31',
    approvedDate: '2025-06-04',
  },
];


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Registration List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-300 border-collapse overflow-hidden">
  <thead className="bg-indigo-600 text-white">
    <tr>
      <th className="px-4 py-2 text-left border-r border-l border-gray-300">S.No</th>
      <th className="px-4 py-2 text-left border-r border-gray-300">Name</th>
      <th className="px-4 py-2 text-left border-r border-gray-300">Registration ID</th>
      <th className="px-4 py-2 text-left border-r border-gray-300">Mobile Number</th>
      <th className="px-4 py-2 text-left border-r border-gray-300">Application Date</th>
      <th className="px-4 py-2 text-left border-r border-gray-300">Approved Date</th>
      <th className="px-4 py-2 text-left border-r border-gray-300">Current Status</th>
      <th className="px-4 py-2 text-center border-r border-gray-300">Marked</th>
      <th className="px-4 py-2 text-center border-r border-gray-300">Unmarked</th>
    </tr>
  </thead>
  <tbody>
    {data.map((user, index) => (
      <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-4 py-2 border-r border-l border-gray-300">{index + 1}</td>
        <td className="px-4 py-2 border-r border-gray-300">{user.name}</td>
        <td className="px-4 py-2 border-r border-gray-300">{user.registrationId}</td>
        <td className="px-4 py-2 border-r border-gray-300">{user.mobile}</td>
        <td className="px-4 py-2 border-r border-gray-300">{user.applicationDate}</td>
        <td className="px-4 py-2 border-r border-gray-300">
          {user.approvedDate || <span className="text-gray-400 italic">Pending</span>}
        </td>
        <td className="px-4 py-2 border-r border-gray-300">{user.status}</td>
        <td className="px-4 py-2 text-center border-r border-gray-300">
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">
            Mark
          </button>
        </td>
        <td className="px-4 py-2 text-center border-r border-gray-300">
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
            Unmark
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default Registration_List;
