import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBarNew from "./NavBarNew";
import InputField from "./InputField";

const HomePage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="overflow-hidden bg-transparent">
      <NavBarNew />

      <div
        className="relative isolate px-6 py-10 sm:py-10 lg:px-8 h-full flex flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))",
        }}
      >
        {/* Decorative Images - Left */}
        <div className="absolute left-0 top-0 sm:top-48 flex flex-col items-center scale-75 md:scale-90">
          <motion.img
            src="/src/assets/cm2.png"
            alt="Left Top"
            className="object-cover w-24 sm:w-28 h-24 sm:h-28 m-2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          />
          <h3 className="mt-1 text-xs sm:text-sm font-semibold text-center">
            Shri Nitish Kumar
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-600 text-center">
            Hon'ble Chief Minister, Bihar
          </p>

          <motion.img
            src="/src/assets/minister.png"
            alt="Left Bottom"
            className="object-cover w-24 sm:w-28 h-24 sm:h-28 m-2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          />
          <h3 className="mt-1 text-xs sm:text-sm font-semibold text-center">
            Shri Nitish Mishra
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-600 text-center">
            Hon'ble Minister, Industry Dept, Bihar
          </p>
        </div>

        {/* Decorative Images - Right */}
        <div className="absolute right-0 top-0 sm:top-48 flex flex-col items-center scale-75 md:scale-90 mr-4">
          <motion.img
            src="/src/assets/5.png"
            alt="Right Top"
            className="object-cover w-24 sm:w-28 h-24 sm:h-28 m-2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          />
          <h3 className="mt-1 text-xs sm:text-sm font-semibold text-center">
            Govt. of Bihar
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-600 text-center">
            Bihar, India
          </p>

          <motion.img
            src="/src/assets/4.png"
            alt="Right Bottom"
            className="object-cover w-24 sm:w-28 h-24 sm:h-28 m-2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          />
          <h3 className="mt-1 text-xs sm:text-sm font-semibold text-center">
            Dept. of Industries
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-600 text-center">
            Govt. of Bihar
          </p>
        </div>

        {/* Input Field with Focus Animation */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className={`w-full max-w-2xl transition-all duration-500 ease-in-out ${
            isInputFocused ? "translate-y-[-60px] scale-105" : ""
          }`}
        >
          <InputField onFocusChange={(focused) => setIsInputFocused(focused)} />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
