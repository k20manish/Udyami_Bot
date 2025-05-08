import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from 'framer-motion';

const AboutUs = () => {
  const navigate = useNavigate();



  return (
    <motion.div
    className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded-2xl shadow-lg "
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
      <button
  onClick={() => navigate("/")}
  className="absolute top-22 left-10 flex items-center text-[#3f1063] hover:text-[#ed71c4] p-2"
>
  <ArrowLeft className="mr-2" />
  Back
</button>
    <h1 className="text-3xl font-bold mb-4 text-center">About MMUY 2024-25</h1>
    <p className="text-gray-700 text-lg mb-4">
        The Mukhyamantri Udyami Yojana (MUY) is an initiative by the government aimed at empowering entrepreneurs and boosting small and medium-sized enterprises (SMEs). 
        This program focuses on providing financial assistance, mentorship, and support to aspiring business owners, enabling them to establish and expand their businesses.
      </p>
      <p className="text-gray-700 text-lg mb-4">
        Through a structured application and selection process, the scheme identifies promising entrepreneurs and grants them the necessary funding and resources to succeed. 
        MUY is committed to fostering economic growth, creating job opportunities, and driving innovation at the grassroots level.
      </p>
      <p className="text-gray-700 text-lg">
        Join us in building a thriving entrepreneurial ecosystem, where ideas are transformed into reality, and local businesses contribute to the economic development of the region.
      </p>
  </motion.div>
  );
};

export default AboutUs;
""
