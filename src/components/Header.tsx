import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, FileDown, Search, Linkedin } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detector via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-64px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-5 transition-colors duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl shadow-[0_6px_30px_rgba(0,0,0,0.85)]"
          : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Yuan Nata Nugraha Home"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border-2 border-[#E8262A] shadow-[0_0_12px_rgba(232,38,42,0.35)] transition-transform group-hover:scale-110 duration-300 shrink-0 bg-zinc-900">
            <img
              src="/avatar.jpg"
              alt="Yuan Nata Nugraha"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="font-display font-semibold text-base md:text-lg tracking-tight flex items-center gap-2 text-white">
            Yuan Nata Nugraha
            <span className="opacity-35 font-normal hidden xl:inline text-xs md:text-sm text-gray-400">| AI Engineer</span>
          </span>
        </a>

        {/* Desktop Nav + Action */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white/8 rounded-lg border border-white/10"
                      transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => {
                const input = document.querySelector('input[placeholder*="Cari proyek"]') as HTMLInputElement;
                if (input) input.focus();
              }, 400);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-white rounded-lg hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
            title="Search portofolio (Ctrl+K)"
          >
            <Search size={13} />
            <span className="hidden xl:inline text-[10px] font-mono text-gray-500">Ctrl+K</span>
          </button>

          <a
            href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white rounded-lg hover:bg-[#0A66C2]/15 border border-white/10 hover:border-[#0A66C2]/50 transition-all duration-200"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={14} className="text-[#0A66C2]" />
            <span className="hidden xl:inline">LinkedIn</span>
          </a>

          <a
            href="/CV.pdf"
            download="CV_Yuan_Nata_Nugraha.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#E8262A]/10 hover:bg-[#E8262A] text-white border border-[#E8262A]/30 hover:border-[#E8262A] transition-all duration-200 hover:scale-105 shadow-sm"
            title="Download CV Yuan Nata Nugraha (PDF)"
          >
            <FileDown size={14} className="text-[#E8262A] group-hover:text-white" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile Right Side: Quick CV + Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium rounded-lg bg-[#0A66C2]/15 text-white border border-[#0A66C2]/30"
            aria-label="LinkedIn"
          >
            <Linkedin size={14} className="text-[#0A66C2]" />
          </a>
          <a
            href="/CV.pdf"
            download="CV_Yuan_Nata_Nugraha.pdf"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#E8262A]/15 text-white border border-[#E8262A]/30"
          >
            <FileDown size={13} className="text-[#E8262A]" />
            <span>CV</span>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden overflow-y-auto max-h-[calc(100dvh-70px)] bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <nav className="py-2" aria-label="Mobile navigation">
              {navLinks.map((link, i) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`mobile-nav-item ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="text-[#E8262A] text-xs font-mono mr-3">
                      0{i + 1}
                    </span>
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
            <div className="p-4 border-t border-white/5 space-y-2.5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <a
                href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#0A66C2]/15 text-white text-sm font-semibold border border-[#0A66C2]/30 hover:bg-[#0A66C2] transition-all"
              >
                <Linkedin size={16} className="text-[#0A66C2]" />
                <span>Lihat Profil LinkedIn</span>
              </a>
              <a
                href="/CV.pdf"
                download="CV_Yuan_Nata_Nugraha.pdf"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#E8262A] text-white text-sm font-semibold hover:bg-[#c41f23] transition-all shadow-md"
              >
                <FileDown size={16} />
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
