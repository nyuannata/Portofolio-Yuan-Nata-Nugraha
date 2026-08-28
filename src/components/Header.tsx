import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 group"
          aria-label="Yuan Nata Nugraha — Home"
        >
          <div className="w-8 h-8 rounded-full bg-[#E8262A] flex items-center justify-center text-white font-black text-sm font-display tracking-tight transition-transform group-hover:scale-110 duration-300">
            Y
          </div>
          <span className="font-display font-semibold text-base tracking-tight flex items-center gap-2">
            Yuan Nata
            <span className="opacity-30 font-normal hidden sm:inline text-sm">| AI Engineer</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
