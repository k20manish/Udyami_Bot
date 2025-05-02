import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Chatbot from "./Chatbot";
import {
  Lightbulb,
  Briefcase,
  Banknote,
  GraduationCap,
  Heart,
  Globe,
  Building2,
} from "lucide-react";
import closeIcon from "../assets/close.png";
import searchIcon from "../assets/search-interface-symbol.png";
import Footer from './Footer'; // adjust path if needed


const schemeIcons = {
  "What is Udyami Yojna?": <Lightbulb className="mr-2 text-yellow-500" />,
  "Who is eligible for Udyami Yojna?": <Briefcase className="mr-2 text-green-500" />,
  "उद्यामी योजना के लिए आवेदन कैसे करें?": <Banknote className="mr-2 text-blue-500" />,
  "उद्यामी योजना से क्या लाभ प्राप्त होते हैं?": <GraduationCap className="mr-2 text-purple-500" />,
  "उद्यामी योजना के बारे में अधिक जानकारी कहाँ प्राप्त करें?": <Globe className="mr-2 text-teal-500" />,
  "उद्यामी योजना में पीएमईजीपी की भूमिका क्या है?": <Building2 className="mr-2 text-red-500" />,
    "How does Udyami Yojna support digital initiatives?": <Heart className="mr-2 text-pink-500" />,
  "What training and mentorship opportunities does Udyami Yojna offer?": <Briefcase className="mr-2 text-indigo-500" />,
  "How is Udyami Yojna evaluated and ranked?": <GraduationCap className="mr-2 text-orange-500" />,
  };

function InputField() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);
  const [triggeredQuery, setTriggeredQuery] = useState(null);
  const wrapperRef = useRef(null);

  const handleSearch = () => {
    if (value.trim() !== "") {
      setIsFocused(false);
      setSearch(true);
      setTriggeredQuery(value);
    }
  };

  const handleInputValue = (e) => {
    setValue(e.target.value);
  };

  const handleSuggestionSelect = (query) => {
    setValue(query);
    setIsFocused(false);
    setSearch(true);
    setTriggeredQuery(query);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#f1f1db] h-[575px] w-full flex justify-center items-center">
      <div className="relative w-fit h-fit flex flex-col items-center rounded-3xl">
        {/* Input Box */}
        {!search && (
          <motion.div
            initial={{ y: 0, scale: 1 }}
            animate={isFocused ? { y: -250, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{
              type: "tween",
              stiffness: 300,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="w-full flex justify-center items-center relative"
          >
            <input
              value={value}
              ref={wrapperRef}
              onFocus={() => setIsFocused(true)}
              onChange={handleInputValue}
              className={`h-12 w-96 pl-12 pr-10 rounded-full font-medium text-[#000000]
                placeholder-[#131212] bg-[#d7d7d7] border-2
                ${isFocused ? "border-[#fbeeee] ring-1 ring-[#dadada]" : "border-[#bcbcbc]"}
                focus:outline-none transition duration-300`}
              type="text"
              placeholder="Search here..."
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            {/* Search Icon */}
            <img
              onClick={handleSearch}
              className="h-5 w-5 absolute left-4 top-3 cursor-pointer"
              src={searchIcon}
              alt="search"
            />

            {/* Close Icon */}
            <img
              onClick={() => setValue("")}
              className="h-5 w-5 absolute right-4 top-3 cursor-pointer"
              src={closeIcon}
              alt="close"
            />
          </motion.div>
        )}

        {/* Suggestions Dropdown */}
        {isFocused && (
          <motion.div
            initial={{ y: 0, scale: 1 }}
            animate={isFocused ? { y: -240, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{
              type: "tween",
              stiffness: 300,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="absolute top-full mt-1 bg-[#d7d7d7] shadow-md rounded-md w-96 p-2 z-10 overflow-x-hidden"
          >
            {Object.entries(schemeIcons).map(([question, icon]) => (
              <div
                key={question}
                onMouseDown={() => handleSuggestionSelect(question)}
                className="cursor-pointer hover:bg-[#a4a2a2] text-[#0f0e0f] p-2 rounded flex items-center"
              >
                {icon}
                <span className="ml-2">{question}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Chatbot */}
        {search && triggeredQuery && (
          <Chatbot initialQuery={triggeredQuery} />
        )}
      </div>
    
    {/* footer */}
     
      
    <Footer />
     
     
    </div>


  );
}

export default InputField;
