import React from 'react';
import { Instagram, Share2, MessageCircle } from 'lucide-react';

const FloatingSocials: React.FC = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Yuan Nata Nugraha - Portfolio',
          text: 'Check out my portfolio!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed right-0 top-32 z-50 flex flex-col items-end">
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 border-r-0 rounded-l-xl text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 shadow-lg transition-all flex items-center justify-center relative group mb-1"
      >
        <MessageCircle size={20} />
        <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">WhatsApp</span>
      </a>
      
      <a
        href="https://instagram.com/yuannatann"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 border-r-0 rounded-l-xl text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 shadow-lg transition-all flex items-center justify-center relative group mb-1"
      >
        <Instagram size={20} />
        <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">Instagram</span>
      </a>
      
      <button
        onClick={handleShare}
        className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 border-r-0 rounded-l-xl text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 shadow-lg transition-all flex items-center justify-center relative group"
      >
        <Share2 size={20} />
        <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">Share Profile</span>
      </button>
    </div>
  );
};

export default FloatingSocials;
