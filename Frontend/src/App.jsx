import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Mic, Send, BookOpen, User, Sun, Moon,
  GraduationCap, Gamepad2, Menu, X, Sparkles,
  ChevronRight
} from 'lucide-react';

// const API_URL = "http://localhost:5000/api";
const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = "69554c84d10abfad047d2862";

function App() {
  // State
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Configuration State
  const [config, setConfig] = useState({
    classLevel: 5,
    subject: "Science",
    persona: "teacher"
  });

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Speech to Text
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Browser does not support speech recognition.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  // Send Message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentPersona = config.persona;
    const userMsg = { role: 'user', content: input };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        userId: USER_ID,
        message: input,
        currentSubject: config.subject,
      });

      const aiMsg = {
        role: 'model',
        content: res.data.response,
        persona: currentPersona
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "⚠️ Brain freeze! Try again.", persona: 'system' }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const formatText = (text) => {
    return text.split('**').map((part, i) =>
      i % 2 === 1 ? <strong key={i} className={darkMode ? "text-blue-400 font-bold" : "text-blue-600 font-bold"}>{part}</strong> : part
    );
  };

  return (
    // CHANGE 1: 'h-screen' ensures the app never grows taller than the viewport
    <div className={`${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-gray-50 text-slate-800'} transition-colors duration-300 h-[100dvh] flex font-sans overflow-hidden selection:bg-blue-500/30`}>

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-30 h-full w-80 transform transition-transform duration-300 ease-in-out flex flex-col
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
        ${darkMode ? 'bg-slate-900/95 backdrop-blur-xl border-r border-white/5' : 'bg-white/90 backdrop-blur-xl border-r border-gray-200'}
      `}>
        <div className="p-6 flex justify-between items-center shrink-0">
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            <Sparkles className="text-blue-500 fill-blue-500" size={24} /> Antimind Sparkles
          </h1>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden p-2 rounded-full hover:bg-slate-800/50 transition">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
          {/* Class Level Slider */}
          <div className="group">
            <div className="flex justify-between mb-3 items-end">
              <label className="text-xs font-bold uppercase tracking-wider opacity-60">Class Level</label>
              <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{config.classLevel}</span>
            </div>
            <input
              type="range" min="1" max="12"
              value={config.classLevel}
              onChange={(e) => setConfig({ ...config, classLevel: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
            />
            <div className="flex justify-between text-[10px] font-medium opacity-40 mt-2">
              <span>Junior (1)</span>
              <span>Senior (12)</span>
            </div>
          </div>

          {/* Subject Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-3">Subject Focus</label>
            <div className="relative group">
              <select
                className={`w-full p-4 pl-4 pr-10 rounded-2xl appearance-none outline-none transition-all font-medium cursor-pointer
                  ${darkMode
                    ? 'bg-slate-800 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 text-white'
                    : 'bg-white border border-gray-200 focus:border-blue-500 shadow-sm text-slate-800'}`}
                value={config.subject}
                onChange={(e) => setConfig({ ...config, subject: e.target.value })}
              >
                {["Science", "Mathematics", "History", "English", "Computer"].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <ChevronRight size={16} className="rotate-90" />
              </div>
            </div>
          </div>

          {/* Persona Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-3">Learning Style</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'teacher', icon: GraduationCap, label: 'Teacher', color: 'blue' },
                { id: 'friend', icon: Gamepad2, label: 'Buddy', color: 'green' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setConfig({ ...config, persona: p.id })}
                  className={`p-4 rounded-2xl flex flex-col items-center gap-3 transition-all duration-200 relative overflow-hidden group
                    ${config.persona === p.id
                      ? `ring-2 ring-${p.color}-500 bg-${p.color}-500/10`
                      : `hover:bg-slate-800/50 border ${darkMode ? 'border-slate-700 bg-slate-800/30' : 'border-gray-200 bg-white'}`}`}
                >
                  <p.icon
                    size={28}
                    className={`transition-colors duration-300 ${config.persona === p.id ? `text-${p.color}-500` : 'text-gray-400 group-hover:text-gray-500'}`}
                  />
                  <span className={`text-sm font-semibold ${config.persona === p.id ? `text-${p.color}-500` : 'text-gray-500'}`}>
                    {p.label}
                  </span>
                  {config.persona === p.id && (
                    <div className={`absolute inset-0 bg-${p.color}-500/5`} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`p-6 border-t shrink-0 ${darkMode ? 'border-white/5' : 'border-gray-200'}`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300 transform active:scale-95 font-semibold
              ${darkMode
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 shadow-lg shadow-black/20'
                : 'bg-white text-slate-700 border border-gray-200 hover:bg-gray-50 shadow-sm'}`}
          >
            {darkMode ? <Sun size={20} className="animate-spin-slow" /> : <Moon size={20} />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      {/* CHANGE 2: h-full ensures this container fills the screen height but doesn't overflow the page */}
      <main className="flex-1 flex flex-col h-full relative z-0 overflow-hidden">

        {/* Mobile Header */}
        <header className={`md:hidden p-4 flex justify-between items-center z-20 sticky top-0 backdrop-blur-md border-b shrink-0
          ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'}`}>
          <span className="font-bold flex items-center gap-2 text-xl tracking-wide opacity-80">
            {/* Class {config.classLevel} • {config.subject} */}
            <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              <Sparkles className="text-blue-500 fill-blue-500" size={24} /> Antimind Sparkles
            </h1>
          </span>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 -mr-2 active:scale-90 transition">
            <Menu size={24} />
          </button>
        </header>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 mix-blend-screen animate-pulse
                ${darkMode ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 mix-blend-screen animate-pulse delay-1000
                ${darkMode ? 'bg-purple-600' : 'bg-purple-400'}`}></div>
        </div>

        {/* Chat Messages Container */}
        {/* CHANGE 3: flex-1 allows this to grow, overflow-y-auto makes ONLY THIS section scroll */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 relative z-10 custom-scrollbar scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className={`p-8 rounded-3xl mb-6 shadow-2xl transform hover:scale-105 transition duration-500
                ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' : 'bg-white shadow-blue-100'}`}>
                <Sparkles size={64} className="text-blue-500 fill-blue-500/20" />
              </div>
              <h2 className="text-3xl font-black mb-3 tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Ready to learn with Sparkles?
              </h2>
              <p className="opacity-60 max-w-md mx-auto leading-relaxed">
                I'm your AI {config.persona === 'teacher' ? 'Teacher' : 'Study Buddy'}.
                Ask me anything about <span className="font-bold text-blue-500">{config.subject}</span>!
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex w-full group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[90%] md:max-w-[75%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg mt-1 transition-transform group-hover:scale-110
                  ${msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white'
                    : (msg.persona === 'friend'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                      : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white')
                  }`}>
                  {msg.role === 'user' ? <User size={18} /> : (msg.persona === 'friend' ? <Gamepad2 size={18} /> : <GraduationCap size={18} />)}
                </div>

                <div className={`p-5 rounded-3xl shadow-md text-[15px] leading-7 relative
                  ${msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none'
                    : (darkMode
                      ? 'bg-slate-800/80 backdrop-blur border border-slate-700/50 text-slate-200 rounded-tl-none'
                      : 'bg-white border border-gray-100 text-slate-700 rounded-tl-none')
                  }`}>
                  <div className="markdown-body">
                    {formatText(msg.content)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start w-full">
              <div className="flex items-center gap-3 ml-16 p-4 rounded-2xl bg-slate-800/50">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 md:p-6 shrink-0 z-20 backdrop-blur-xl border-t transition-colors
          ${darkMode ? 'bg-slate-900/80 border-white/5' : 'bg-white/80 border-gray-200'}`}>
          <div className={`flex items-end gap-2 p-2 pr-2 rounded-3xl border shadow-lg transition-all focus-within:ring-2 focus-within:ring-blue-500/30
            ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>

            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-full transition-all duration-300 flex-shrink-0
                ${isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-red-500/40 shadow-lg'
                  : `hover:bg-slate-700/50 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`
                }`}
            >
              <Mic size={22} />
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask a question..."
              className={`flex-1 bg-transparent outline-none py-3 px-2 text-base resize-none max-h-32 min-h-[50px]
                ${darkMode ? 'text-white placeholder-slate-500' : 'text-slate-800 placeholder-slate-400'}`}
              rows="1"
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`p-3 rounded-full transition-all transform active:scale-95 flex-shrink-0 mb-0.5
                ${input.trim()
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500'
                  : 'bg-gray-700/30 text-gray-500 cursor-not-allowed'}`}
            >
              <Send size={20} className={input.trim() ? "ml-0.5" : ""} />
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}

export default App;