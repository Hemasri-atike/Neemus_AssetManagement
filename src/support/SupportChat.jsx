import React, { useState, useRef, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy"; 
import PersonIcon from "@mui/icons-material/Person"; 


const SupportChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // Simulate natural typing delay
      setTimeout(() => {
        const botMsg = { sender: "bot", text: data.reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 1000);

    } catch (err) {
      console.error(err);
      setIsTyping(false);
    }
  };

  return (
    <div className="font-sans">
      {/* 🔵 Floating Button with Pulse Effect */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[999] p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 ${open
            ? "bg-rose-500 text-white rotate-90"
            : "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/40 shadow-lg"
          }`}
      >
        {open ? <CloseIcon className="transition-all duration-300" /> : <ChatIcon className="transition-all duration-300" />}
        {!open && <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
        </span>}
      </button>

      {/* 💬 Modern Chat Box with Glassmorphism */}
      <div
        className={`fixed bottom-24 right-6 z-[999] w-[350px] sm:w-[380px] h-[550px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-white/20 transition-all duration-500 ease-out transform ${open ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"
          }`}
      >

        {/* Premium Header */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white p-5 flex justify-between items-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                <SmartToyIcon className="text-white drop-shadow-md" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-indigo-600 rounded-full animate-pulse"></span>
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight leading-tight">Neemus Assistant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 bg-white/20 px-1.5 py-0.5 rounded">Online</span>
                <span className="text-[10px] opacity-70">Replies in seconds</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Custom Scrollable Message Container */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-100 transition-all duration-700">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner">
                <SmartToyIcon fontSize="large" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Hello there! 👋</p>
                <p className="text-xs text-gray-500 max-w-[200px] mx-auto mt-1">
                  How can I help you today? Ask me about asset management or reports.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2 px-4">
                {["Check Assets", "Recent Reports", "Support"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setInput(chip)}
                    className="text-[11px] font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 transition-all duration-300 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.sender === "user" ? "bg-indigo-100" : "bg-blue-100 text-blue-600"
              }`}>
                {msg.sender === "user" ? <PersonIcon style={{ fontSize: 14 }} className="text-indigo-600" /> : <SmartToyIcon style={{ fontSize: 14 }} />}
              </div>

              <div
                className={`group relative px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all hover:shadow-md ${msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
                    : "bg-white border border-gray-100 text-gray-700 rounded-bl-none"
                  } max-w-[80%]`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span className={`text-[9px] mt-1 block opacity-0 group-hover:opacity-60 transition-opacity duration-300 ${msg.sender === "user" ? "text-right" : "text-left"
                  }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end gap-2 transition-opacity duration-300">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <SmartToyIcon style={{ fontSize: 14 }} />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Refined Input Bar */}
        <div className="p-4 bg-white border-t border-gray-50 relative z-10 transition-all duration-300 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 bg-gray-50/80 p-1.5 rounded-2xl border border-gray-100 focus-within:bg-white focus-within:shadow-lg focus-within:border-blue-200 transition-all duration-300 group">
            <input
              className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's on your mind?..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`p-2 rounded-xl transition-all duration-300 ${input.trim()
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 rotate-0 hover:bg-indigo-600"
                  : "bg-gray-200 text-gray-400 -rotate-45 opacity-60"
                }`}
            >
              <SendIcon style={{ fontSize: 18 }} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-3 font-medium opacity-60 italic uppercase tracking-[0.1em]">Powered by Neemus AI</p>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
