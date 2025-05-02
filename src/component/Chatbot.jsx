import { useEffect, useState, useRef, useCallback } from "react";

function Chatbot({ initialQuery }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(
    () => localStorage.getItem("user_id") || ""
  );
  const [language, setLanguage] = useState("en");
  const hasHandledInitialQuery = useRef(false);
  const chatContainerRef = useRef(null);


  const abortControllerRef = useRef(null);

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
            text: data.response,
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

  const [userQuery, setUserQuery] = useState("");

  const handleSendMessage = () => {
    if (userQuery.trim()) {
      fetchChatbotResponse(userQuery);
      setUserQuery("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-4 rounded-lg shadow-md w-[400px] flex flex-col h-[500px] bg-[#faf5f5] mb-10">
      {/* Header */}
      <div className="flex items-center justify-start p-2 border-b-2 border-gray-300">
        <h1 className="text-lg font-bold text-black">Udyami Bot</h1>
      </div>

      {/* Scrollable chat area */}
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 pr-2 mt-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${msg.type === "user" ? "justify-end ml-16" : "justify-start mr-16"}`}
          >
            <div
              className={`px-4 py-2 rounded-xl`}
              style={{
                backgroundColor: msg.type === "user" ? "#e7e7e7" : "#ebbbb2",
                maxWidth: "100%",
                wordBreak: "break-word",
                color: "black", // Text color set to black
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left italic w-fit bg-[#F1E7E7] rounded-md pl-2">
            Bot is typing...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="w-full p-2 border rounded-l-md focus:outline-none"
          style={{
            backgroundColor: "#edebeb",
            color: "black", // Text color set to black
            borderColor: "#cccccc",
          }}
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask me something..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="p-2 text-black rounded-r-md"
          style={{
            backgroundColor: "#949191",
            borderLeft: "1px solid #696868",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
