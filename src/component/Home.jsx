import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBarNew from "./NavBarNew";
import InputField from "./InputField";

const HomePage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="h-screen  bg-transparent">
      <NavBarNew />

      <div
        className="relative px-4 sm:px-6 pb-0 sm:pb-0 lg:px-8 h-screen flex flex-col items-center justify-center overflow-hidden py-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))",
        }}
      >
         

        {/* Left Decorative Images */}
        <div className="absolute left-0 top-1 sm:top-48 flex flex-col items-center scale-75 md:scale-90 sm:ml-2 ml-0  sm:mt-0 mt-8">
          <motion.img
            src="/src/assets/cm2.png"
            alt="Left Top"
            className="object-cover w-20 sm:w-24 h-20 sm:h-24 m-1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          />
          <h3 className="text-[10px] sm:text-xs font-semibold text-center">
            Shri Nitish Kumar
          </h3>
          <p className="text-[9px] sm:text-[10px] text-gray-600 text-center">
            Hon'ble Chief Minister, Bihar
          </p>

          <motion.img
            src="/src/assets/minister.png"
            alt="Left Bottom"
            className="object-cover w-20 sm:w-24 h-20 sm:h-24 m-1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          />
          <h3 className="text-[10px] sm:text-xs font-semibold text-center">
            Shri Nitish Mishra
          </h3>
          <p className="text-[9px] sm:text-[10px] text-gray-600 text-center">
            Hon'ble Minister, Industry Dept, Bihar
          </p>
        </div>

        {/* Right Decorative Images */}
        <div className="absolute right-4 top-1 sm:top-48 flex flex-col items-center scale-75 md:scale-90 sm:mr-2 mr-0 sm:mt-0 mt-8">
          <motion.img
            src="/src/assets/5.png"
            alt="Right Top"
            className="object-cover w-20 sm:w-24 h-20 sm:h-24 m-1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          />
          <h3 className="text-[10px] sm:text-xs font-semibold text-center">
            Govt. of Bihar
          </h3>
          <p className="text-[9px] sm:text-[10px] text-gray-600 text-center">
            Bihar, India
          </p>

          <motion.img
            src="/src/assets/4.png"
            alt="Right Bottom"
            className="object-cover w-20 sm:w-24 h-20 sm:h-24 m-1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          />
          <h3 className="text-[10px] sm:text-xs font-semibold text-center">
            Dept. of Industries
          </h3>
          <p className="text-[9px] sm:text-[10px] text-gray-600 text-center">
            Govt. of Bihar
          </p>
        </div>

        {/* Input Field */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className={`w-[90%] sm:w-full max-w-md sm:max-w-2xl transition-all duration-500 ease-in-out ${
            isInputFocused ? "translate-y-[-40px] scale-105" : ""
          }`}
        >
          <InputField onFocusChange={(focused) => setIsInputFocused(focused)} />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
