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
          "http://127.0.0.1:8000/chat",
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
          if (data.query_logged)
        {
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
      className="relative rounded-lg shadow-md sm:w-[350px] w-full flex flex-col sm:h-[80vh] h-[55vh] bg-[#ffffff] sm:mb-20 mb-20 sm:mt-4 mt-2 "
    >
      {/* Header */}
      <div className=" w-full sm:h-14 h-12 absoulte  rounded-t-lg shadow-sm bg-[#719ced] flex items-center ">
        <button onClick={onBack}>
          <img
            src="\src\assets\back.png"
            alt="Back"
            className="w-5 h-5 cursor-pointer ml-2"
          />
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 sm:text-lg text-md font-semibold text-white font-sans">
          Hello Udyami
        </h1>

        {/* Bulb icon shows based on typing state */}
        <BlinkingBulb isUserTyping={isTyping} isBotThinking={isThinking} />

        {/* refresh button */}
        <button onClick={handleRefresh}>
          <img
            className="sm:h-8 h-6 sm:w-8 w-6 absolute right-12 top-1.5 cursor-pointer"
            src="\src\assets\refresh.png"
            alt="refresh"
          />
        </button>
      </div>

      <UserProfileHeader />

      {/* Scrollable chat area */}
      <div
        ref={chatContainerRef}
        className="flex-grow basis-[90%] overflow-y-auto mb-2 pr-2 sm:mt-3 mt-0 rounded-lg"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-1 flex ${
              msg.type === "user"
                ? "justify-end sm:ml-10 ml-2 mb-2"
                : "justify-start sm:mr-10 mr-2 ml-2"
            }`}
          >
            <div
              className='px-3 py-2 rounded-lg text-sm flex flex-col'
              style={{
                backgroundColor: msg.type === "user" ? "#abc5f5" : "#e6e6e6",
                maxWidth: "90%",
                wordBreak: "break-word",
                color: "black",
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
                    li: ({ children }) => <li className="mb-1">{children}</li>,
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
          className="w-full h-8 px-4 text-sm rounded-full border border-[#719ced] focus:outline-none focus:ring-1 focus:ring-[#7a9dee] transition duration-300 ease-in-out"
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
          className="h-8 cursor-pointer px-6 text-sm text-white bg-[#719ced] rounded-full hover:bg-[#719cedd4] focus:outline-none transition duration-300 ease-in-out"
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