
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg font-display tracking-tighter">
          Y
        </div>
        <span className="font-display font-semibold text-lg flex items-center gap-2">
          Yuan Nata <span className="opacity-50 font-normal hidden sm:inline">| Developer</span>
        </span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
        <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a>
        <a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a>
        <a href="#certifications" className="text-gray-400 hover:text-white transition-colors">Certifications</a>
      </nav>
    </header>
  );
}
