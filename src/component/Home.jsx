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

      <div className="relative isolate px-6 py-10 sm:py-10 lg:px-8 h-full flex flex-col items-center justify-center overflow-hidden"

        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))",
        }}
      >
        {/* Decorative Images - Left */}
        <div className="absolute left-0 top-0 sm:top-48 flex flex-col items-center scale-75 md:scale-100">
          <motion.img
            src="/src/assets/cm2.png"
            alt="Left Top"
            className="object-cover w-36 sm:w-44 h-36 sm:h-44  m-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          />
          <motion.img
            src="/src/assets/minister.png"
            alt="Left Bottom"
            className="object-cover w-36 sm:w-44 h-36 sm:h-44  m-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          />
        </div>

        {/* Decorative Images - Right */}
        <div className="absolute right-0 top-0 sm:top-48 flex flex-col items-center scale-75 md:scale-100">
          <motion.img
            src="/src/assets/5.png"
            alt="Right Top"
            className="object-cover w-36 sm:w-44 h-36 sm:h-44   m-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          />
          <motion.img
            src="/src/assets/4.png"
            alt="Right Bottom"
            className="object-cover w-36 sm:w-44 h-36 sm:h-44  m-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          />
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
