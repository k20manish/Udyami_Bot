import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative max-w-4xl mx-auto px-4 sm:px-6 py-6 mt-14 bg-white rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-[#ffffff] hover:text-[#e3e3f4] bg-indigo-500 rounded-md p-2 mb-4 sm:absolute sm:top-6 sm:left-6 cursor-pointer"
      >
        <ArrowLeft className="mr-2 w-5 h-5" />
        <span className="text-sm sm:text-base font-medium">Back</span>
      </button>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#3f1063]">
        About MMUY 2024-25
      </h1>

      {/* Content */}
      <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
        <p>
          <strong className="text-[#3f1063]">Welcome to the Udyami Yojna Chatbot</strong> – Your Smart Assistant for Entrepreneurial Growth!
        </p>

        <p>
          The Udyami Yojna Chatbot is an AI-powered virtual assistant developed to help aspiring and existing entrepreneurs navigate the Udyami Yojna scheme more efficiently and independently. It provides instant answers to commonly asked questions, guidance on eligibility, application procedures, documentation requirements, and more.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold text-[#3f1063]">Our Mission</h2>
        <p>
          We aim to empower entrepreneurs by making access to government schemes simpler, faster, and more transparent. The goal is to bridge the information gap and reduce dependency on intermediaries through reliable and real-time support.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold text-[#3f1063]">Key Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>📌 24/7 Availability:</strong> Get answers to your queries anytime, anywhere.</li>
          <li><strong>📂 Scheme Guidance:</strong> Understand benefits, eligibility, documents, and application steps.</li>
          <li><strong>🔄 Context-Aware:</strong> Ask follow-up questions and continue your conversation naturally.</li>
          <li><strong>🤝 Officer Assistance:</strong> Directs you to the right authority when expert help is needed.</li>
          <li><strong>🧠 Learning System:</strong> Continuously updated to improve accuracy and handle new queries.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold text-[#3f1063]">Who We Are</h2>
        <p>
          We are a team of developers, policy experts, and innovation enthusiasts committed to making government schemes more accessible. The chatbot leverages natural language processing (NLP) and AI-driven information retrieval to deliver the most relevant and up-to-date responses.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutUs;
