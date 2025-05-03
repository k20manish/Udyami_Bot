import { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

function Chatbot({ initialQuery,onBack  }) {
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


  const navigate = useNavigate();

  // Function to format list-like responses manually
  const formatResponseAsMarkdown = (text) => {
    const lines = text.split("\n").map(line => line.trim());

    const isNumberedList = lines.every(line => /^\d+\.\s+/.test(line));
    const isBulletList = lines.every(line => /^[-*•]\s+/.test(line));

    if (isNumberedList) {
      return lines.join("\n"); // Already markdown
    }

    if (isBulletList) {
      return lines.map(line => `- ${line.replace(/^[-*•]\s+/, "")}`).join("\n");
    }

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
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-4 rounded-lg shadow-md w-[400px] flex flex-col h-[500px] bg-[#faf5f5] mb-10">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#d9d7d7] to-[#edebeb] rounded-lg shadow-sm w-full mb-2">
      <button onClick={onBack}>
  <img
    src="\src\assets\back.png" // ← Use your actual arrow icon path
    alt="Back"
    className="w-5 h-5"
  />
</button>



  <img src="/src/assets/happy.png" alt="Bot Icon" className="w-6 h-6" />
  <h1 className="text-lg font-semibold text-gray-800">Udyami Bot</h1>
</div>

      {/* Scrollable chat area */}
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto mb-4 pr-2 mt-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              msg.type === "user" ? "justify-end ml-16" : "justify-start mr-16"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl text-sm`}
              style={{
                backgroundColor: msg.type === "user" ? "#e7e7e7" : "#cfc9c8",
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
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left italic w-fit bg-[#F1E7E7] rounded-md pl-2 text-sm">
            Bot is typing...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex items-center mt-4 space-x-2">
        <input
          type="text"
          className="w-full h-12 px-4 text-sm rounded-full border border-[#ccc] focus:outline-none focus:ring-1 focus:ring-[#cecece] transition duration-300 ease-in-out"
          style={{
            backgroundColor: "#f5f5f5",
            color: "black",
          }}
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask me something..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="h-12 px-6 text-sm text-black bg-[#9a9a9a] rounded-full hover:bg-[#8b8b8b] focus:outline-none transition duration-300 ease-in-out"
        >
          <img className="h-8 w-8" src="\src\assets\text.png" alt="send" />
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
