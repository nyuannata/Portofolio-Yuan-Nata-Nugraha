import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Halo! Saya asisten AI Yuan Nata Nugraha. Ada yang bisa saya bantu tentang portofolio atau pengalaman Yuan?' }
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
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
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: 'Maaf, terjadi kesalahan saat menghubungi server.' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-14 h-14">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-black rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] overflow-hidden w-80 sm:w-96 flex flex-col border border-zinc-800"
            style={{ height: '600px', transformOrigin: 'bottom right' }}
          >
            {/* Header */}
            <div className="bg-black/90 backdrop-blur-md border-b border-white/10 p-4 text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Yuan's Assistant</h3>
                  <p className="text-xs text-gray-400">AI Powered</p>
                </div>
              </div>
              <button onClick={toggleChat} className="text-gray-400 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black scrollbar-thin scrollbar-thumb-zinc-700">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-zinc-800 text-white border border-zinc-700 rounded-br-sm' : 'bg-black text-gray-300 border border-zinc-800 rounded-bl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-black border-t border-zinc-800">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder-zinc-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-1 w-8 h-8 flex items-center justify-center rounded-full bg-white text-black disabled:bg-zinc-800 disabled:text-gray-500 transition-colors"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleChat}
        className={`absolute bottom-0 right-0 group w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white shadow-lg hover:shadow-xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center z-10 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle size={28} className="group-hover:animate-bounce" />
      </button>
    </div>
  );
};

export default FloatingChatbot;
