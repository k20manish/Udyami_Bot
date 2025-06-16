import { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import BlinkingBulb from "./BlinkingBulb";
import { motion } from "framer-motion";

const GRADIENT_USER = "linear-gradient(45deg,rgba(136, 82, 242, 1) 38%, rgba(66, 126, 245, 1) 80%)";
const GRADIENT_BG = "linear-gradient(47deg,rgba(136, 82, 242, 1) 48%, rgba(64, 127, 245, 1) 80%)";
const SCHEME_PROMPT = "Could you please clarify which sub-scheme you're referring to under Udyami Yojna — MMUY or BLUY";

function Chatbot({ initialQuery, onBack }) {
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(() => localStorage.getItem("user_id") || "");
  const [language] = useState("en");
  const [userQuery, setUserQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const hasHandledInitialQuery = useRef(false);
  const chatContainerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const navigate = useNavigate();

  const formatMarkdown = (text) => {
    const lines = text.split("\n").map((l) => l.trim());
    const numbered = lines.every((l) => /^\d+\.\s+/.test(l));
    const bulleted = lines.every((l) => /^[-*•]\s+/.test(l));
    if (numbered) return lines.join("\n");
    if (bulleted) return lines.map((l) => `- ${l.replace(/^[-*•]\s+/, "")}`).join("\n");
    return text;
  };

  const fetchChatbotResponse = useCallback(
    async (query) => {
      if (!query.trim()) return;

      setMessages((p) => [
        ...p,
        { text: query, type: "user", timestamp: new Date().toLocaleTimeString() },
      ]);

      setLoading(true);
      setIsThinking(true);

      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      try {
        const res = await fetch("https://chatbot-final-hvuc.onrender.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: query, user_id: userId, language }),
          signal: abortControllerRef.current.signal,
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const data = await res.json();

        if (!userId && data.user_id) {
          setUserId(data.user_id);
          localStorage.setItem("user_id", data.user_id);
        }

        setMessages((p) => [
          ...p,
          {
            text: formatMarkdown(data.response),
            type: "bot",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Chatbot Error:", err);
          setMessages((p) => [
            ...p,
            { text: "Error fetching response.", type: "bot", timestamp: new Date().toLocaleTimeString() },
          ]);
        }
      }

      setLoading(false);
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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => () => clearTimeout(typingTimeoutRef.current), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl shadow-md w-[95%] sm:w-[90%] md:w-[600px] lg:w-[640px] flex flex-col sm:h-[80vh] h-[75vh] sm:mb-16"
      style={{ background: GRADIENT_BG }}
    >
      <div className="w-full sm:h-14 h-15 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img
            src="/udymai.png"
            alt="logo"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-contain"
          />
          <h1 className="text-white sm:text-lg text-base font-semibold tracking-wider font-glida">
            Hello Udyami
          </h1>
        </div>
        <div className="flex items-center sm:space-x-14 space-x-9">
          <BlinkingBulb isUserTyping={isTyping} isBotThinking={isThinking} />
          <button onClick={onBack} className="bg-[#6298fc] p-1 rounded-full">
            <img src="/close.png" alt="close" className="sm:w-6 sm:h-6 w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col h-[85%] bg-white rounded-xl mx-2 sm:mt-3 mt-2 sm:mb-4 mb-1">
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto pr-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 mt-2 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.type === "bot" && (
                <img
                  src="/unnamed.jpg"
                  alt="Bot"
                  className="sm:w-8 sm:h-8 w-5 h-5 self-start ml-1"
                  style={{ borderRadius: "30px" }}
                />
              )}

              <div
                className={`flex flex-col mx-1 max-w-[75%] ${msg.type === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className="px-3 py-1 ml-1 mr-2 text-sm tracking-wider font-orbitron"
                  style={{
                    background: msg.type === "user" ? GRADIENT_USER : "#f2f2f5",
                    color: msg.type === "user" ? "white" : "#2b2b2e",
                    borderRadius: msg.type === "user" ? "10px 10px 0 10px" : "10px",
                    boxShadow:
                      msg.type === "user"
                        ? "0 0 0 1px rgba(90, 50, 150, 0.7)"
                        : "0 0 0 1px rgba(150, 150, 150, 0.6)",
                  }}
                >
                  {msg.type === "bot" && msg.text.trim() === SCHEME_PROMPT ? (
                    <div className="flex flex-col space-y-2">
                      <p className="text-[#2b2b2e] text-sm font-medium">Please choose a scheme:</p>
                      <div className="flex space-x-2">
                        {["BLUY", "MMUY"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              fetchChatbotResponse(opt);
                            }}
                            className="bg-gradient-to-r from-[#8552f2] to-[#4281f5] text-white text-xs px-3 py-1 rounded-full hover:opacity-90"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : msg.type === "bot" ? (
                    <ReactMarkdown
                      components={{
                        ol: ({ children }) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
                        ul: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                  <span
                    className="text-[10px] mt-1"
                    style={{ color: msg.type === "user" ? "white" : "#5c5c5e" }}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="mb-2 mt-2 flex justify-start">
              <div
                className="italic text-sm text-white px-3 py-1 ml-2 mt-1 rounded-md"
                style={{ background: GRADIENT_BG, borderRadius: "30px 30px 0 30px" }}
              >
                thinking...
              </div>
            </div>
          )}
        </div>

        <div className="w-full px-2 py-2 flex items-center space-x-2 border-t border-gray-200">
          <input
            type="text"
            className="w-full sm:h-12 h-8 px-4 text-sm outline-none text-black"
            value={userQuery}
            onChange={(e) => {
              setUserQuery(e.target.value);
              setIsTyping(true);
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 1000);
            }}
            placeholder="Ask me something..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="sm:h-9 h-8 px-4 mr-6 text-sm text-white bg-gradient-to-r from-[#8552f2] to-[#4281f5] rounded-full hover:opacity-90"
          >
            <img src="/back_image.png" alt="send" className="h-6 w-8" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  function handleSendMessage() {
    if (!userQuery.trim()) return;
    fetchChatbotResponse(userQuery);
    setUserQuery("");
    setIsTyping(false);
    setIsThinking(false);
  }
}

export default Chatbot;
