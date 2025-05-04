import { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";
import LightOn from "../assets/LightOn.png";
import LightbulbOff from "../assets/LightOff.png";

function Chatbot({ initialQuery, onBack }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(() => localStorage.getItem("user_id") || "");
  const [language, setLanguage] = useState("en");
  const hasHandledInitialQuery = useRef(false);
  const chatContainerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const [userQuery, setUserQuery] = useState("");

  // Typing glow logic
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const navigate = useNavigate();

  const formatResponseAsMarkdown = (text) => {
    const lines = text.split("\n").map((line) => line.trim());
    const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line));
    const isBulletList = lines.every((line) => /^[-*•]\s+/.test(line));

    if (isNumberedList) return lines.join("\n");
    if (isBulletList)
      return lines.map((line) => `- ${line.replace(/^[-*•]\s+/, "")}`).join("\n");

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

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch("https://chatbot-final-hvuc.onrender.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: query,
            user_id: userId,
            language: language,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (!userId && data.user_id) {
          setUserId(data.user_id);
          localStorage.setItem("user_id", data.user_id);
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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    return () => clearTimeout(typingTimeoutRef.current);
  }, []);

  return (
    <div className="rounded-lg shadow-md w-[350px] flex flex-col h-[500px] bg-[#ffffff] mb-10 mt-20">
      {/* Header */}
      <div className="w-full h-16 flex-shrink-0 relative rounded-t-lg shadow-sm bg-[#ed71c4] flex items-center px-3">

        <button onClick={onBack}>
          <img src="\src\assets\back.png" alt="Back" className="w-5 h-5 cursor-pointer" />
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-[#000000] font-sans">
          Udyami Bot
        </h1>
        {/* Bulb icon shows based on typing state */}
        <div className="absolute right-3">
          {isTyping ? (
            <img className="h-8 w-8" src={LightOn} alt="Typing..." />
          ) : (
            <img className="h-8 w-8" src={LightbulbOff} alt="Idle..." />
          )}
        </div>
      </div>

      <UserProfileHeader />

      {/* Scrollable chat area */}
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto mb-1 pr-2 mt-3 rounded-lg"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-1 flex ${
              msg.type === "user"
                ? "justify-end ml-20 mb-2"
                : "justify-start mr-20 ml-4"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm flex flex-col`}
              style={{
                backgroundColor: msg.type === "user" ?'#bcaded' : "#f77ccc",
                maxWidth: "100%",
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
              <span className="text-xs text-white mt-1 self-end">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left italic w-fit bg-[#f77ccc] rounded-md px-3 py-1 text-sm ml-2 text-white">
            thinking...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex items-center mt-4 mb-2 mx-2 space-x-2">
        <input
          type="text"
          className="w-full h-8 px-4 text-sm rounded-full border border-[#eb35c1d5] focus:outline-none focus:ring-1 focus:ring-[#ec83dc] transition duration-300 ease-in-out"
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
          className="h-8 cursor-pointer px-6 text-sm text-white bg-[#f348b7] rounded-full hover:bg-[#c46da8f7] focus:outline-none transition duration-300 ease-in-out"
        >
          <img className="h-6 w-8" src="\src\assets\back_image.png" alt="send" />
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
