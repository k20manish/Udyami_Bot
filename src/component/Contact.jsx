 
 import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dicData = [
  ["1", "Araria", "Sri Krishna Kumar Bharati", "06453-222040", "222124", "73209-23225", "gm.dicarar-bih@gov.in"],
  ["2", "Arwal", "Sri Sahdeo Das", "06337-229351", "228988", "73209-23226", "gm.dicarw-bih@gov.in"],
  ["3", "Aurangabad", "Mohammed Affan", "06186-223211", "223211", "73209-23227", "gm.dicaugbd-bih@gov.in"],
  ["4", "Banka", "Sri Shambhu Kumar Patel", "06424-222289", "222289", "73209-23228", "gm.dicban-bih@gov.in"],
  ["5", "Begusarai", "Ms. Gyaneshwari Kiran", "06243-222055", "230571", "73209-23229", "gm.dicbgsri-bih@gov.in"],
  ["6", "Bhagalpur", "Ms. Khushboo Kumari", "0641-2400543", "2402400", "73209-23230", "gm.dicbhgpur-bih@gov.in"],
  ["7", "Bhojpur", "Ms. Madhu Kumari", "06182-239139", "233474", "73209-23231", "gm.dicbojpur-bih@gov.in"],
  ["8", "Buxar", "Ms. Manisha Kumari", "06183-226064", "222231", "73209-23232", "gm.dicbux-bih@gov.in"],
  ["9", "Darbhanga", "Sri Nawal Kishore Paswan", "06272-222387", "245360", "73209-23233", "gm.dicdrbg-bih@gov.in"],
  ["10", "East Champaran", "Sri Subham Kumar", "06252-232509", "242711", "73209-23234", "gm.dicechamp-bih@gov.in"],
  ["11", "Gaya", "Ms. Bandana", "0631-2223561", "2223561", "73209-23235", "gm.dicgaya-bih@gov.in"],
  ["12", "Gopalganj", "Sri Ayush Kumar", "06156-224637", "226003", "73209-23236", "gm.dicgplgng-bih@gov.in"],
  ["13", "Jamui", "Sri Mitesh Kumar Shandily", "06345-222277", "222277", "73209-23237", "gm.dicjamui-bih@gov.in"],
  ["14", "Jehanabad", "Ms. Puja Kumari", "06114-223177", "225741", "73209-23238", "gm.dicjehnbad-bih@gov.in"],
  ["15", "Kaimur", "Ms. Hemlata Kumari", "06189-224749", "223301", "73209-23239", "gm.dickaimur-bih@gov.in"],
  ["16", "Katihar", "Ms. Sonali Shital", "06452-248120", "230880", "73209-23240", "gm.kathr-bih@gov.in"],
  ["17", "Khagaria", "Ms. Paridhi Vidisha", "06244-222362", "222154", "73209-23241", "gm.dickhgari-bih@gov.in"],
  ["18", "Kishanganj", "Sri Anil Kumar Mandal", "06456-222092", "222626", "73209-23242", "gm.dickisngnj-bih@gov.in"],
  ["19", "Lakhisarai", "Sri Priyanshu Raj", "06346-232552", "232767", "73209-23243", "gm.diclkhisri-bih@gov.in"],
  ["20", "Madhepura", "Sri Harshabardhan Lal", "06476-222367", "224146", "73209-23244", "gm.dicmadpr-bih@gov.in"],
  ["21", "Madhubani", "Sri Ramesh Kumar Sharma", "06276-222321", "222209", "73209-23245", "gm.dicmadhbni-bih@gov.in"],
  ["22", "Munger", "Ms. Gyaneshwari Kiran", "06344-222287", "222254", "73209-23246", "gm.dicmunger-bih@gov.in"],
  ["23", "Muzaffarpur", "Ms. Abhilasha Bharti", "-", "2217285", "73209-23247", "gm.dicmzfpur-bih@gov.in"],
  ["24", "Nalanda", "Sri Bisheshwar Prasad", "06112-220639", "235205", "73209-23248", "gm.dicnld-bih@gov.in"],
  ["25", "Nawada", "Sri Amit Vikram Bhardwaj", "06324-212308", "212904", "73209-23249", "gm.dicnwda-bih@gov.in"],
  ["26", "Patna", "Sri Vivek Kumar", "0612-2270865", "2218900", "73209-23250", "gm.dicptn-bih@gov.in"],
  ["27", "Purnea", "Sri Sanjeev Kumar", "06454-242395", "242599", "73209-23251", "gm.dicpurnea-bih@gov.in"],
  ["28", "Rohtas", "Sri Ashish Ranjan", "06184-221084", "228856", "73209-23252", "gm.dicrohta-bih@gov.in"],
  ["29", "Saharsa", "Sri Mukesh Kumar", "06478-223110", "224986", "73209-23256", "gm.dicshars-bih@gov.in"],
  ["30", "Samastipur", "Sri Vivek Kumar Sharma", "06274-222379", "222216", "73209-23253", "gm.dicsmstipur-bih@gov.in"],
  ["31", "Saran", "Ms. Jyoti Kumari", "06152-222482", "240003", "73209-23254", "gm.dicsaran-bih@gov.in"],
  ["32", "Sheikhpura", "Sri Sujat", "06341-225073", "223001", "73209-23255", "gm.dicshkhpra-bih@gov.in"],
  ["33", "Sheohar", "Sri Pranay Kashyap", "06222-259088", "257288", "73209-23257", "gm.dicsheohar-bih@gov.in"],
  ["34", "Sitamarhi", "Ms. Priya Bharati", "06226-250527", "254516", "73209-23258", "gm.dicsita-bih@gov.in"],
  ["35", "Siwan", "Sri Vivek Kumar", "06154-245423", "242160", "73209-23259", "gm.dicsiw-bih@gov.in"],
  ["36", "Supaul", "Sri Manoj Kumar", "6473", "223041", "73209-23260", "gm.dicsupl-bih@gov.in"],
  ["37", "Vaishali", "Ms. Saneha", "06224-277739", "272501", "73209-23261", "gm.dicvish-bih@gov.in"],
  ["38", "West Champaran", "Sri Rohit Raj", "06254-232534", "242576", "73209-23262", "gm.dicwchamp-bih@gov.in"]
];


function Contact() {
  const navigate = useNavigate();
  return (
    
    <div className="overflow-x-auto p-4 mt-16">

       <button
        onClick={() => navigate("/")}
        className="absolute top-18 flex items-center text-[#3f1063] hover:text-[#7171ed] cursor-pointer p-2"
      >
        <ArrowLeft className="mr-2" />
        Back
      </button>

      <table className="table-auto border-collapse border border-gray-400 w-full text-sm mt-10">
        <thead>
          <tr className="bg-[#3f1063] text-white">
            <th className="border border-gray-400 px-2 py-1">SL</th>
            <th className="border border-gray-400 px-2 py-1">Name of DIC</th>
            <th className="border border-gray-400 px-2 py-1">General Manager</th>
            <th className="border border-gray-400 px-2 py-1">Phone</th>
            <th className="border border-gray-400 px-2 py-1">Fax</th>
            <th className="border border-gray-400 px-2 py-1">Mobile</th>
            <th className="border border-gray-400 px-2 py-1">E-Mail</th>
          </tr>
        </thead>
        <tbody>
          {dicData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              {row.map((cell, i) => (
                <td key={i} className="border border-gray-400 px-2 py-1">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Contact;