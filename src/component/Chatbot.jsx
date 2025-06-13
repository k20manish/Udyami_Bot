import { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";

import { motion } from "framer-motion";
import BlinkingBulb from "./BlinkingBulb";

function Chatbot({ initialQuery, onBack }) {
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(
    () => localStorage.getItem("user_id") || ""
  );
  const [language, setLanguage] = useState("en");
  const hasHandledInitialQuery = useRef(false);
  const chatContainerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const [userQuery, setUserQuery] = useState("");

  // Typing glow logic
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleRefresh = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setMessages([]);
    setUserQuery("");
    setIsThinking(false);
    setLoading(false);
    setUserId("");
    localStorage.removeItem("user_id");

    // prevent initialQuery from re-triggering
    hasHandledInitialQuery.current = true;
  };

  const navigate = useNavigate();

  const formatResponseAsMarkdown = (text) => {
    const lines = text.split("\n").map((line) => line.trim());
    const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line));
    const isBulletList = lines.every((line) => /^[-*•]\s+/.test(line));

    if (isNumberedList) return lines.join("\n");
    if (isBulletList)
      return lines
        .map((line) => `- ${line.replace(/^[-*•]\s+/, "")}`)
        .join("\n");

    return text;
  };

  const fetchChatbotResponse = useCallback(
    async (query) => {
      if (!query.trim()) return;

      setMessages((prev) => [
        ...prev,
        {
          text: query,
          type: "user",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setLoading(true);
      // console.log("Setting isThinking to true");
      setIsThinking(true);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(
          "https://chatbot-final-hvuc.onrender.com/chat",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: query,
              user_id: userId,
              language: language,
            }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (!userId && data.user_id) {
          setUserId(data.user_id);
          localStorage.setItem("user_id", data.user_id);
        }

      if (data.helpline_log && data.helpline_log.query_logged) {
        // Access fields directly 
          const name = data.helpline_log.logged_name || "N/A";
          const applicationId = data.helpline_log.logged_application_id || "N/A";
          const mobileNumber = data.helpline_log.logged_mobile_number || "N/A";
          const query = data.helpline_log.logged_issue || "N/A";

          console.log("Name:", name);
          console.log("Application ID:", applicationId);
          console.log("Mobile Number:", mobileNumber);
          console.log("Query:", query);

          alert(
            `Query Logged:\n\nName: ${name}\nApplication ID: ${applicationId}\nMobile: ${mobileNumber}\nQuery: ${query}`
          );
        }

        setMessages((prev) => [
          ...prev,
          {
            text: formatResponseAsMarkdown(data.response),
            type: "bot",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Chatbot Error:", error);
          setMessages((prev) => [
            ...prev,
            {
              text: "Error fetching response.",
              type: "bot",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }
      }

      setLoading(false);
      // console.log("Setting isThinking to false");
      setIsThinking(false);
    },
    [userId, language]
  );

  useEffect(() => {
    if (initialQuery && !hasHandledInitialQuery.current) {
      fetchChatbotResponse(initialQuery);
      hasHandledInitialQuery.current = true;
    }
  }, [initialQuery, fetchChatbotResponse]);

  const handleSendMessage = () => {
    if (userQuery.trim()) {
      fetchChatbotResponse(userQuery);
      setUserQuery("");
      setIsTyping(false); // Stop glowing on send
      clearTimeout(typingTimeoutRef.current);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    return () => clearTimeout(typingTimeoutRef.current);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl shadow-md w-[95%] sm:w-[90%] md:w-[600px] lg:w-[640px]  flex flex-col sm:h-[80vh] h-[75vh] sm:mb-20  sm:mt-4  "
      style={{
        background:
          "linear-gradient(47deg,rgba(136, 82, 242, 1) 48%, rgba(64, 127, 245, 1) 80%)",
      }}
    >
      {/* Header */}
      <div className="w-full sm:h-14 h-15  flex items-center justify-between px-4 relative ">
        {" "}
        {/* Left section: Logo + Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/udymai.png" // replace with your logo path
            alt="Chatbot Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full"
          />
          <h1 className="text-white sm:text-lg text-base font-semibold font-glida tracking-wider">
            HelloUdyami
          </h1>
        </div>
        {/* Right section: Bulb + Back Button */}
        <div className="flex items-center sm:space-x-14 space-x-9">
          <BlinkingBulb isUserTyping={isTyping} isBotThinking={isThinking} />

          <button
            className="bg-[#6298fc] p-1 rounded-full sm:mt-1 mt-1"
            onClick={onBack}
          >
            <img
              src="/close.png"
              alt="Back"
              className="w-4 h-4  sm:w-6 sm:h-6 cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* <UserProfileHeader /> */}

      {/* Scrollable chat area */}
      <div className="flex flex-col h-[85%] bg-white rounded-xl mx-2 sm:mt-3 mt-2 sm:mb-4 mb-1">
        {/* Scrollable Chat Area */}
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto pr-1 ">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 mt-2 flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.type === "bot" && (
                <img
                  src="/unnamed.jpg"
                  alt="Bot"
                  className="sm:w-8 sm:h-8 w-5 h-5  self-start mt-0 ml-1"
                  style={{
                    borderRadius:
                      msg.type === "user" ? "0" : "30px 30px 0 30px",
                  }}
                />
              )}

              <div
                className={`flex flex-col ${
                  msg.type === "user" ? "items-end" : "items-start"
                } mx-1 max-w-[75%]`}
              >
                <div
                  className="px-3 py-1 ml-1 mr-2 text-sm flex flex-col font-orbitron tracking-wider"
                  style={{
                    background:
                      msg.type === "user"
                        ? "linear-gradient(45deg,rgba(136, 82, 242, 1) 38%, rgba(66, 126, 245, 1) 80%)"
                        : "#f2f2f5",
                    wordBreak: "break-word",
                    color: msg.type === "user" ? "white" : "#2b2b2e",
                    width: "auto",
                    alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                    borderRadius:
                      msg.type === "user"
                        ? "10px 10px 0 10px"
                        : "10px 10px 10px 10px",
                    boxShadow:
                      msg.type === "user"
                        ? "0 0 0 1px rgba(90, 50, 150, 0.7)"
                        : "0 0 0 1px rgba(150, 150, 150, 0.6)",
                  }}
                >
                  {msg.type === "bot" ? (
                    <ReactMarkdown
                      components={{
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-5 my-2">{children}</ol>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 my-2">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="mb-1">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                  <span
                    className="text-[10px] text-gray-200 mt-1 self-start"
                    style={{
                      color: msg.type === "user" ? "white" : "#5c5c5e",
                    }}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="mb-2 mt-2 flex justify-start">
              

              {/* "Thinking..." bubble */}
              <div
                className="italic text-sm text-white px-3 py-1 ml-2 mt-1 rounded-md"
                style={{
                  background:
                    "linear-gradient(47deg,rgba(136, 82, 242, 1) 48%, rgba(64, 127, 245, 1) 80%)",
                  borderRadius: "30px 30px 0 30px",
                }}
              >
                thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="w-full px-2 py-2 flex items-center space-x-2 border-t border-gray-200">
          <input
            type="text"
            className="w-full sm:h-12 h-8 px-4 text-sm  outline-none text-black "
            style={{ color: "black" }}
            value={userQuery}
            onChange={(e) => {
              setUserQuery(e.target.value);
              setIsTyping(true);
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(
                () => setIsTyping(false),
                1000
              );
            }}
            placeholder="Ask me something..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="sm:h-9 h-8 cursor-pointer px-4 mr-2 text-sm text-white bg-gradient-to-r from-[#8552f2] to-[#4281f5] rounded-full hover:bg-[#719cedd4] focus:outline-none transition duration-300 ease-in-out"
          >
            <img
              className="h-6 w-8"
              src="/back_image.png"
              alt="send"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Chatbot;
