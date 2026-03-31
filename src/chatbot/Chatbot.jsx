import React, { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const Chatbot = () => {
  const [chats, setChats] = useState([]);
  const [activeChatIndex, setActiveChatIndex] = useState(null);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const suggestions = [
  "show transfered assets",
  "Show all damaged assets",
  "show available assets",

 "total assets",
 "damaged assets",
 "available assets",

  "List all assets",
"show repaired assets",
 
];



  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, activeChatIndex, loading]);

  const sendMessage = async (directText = null) => {
    const messageText = directText ?? input;
    if (!messageText.trim()) return;

    const userMsg = {
      sender: "user",
      text: messageText,
      time: new Date().toLocaleTimeString(),
    };

    let updatedChats = [...chats];

    if (activeChatIndex === null) {
      // Create a new chat if none is active
      updatedChats.push({ name: `Chat ${chats.length + 1}`, messages: [userMsg] });
      setActiveChatIndex(updatedChats.length - 1);
    } else {
      // Add message to active chat
      updatedChats[activeChatIndex].messages.push(userMsg);
    }

    setChats(updatedChats);
    if (!directText) setInput("");
    else setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userMsg.text }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text: data.response || "No response",
        time: new Date().toLocaleTimeString(),
      };

      updatedChats = [...updatedChats];
      updatedChats[activeChatIndex || 0].messages.push(botMsg);
      setChats(updatedChats);
    } catch (err) {
      const errorMsg = {
        sender: "bot",
        text: "⚠️ Server error. Try again.",
        time: new Date().toLocaleTimeString(),
      };
      updatedChats = [...updatedChats];
      updatedChats[activeChatIndex || 0].messages.push(errorMsg);
      setChats(updatedChats);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleSuggestionClick = (text) => {
    sendMessage(text);
  };

  const startNewChat = () => {
    setActiveChatIndex(null);
    setInput("");
  };

  const activeMessages =
    activeChatIndex !== null ? chats[activeChatIndex].messages : [];

  return (
    <div
      className={`h-screen flex ${
        darkMode ? "bg-[#0f172a] text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Sidebar */}
    

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className={`p-4 border-b flex justify-between items-center ${
            darkMode ? "border-gray-700" : "bg-white"
          }`}
        >
          <h1 className="font-semibold">🤖 AI Chatbot Asset Management</h1>

          <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {activeMessages.length === 0 && (
            <div className="text-center text-gray-400 mt-10">
              Ask something like:
              <br />
              <span className="text-blue-500">"How many assets are there?"</span>
            </div>
          )}

          {activeMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-md text-sm shadow ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text.includes("|") ? (
  <table className="table-auto border border-collapse w-full text-xs">
    <tbody>
      {msg.text.split("\n").map((row, rowIndex) => {
        const cells = row.split("|").map(cell => cell.trim()).filter(Boolean);

        // Skip separator row (---)
        if (cells.every(c => c === "---")) return null;

        return (
          <tr key={rowIndex}>
            {cells.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="border px-2 py-1"
              >
                {cell}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
) : (
  msg.text
)}
                <div className="text-xs mt-1 opacity-60">{msg.time}</div>
              </div>
            </div>
          ))}

          {/* Typing animation */}
          {loading && (
            <div className="flex space-x-1 text-gray-400">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        {/* Suggestion Cards above input */}
        <div
          className={`px-4 pt-3 pb-1 flex flex-wrap gap-2 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <p
            className={`w-full text-xs font-semibold mb-1 tracking-wide uppercase ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            ✨ Quick Questions
          </p>
          {suggestions.map((text, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(text)}
              disabled={loading}
              style={{
                background: darkMode
                  ? "linear-gradient(135deg, #1e293b, #334155)"
                  : "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                boxShadow: darkMode
                  ? "0 2px 8px rgba(0,0,0,0.4)"
                  : "0 2px 8px rgba(0,0,0,0.08)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 6px 16px rgba(59,130,246,0.3)"
                  : "0 6px 16px rgba(59,130,246,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 2px 8px rgba(0,0,0,0.4)"
                  : "0 2px 8px rgba(0,0,0,0.08)";
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium border cursor-pointer ${
                darkMode
                  ? "border-gray-600 text-blue-300 hover:border-blue-500"
                  : "border-gray-200 text-blue-600 hover:border-blue-400"
              } ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {text}
            </button>
          ))}
        </div>


        {/* Input */}
        <div
          className={`p-4 border-t flex items-center ${
            darkMode ? "border-gray-700 bg-[#020617]" : "bg-white"
          }`}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`flex-1 p-3 rounded-xl outline-none ${
              darkMode ? "bg-gray-800 text-white" : "border border-gray-300"
            }`}
            placeholder="Send a message..."
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`p-3 ml-2 rounded-full flex items-center justify-center transition ${
              input.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <FaArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;