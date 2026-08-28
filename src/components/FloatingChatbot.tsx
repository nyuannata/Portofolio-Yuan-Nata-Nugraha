import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

const suggestedPrompts = [
  "Apa proyek utama Yuan?",
  "Pengalaman AI di ACC?",
  "Keahlian & Tech Stack",
  "Pendidikan & Skripsi"
];

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Halo! Saya asisten AI portofolio Yuan Nata Nugraha. Ada yang bisa saya bantu tentang pengalaman kerja, proyek, atau keahlian Yuan?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: queryText };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server.');
      }

      const data = await response.json();
      const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Maaf, terjadi kendala saat menghubungi server AI. Pastikan backend aktif.'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window — anchored right above the fixed button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 bg-zinc-950 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden w-80 sm:w-96 flex flex-col border border-zinc-800"
            style={{ height: '560px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-zinc-900/90 backdrop-blur-md border-b border-white/10 p-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center">
                  <Bot size={19} className="text-[#E8262A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white font-display">Yuan AI Assistant</h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#E8262A]/10 border border-[#E8262A]/20 text-[#E8262A] rounded-full">
                      Gemini
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Tanya seputar portofolio &amp; CV Yuan
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                aria-label="Tutup chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-zinc-950 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-md bg-[#E8262A]/10 border border-[#E8262A]/20 flex items-center justify-center shrink-0 mb-1">
                      <Bot size={12} className="text-[#E8262A]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#E8262A] text-white rounded-br-xs'
                        : 'bg-zinc-900 text-gray-200 border border-white/8 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0 mb-1 text-gray-300">
                      <User size={12} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-md bg-[#E8262A]/10 border border-[#E8262A]/20 flex items-center justify-center shrink-0 mb-1">
                    <Bot size={12} className="text-[#E8262A]" />
                  </div>
                  <div className="bg-zinc-900 border border-white/8 rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-[#E8262A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[11px] text-gray-500 ml-1.5 font-mono">Gemini merespons...</span>
                  </div>
                </div>
              )}

              {/* Quick Suggested Prompts */}
              {messages.length <= 2 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[10px] uppercase font-mono text-gray-500 mb-2">
                    Pertanyaan Populer:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendQuery(prompt)}
                        className="text-[11px] bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-full py-1 px-3 transition-colors text-left cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 shrink-0">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tanya tentang AI, proyek, atau CV..."
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-full py-2.5 pl-4 pr-11 text-xs sm:text-sm focus:outline-none focus:border-[#E8262A]/50 focus:ring-1 focus:ring-[#E8262A]/50 transition-all placeholder-zinc-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-1.5 w-8 h-8 flex items-center justify-center rounded-full bg-[#E8262A] text-white disabled:bg-zinc-800 disabled:text-zinc-600 hover:bg-[#c41f23] transition-colors cursor-pointer"
                  aria-label="Kirim pesan"
                >
                  <Send size={13} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button — 100% Fixed Position, Never Shifts */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full bg-zinc-900 text-white border border-white/15 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8)] flex items-center justify-center transition-colors cursor-pointer hover:border-[#E8262A]/60 hover:shadow-[0_0_20px_rgba(232,38,42,0.25)] ${
          isOpen ? 'bg-[#E8262A] border-[#E8262A]' : ''
        }`}
        aria-label={isOpen ? 'Tutup Chatbot' : 'Buka Chatbot AI'}
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Bot size={22} className="text-white" />
            <span className="text-[9px] font-semibold text-gray-300 font-display tracking-tight leading-none mt-0.5">
              AI Chat
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingChatbot;
