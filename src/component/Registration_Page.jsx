import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Registration_Navbar from './Registration_Navbar';
import HeaderSection from './HeaderSection';
import Registration_List from './Registration_List';

function Registration_Page() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [registrationData, setRegistrationData] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      registrationId: 'REG12345',
      mobile: '9876543210',
      status: 'Pending',
      applicationDate: '2025-06-01',
      resolvedDate: '',
      issue: "I have not received the second tranche of Udyami Yojana funds.",
    },
    {
      id: 2,
      name: 'Anita Verma',
      registrationId: 'REG12346',
      mobile: '9123456789',
      status: 'Resolved',
      applicationDate: '2025-05-28',
      resolvedDate: '2025-06-03',
      issue: "I want to update my bank details for Udyami Yojana.",
    },
    {
      id: 3,
      name: "Suresh Kumar",
      registrationId: "REG12347",
      mobile: "9988776655",
      status: "Pending",
      applicationDate: "2025-06-02",
      resolvedDate: "",
      issue: "My application was rejected, can I reapply for Udyami Yojana?",
    },
    {
      id: 4,
      name: "Priya Singh",
      registrationId: "REG12348",
      mobile: "9876543200",
      status: "Resolved",
      applicationDate: "2025-05-30",
      resolvedDate: "2025-06-05",
      issue: "I have lost my approval letter for Udyami Yojana.",
    },
    {
      id: 5,
      name: "Ravi Mehta",
      registrationId: "REG12349",
      mobile: "9012345678",
      status: "Pending",
      applicationDate: "2025-06-04",
      resolvedDate: "",
      issue: "I have not received any update after submitting my documents.",
    },
    {
      id: 6,
      name: "Kavita Sharma",
      registrationId: "REG12350",
      mobile: "9888777666",
      status: "Resolved",
      applicationDate: "2025-06-01",
      resolvedDate: "2025-06-06",
      issue: "I want to know the status of my second tranche release.",
    },
    {
      id: 7,
      name: "Arjun Patel",
      registrationId: "REG12351",
      mobile: "9112233445",
      status: "Pending",
      applicationDate: "2025-06-03",
      resolvedDate: "",
      issue: "I need to correct my name in the Udyami Yojana application.",
    },
    {
      id: 8,
      name: "Meena Joshi",
      registrationId: "REG12352",
      mobile: "9001122334",
      status: "Pending",
      applicationDate: "2025-05-29",
      resolvedDate: "",
      issue: "Why was my Udyami Yojana application rejected?",
    },
    {
      id: 9,
      name: "Neha Aggarwal",
      registrationId: "REG12353",
      mobile: "9876123450",
      status: "Pending",
      applicationDate: "2025-06-05",
      resolvedDate: "",
      issue: "I have not received the login credentials for the portal.",
    },
    {
      id: 10,
      name: "Vikram Chauhan",
      registrationId: "REG12354",
      mobile: "9786012345",
      status: "Resolved",
      applicationDate: "2025-06-01",
      resolvedDate: "2025-06-07",
      issue: "I want to change my registered mobile number.",
    },
    {
      id: 11,
      name: "Ruchi Deshmukh",
      registrationId: "REG12355",
      mobile: "9911991100",
      status: "Pending",
      applicationDate: "2025-05-31",
      resolvedDate: "",
      issue: "I submitted all documents but my application was rejected.",
    },
    {
      id: 12,
      name: "Alok Sinha",
      registrationId: "REG12356",
      mobile: "9090909090",
      status: "Pending",
      applicationDate: "2025-06-06",
      resolvedDate: "",
      issue: "I want to know the expected approval date for my application.",
    },
    {
      id: 13,
      name: "Bhavna Kapoor",
      registrationId: "REG12357",
      mobile: "9800001111",
      status: "Resolved",
      applicationDate: "2025-06-02",
      resolvedDate: "2025-06-08",
      issue: "I have not received the funds in my bank account yet.",
    },
    {
      id: 14,
      name: "Karan Yadav",
      registrationId: "REG12358",
      mobile: "9991112233",
      status: "Pending",
      applicationDate: "2025-05-27",
      resolvedDate: "",
      issue: "I want to appeal against the rejection of my application.",
    },
    {
      id: 15,
      name: "Sneha Iyer",
      registrationId: "REG12359",
      mobile: "9300456789",
      status: "Resolved",
      applicationDate: "2025-06-03",
      resolvedDate: "2025-06-09",
      issue: "I need help with uploading documents for the next phase.",
    },
    {
      id: 16,
      name: "Amitabh Roy",
      registrationId: "REG12360",
      mobile: "9876000000",
      status: "Pending",
      applicationDate: "2025-06-05",
      resolvedDate: "",
      issue: "I have lost my registration ID for Udyami Yojana.",
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
    const today = new Date().toISOString().split("T")[0];

    const updated = originalData.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "Resolved",
            resolvedDate: today,
          }
        : item
    );

    setOriginalData(updated);
    setFilteredData(updated);
  };

  return (
    <div className="bg-white h-screen flex overflow-hidden">
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
            <Registration_List data={filteredData} handleMarkResolved={handleMarkResolved} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration_Page;
