import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Briefcase,
  FileDown,
  MessageCircle,
  Mail,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

const generalPrompts = [
  "Apa proyek AI utama Yuan?",
  "Pengalaman AI di ACC?",
  "Keahlian & Tech Stack",
  "Pendidikan & Topik Skripsi",
];

const recruiterPrompts = [
  "💼 Kenapa harus merekrut Yuan?",
  "⚡ Ringkasan pengalaman AI di ACC (Whisper & RAG)",
  "🛠️ Keahlian teknis & model AI terkuat",
  "🎓 Topik skripsi IoT & Random Forest",
  "🚀 Ketersediaan & fleksibilitas kerja",
];

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'recruiter' | 'general'>('recruiter');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Halo Recruiter & Hiring Manager! 👋\n\nSaya asisten AI resmi Yuan Nata Nugraha. Saya dapat merangkum kualifikasi, pengalaman proyek AI (ASR Whisper, RAG Gemini, IoT Health), serta ketersediaan kerja Yuan untuk tim Anda.',
    },
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

  const handleTabChange = (tab: 'recruiter' | 'general') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    if (tab === 'recruiter') {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: '💼 **Mode Rekruter Aktif**\nSiap menjawab kualifikasi teknis, evaluasi model AI di ACC, metrik pencapaian, dan ketersediaan kerja Yuan.',
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: '💬 **Mode Umum Aktif**\nTanyakan apa saja mengenai profil, keahlian, atau eksplorasi proyek Yuan.',
        },
      ]);
    }
  };

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
        body: JSON.stringify({ message: userMsg.text }),
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
        text: 'Maaf, terjadi kendala saat menghubungi server AI. Namun Anda dapat langsung mengunduh CV Yuan atau menghubungi via WhatsApp / Email melalui tombol di bawah.',
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

  // Helper to render bold markdown and bullet lines nicely
  const formatBotMessage = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // replace **bold** with <strong>
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <span key={idx} className="block min-h-[1.25em]">
          {formattedParts}
        </span>
      );
    });
  };

  return (
    <div
      className="fixed right-3 sm:right-6 z-50"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 bg-zinc-950 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden w-[calc(100vw-24px)] sm:w-[410px] max-w-[420px] flex flex-col border border-zinc-800"
            style={{ height: '580px', maxHeight: 'calc(100dvh - 95px)' }}
          >
            {/* Header */}
            <div className="bg-zinc-900/95 backdrop-blur-md border-b border-white/10 p-3.5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl border border-white/15 flex items-center justify-center relative overflow-hidden bg-zinc-900 shrink-0">
                  <img src="/avatar.jpg" alt="Yuan Nata Nugraha" className="w-full h-full object-cover object-top" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-zinc-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-white font-display">Yuan AI Assistant</h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#E8262A]/15 border border-[#E8262A]/30 text-[#E8262A] rounded-full">
                      Gemini
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {activeTab === 'recruiter' ? '💼 Recruiter Assistant Mode' : 'General Profile Assistant'}
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

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-white/5 bg-zinc-900/50 p-1.5 gap-1.5 shrink-0">
              <button
                onClick={() => handleTabChange('recruiter')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'recruiter'
                    ? 'bg-[#E8262A] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase size={13} />
                <span>Recruiter Mode</span>
              </button>
              <button
                onClick={() => handleTabChange('general')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <User size={13} />
                <span>Mode Umum</span>
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
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E8262A]/40 flex items-center justify-center shrink-0 mb-1 bg-zinc-900">
                      <img src="/avatar.jpg" alt="Yuan AI" className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#E8262A] text-white rounded-br-xs'
                        : 'bg-zinc-900 text-gray-200 border border-white/8 rounded-bl-xs'
                    }`}
                  >
                    {msg.sender === 'bot' ? formatBotMessage(msg.text) : <p className="whitespace-pre-wrap">{msg.text}</p>}
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
              {!isLoading && (
                <div className="pt-2">
                  <p className="text-[10px] uppercase font-mono text-gray-500 mb-2 flex items-center gap-1">
                    <ChevronRight size={12} className="text-[#E8262A]" />
                    {activeTab === 'recruiter' ? 'Pertanyaan Kunci Rekruter:' : 'Pertanyaan Populer:'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(activeTab === 'recruiter' ? recruiterPrompts : generalPrompts).map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendQuery(prompt)}
                        className="text-[11px] bg-zinc-900/90 hover:bg-zinc-800 text-gray-300 hover:text-white border border-zinc-800 hover:border-[#E8262A]/40 rounded-full py-1 px-3 transition-colors text-left cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Recruiter Quick Action Toolbar */}
            <div className="px-3 py-2 bg-zinc-900/90 border-t border-white/5 flex items-center justify-between gap-1.5 shrink-0 overflow-x-auto">
              <a
                href="/CV.pdf"
                download="CV_Yuan_Nata_Nugraha.pdf"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#E8262A]/15 hover:bg-[#E8262A] text-white border border-[#E8262A]/30 text-[11px] font-medium transition-all shrink-0"
                title="Download CV PDF"
              >
                <FileDown size={12} className="text-[#E8262A] group-hover:text-white" />
                <span>Download CV</span>
              </a>
              <a
                href="https://wa.me/628973860060?text=Halo%20Yuan,%20saya%20tertarik%20dengan%20profil%20dan%20portofolio%20AI%20Anda."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-500/15 hover:bg-green-600 text-green-400 hover:text-white border border-green-500/30 text-[11px] font-medium transition-all shrink-0"
                title="WhatsApp Yuan"
              >
                <MessageCircle size={12} />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:nyuannata@gmail.com?subject=Interview%20Inquiry%20-%20Yuan%20Nata%20Nugraha"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/15 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-[11px] font-medium transition-all shrink-0"
                title="Kirim Email"
              >
                <Mail size={12} />
                <span>Email</span>
              </a>
              <a
                href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white border border-zinc-700 text-[11px] font-medium transition-all shrink-0"
                title="LinkedIn Profile"
              >
                <ExternalLink size={11} />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-zinc-900 border-t border-zinc-800 shrink-0">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    activeTab === 'recruiter'
                      ? 'Tanya kecocokan skill, proyek ACC, atau ketersediaan...'
                      : 'Tanya tentang AI, proyek, atau profil Yuan...'
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-full py-2.5 pl-4 pr-11 text-base sm:text-sm focus:outline-none focus:border-[#E8262A]/50 focus:ring-1 focus:ring-[#E8262A]/50 transition-all placeholder-zinc-500"
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

      {/* Main Trigger Button */}
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
