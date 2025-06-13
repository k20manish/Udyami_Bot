import React, { useState,useEffect} from 'react';
import SideBar from './SideBar';
import Registration_Navbar from './Registration_Navbar';
import HeaderSection from './HeaderSection';
import Registration_List from './Registration_List';

function Registration_Page() {
  const [originalData, setOriginalData] = useState([]); // fetched or dummy data
  const [filteredData, setFilteredData] = useState([]);


  
  const [registrationData, setRegistrationData] = useState([
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
    "id": 3,
    "name": "Suresh Kumar",
    "registrationId": "REG12347",
    "mobile": "9988776655",
    "status": "Rejected",
    "applicationDate": "2025-06-02",
    "approvedDate": ""
  },
  {
    "id": 4,
    "name": "Priya Singh",
    "registrationId": "REG12348",
    "mobile": "9876543200",
    "status": "Approved",
    "applicationDate": "2025-05-30",
    "approvedDate": "2025-06-05"
  },
  {
    "id": 5,
    "name": "Ravi Mehta",
    "registrationId": "REG12349",
    "mobile": "9012345678",
    "status": "Pending",
    "applicationDate": "2025-06-04",
    "approvedDate": ""
  },
  {
    "id": 6,
    "name": "Kavita Sharma",
    "registrationId": "REG12350",
    "mobile": "9888777666",
    "status": "Approved",
    "applicationDate": "2025-06-01",
    "approvedDate": "2025-06-06"
  },
  {
    "id": 7,
    "name": "Arjun Patel",
    "registrationId": "REG12351",
    "mobile": "9112233445",
    "status": "Pending",
    "applicationDate": "2025-06-03",
    "approvedDate": ""
  },
  {
    "id": 8,
    "name": "Meena Joshi",
    "registrationId": "REG12352",
    "mobile": "9001122334",
    "status": "Rejected",
    "applicationDate": "2025-05-29",
    "approvedDate": ""
  },
{
    "id": 9,
    "name": "Neha Aggarwal",
    "registrationId": "REG12353",
    "mobile": "9876123450",
    "status": "Pending",
    "applicationDate": "2025-06-05",
    "approvedDate": ""
  },
  {
    "id": 10,
    "name": "Vikram Chauhan",
    "registrationId": "REG12354",
    "mobile": "9786012345",
    "status": "Approved",
    "applicationDate": "2025-06-01",
    "approvedDate": "2025-06-07"
  },
  {
    "id": 11,
    "name": "Ruchi Deshmukh",
    "registrationId": "REG12355",
    "mobile": "9911991100",
    "status": "Rejected",
    "applicationDate": "2025-05-31",
    "approvedDate": ""
  },
  {
    "id": 12,
    "name": "Alok Sinha",
    "registrationId": "REG12356",
    "mobile": "9090909090",
    "status": "Pending",
    "applicationDate": "2025-06-06",
    "approvedDate": ""
  },
  {
    "id": 13,
    "name": "Bhavna Kapoor",
    "registrationId": "REG12357",
    "mobile": "9800001111",
    "status": "Approved",
    "applicationDate": "2025-06-02",
    "approvedDate": "2025-06-08"
  },
  {
    "id": 14,
    "name": "Karan Yadav",
    "registrationId": "REG12358",
    "mobile": "9991112233",
    "status": "Rejected",
    "applicationDate": "2025-05-27",
    "approvedDate": ""
  },
  {
    "id": 15,
    "name": "Sneha Iyer",
    "registrationId": "REG12359",
    "mobile": "9300456789",
    "status": "Approved",
    "applicationDate": "2025-06-03",
    "approvedDate": "2025-06-09"
  },
  {
    "id": 16,
    "name": "Amitabh Roy",
    "registrationId": "REG12360",
    "mobile": "9876000000",
    "status": "Pending",
    "applicationDate": "2025-06-05",
    "approvedDate": ""
  }
  ]);

   useEffect(() => {
  setOriginalData(registrationData);
  setFilteredData(registrationData);
}, [registrationData]);

 
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    const result = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.registrationId.toLowerCase().includes(lowerQuery) ||
        item.mobile.includes(lowerQuery)
    );

    setFilteredData(result);
  };

  const handleMarkResolved = (id) => {
    const updated = originalData.map((item) =>
      item.id === id ? { ...item, status: "Approved", approvedDate: new Date().toISOString().split("T")[0] } : item
    );
    setOriginalData(updated);
    setFilteredData(updated);
  };

  return (
    <div className="bg-white h-screen flex overflow-hidden"> {/* Full screen layout */}
      
      {/* Sidebar */}
      <div className="h-full w-24 shrink-0">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full h-full">

        {/* Fixed Header */}
        <div className="shrink-0">
          <HeaderSection />
        </div>

        {/* Content below header */}
        <div className="flex flex-col flex-grow overflow-hidden">
          
          {/* Fixed Navbar */}
          <div className="shrink-0">
            <Registration_Navbar data={registrationData} onSearch={handleSearch} />
          </div>

          {/* Scrollable List */}
          <div className="flex-grow overflow-hidden">
            <Registration_List data={filteredData}  handleMarkResolved={handleMarkResolved}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration_Page;
