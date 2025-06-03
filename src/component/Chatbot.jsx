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

        if (data.query_logged) {
          alert(data.logged_message);
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
      className="relative rounded-lg shadow-md w-[95%] sm:w-[90%] md:w-[600px] lg:w-[640px]   flex flex-col sm:h-[80vh] h-[70vh] bg-[#ffffff] sm:mb-20  sm:mt-4  "
    >
      {/* Header */}
<div
  className="w-full sm:h-32 h-28 rounded-lg shadow-sm flex items-center justify-between px-4 relative mb-4"
  style={{
    background: "linear-gradient(143deg,rgba(136, 82, 242, 1) 37%, rgba(64, 127, 245, 1) 80%)",
  }}
>        {/* Left section: Logo + Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/src/assets/chatbot_profile.jpg" // replace with your logo path
            alt="Chatbot Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full"
          />
          <h1 className="text-white sm:text-lg text-base font-semibold font-sans">
            HelloUdyami
          </h1>
        </div>

        {/* Right section: Bulb + Back Button */}
        <div className="flex items-center space-x-10">
          <BlinkingBulb isUserTyping={isTyping} isBotThinking={isThinking} />

          <button onClick={onBack}>
            <img
              src="/src/assets/close.png"
              alt="Back"
              className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* <UserProfileHeader /> */}

      {/* Scrollable chat area */}
      <div
        ref={chatContainerRef}
        className="flex-grow basis-[90%] overflow-y-auto mb-2 pr-2 sm:mt-3 mt-0 rounded-lg"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col ${
                msg.type === "user" ? "items-end" : "items-start"
              } 
                mx-4 max-w-[75%]`}
            >
              {/* Avatar on top */}
              {/* <img
                src={
                  msg.type === "user"
                    ? "/src/assets/human_image.png"
                    : "/src/assets/chatbot_profile.jpg"
                }
                alt={msg.type === "user" ? "User" : "Chatbot"}
                className="w-8 h-8 rounded-full mb-1"
              /> */}

              {/* Message box */}
              <div
                className="px-3 py-2 rounded-t-xl rounded-bl-xl text-sm flex flex-col"
                style={{
                  background: msg.type === "user" ? 'linear-gradient(to right, #506cfa, #8f6bfa)' : "#f2f2f5",
                  wordBreak: "break-word",
                  color: msg.type === "user" ? "white" : "#5c5c5e",
                  width: "auto",
                  alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
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
                <span className="text-xs text-gray-800 mt-1 self-start">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left italic w-fit bg-[#719ced] rounded-md px-3 py-1 text-sm ml-2 text-white">
            thinking...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex items-center sm:mt-0 mt-0 sm:mb-2 mb-4 mx-2 space-x-2">
        <input
          type="text"
          className="w-full sm:h-8 h-7 px-4 text-sm rounded-full border border-[#719ced] focus:outline-none focus:ring-1 focus:ring-[#7a9dee] transition duration-300 ease-in-out"
          style={{ backgroundColor: "#f5f5f5", color: "black" }}
          value={userQuery}
          onChange={(e) => {
            setUserQuery(e.target.value);
            setIsTyping(true);

            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
              setIsTyping(false);
            }, 1000);
          }}
          placeholder="Ask me something..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="sm:h-8 h-7 cursor-pointer px-6 text-sm text-white bg-gradient-to-r from-[#8552f2] to-[#4281f5] rounded-full hover:bg-[#719cedd4] focus:outline-none transition duration-300 ease-in-out"
        >
          <img
            className="h-6 w-8"
            src="\src\assets\back_image.png"
            alt="send"
          />
        </button>
      </div>
    </motion.div>
  );
}

export default Chatbot;
