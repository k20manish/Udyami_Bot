import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from 'framer-motion';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative max-w-4xl mx-auto px-4 sm:px-6 py-6 mt-20 bg-white rounded-2xl  "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-[#3f1063] hover:text-[#7171ed] p-2 mb-4 sm:absolute sm:top-6 sm:left-6 cursor-pointer"
      >
        <ArrowLeft className="mr-2 w-5 h-5" />
        <span className="text-sm sm:text-base">Back</span>
      </button>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        About MMUY 2024-25
      </h1>

      {/* Paragraphs */}
      <p className="text-gray-700 text-base sm:text-lg mb-4">
        The Mukhyamantri Udyami Yojana (MUY) is an initiative by the government
        aimed at empowering entrepreneurs and boosting small and medium-sized
        enterprises (SMEs). This program focuses on providing financial
        assistance, mentorship, and support to aspiring business owners,
        enabling them to establish and expand their businesses.
      </p>

      <p className="text-gray-700 text-base sm:text-lg mb-4">
        Through a structured application and selection process, the scheme
        identifies promising entrepreneurs and grants them the necessary funding
        and resources to succeed. MUY is committed to fostering economic growth,
        creating job opportunities, and driving innovation at the grassroots
        level.
      </p>

      <p className="text-gray-700 text-base sm:text-lg">
        Join us in building a thriving entrepreneurial ecosystem, where ideas
        are transformed into reality, and local businesses contribute to the
        economic development of the region.
      </p>
    </motion.div>
  );
};

export default AboutUs;
