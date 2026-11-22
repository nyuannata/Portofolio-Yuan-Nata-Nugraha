import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Linkedin, Github, Mail, User, Briefcase, FileDown, ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax subtle shifts
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] h-[100dvh] min-h-[640px] bg-[#111112] text-white overflow-hidden flex flex-col justify-between select-none"
      aria-label="Hero section"
    >
      {/* ═══════════════════════════════════════════════════════════
          TOP BAR (Matches reference image header)
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-40 w-full px-6 sm:px-10 md:px-14 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Top-Left: Social Links */}
        <div className="flex items-center gap-4 sm:gap-5 text-[#8E8E93]">
          <a
            href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors duration-200 hover:scale-110 transform"
            title="LinkedIn Profile"
          >
            <Linkedin size={18} strokeWidth={1.8} />
          </a>
          <a
            href="https://github.com/nyuannata"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors duration-200 hover:scale-110 transform"
            title="GitHub Profile"
          >
            <Github size={18} strokeWidth={1.8} />
          </a>
          <a
            href="mailto:yuannata17@gmail.com"
            aria-label="Email"
            className="hover:text-white transition-colors duration-200 hover:scale-110 transform"
            title="Send Email"
          >
            <Mail size={18} strokeWidth={1.8} />
          </a>
        </div>

        {/* Top-Right: Pill Navigation (About & Experience) + CV */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-lg">
            <button
              onClick={() => scrollTo("about")}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#C7C7CC] hover:text-white transition-colors cursor-pointer"
            >
              <User size={13} strokeWidth={2} />
              <span>About</span>
            </button>
            <span className="w-px h-3.5 bg-white/10" aria-hidden="true" />
            <button
              onClick={() => scrollTo("experience")}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#C7C7CC] hover:text-white transition-colors cursor-pointer"
            >
              <Briefcase size={13} strokeWidth={2} />
              <span>Experience</span>
            </button>
          </div>

          {/* Quick CV Download button */}
          <a
            href="/CV.pdf"
            download="CV_Yuan_Nata_Nugraha.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8262A]/40 bg-[#E8262A]/15 hover:bg-[#E8262A] text-white text-xs font-medium transition-all duration-200 hover:scale-105"
            title="Download CV"
          >
            <FileDown size={13} />
            <span>CV</span>
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CENTERPIECE: 3D SANDWICH (SOLID TEXT -> PHOTO -> STROKE TEXT)
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        {/* Sub-tagline: "Focusing on AI Engineer" (Positioned above the P/O) */}
        <motion.div
          style={{ y: textY, opacity }}
          className="absolute z-25 left-6 sm:left-12 md:left-20 lg:left-28 top-[14%] sm:top-[16%] md:top-[18%] pointer-events-none"
        >
          <p className="text-xs sm:text-sm md:text-base text-[#8E8E93] font-sans tracking-wide flex items-center gap-1.5">
            <span>Focusing on</span>
            <span className="text-[#F2EFE9] font-semibold tracking-normal">AI Engineer</span>
          </p>
        </motion.div>

        {/* LAYER 1 (BEHIND SUBJECT): SOLID WARM CREAM TEXT */}
        <motion.div
          style={{ y: textY, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <h1
            className="text-[#E8DFD1] text-[18vw] sm:text-[18.5vw] md:text-[19vw] lg:text-[18.5vw] font-normal uppercase select-none leading-none tracking-[0.025em] whitespace-nowrap text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            PORTFOLIO
          </h1>
        </motion.div>

        {/* LAYER 2 (THE SUBJECT): CUTOUT PORTRAIT OF YUAN NATA NUGRAHA */}
        <motion.div
          style={{ y: photoY, opacity }}
          className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none z-20 h-full"
        >
          <div className="relative h-[72vh] sm:h-[80vh] md:h-[86vh] lg:h-[88vh] max-h-[920px] aspect-square flex items-end justify-center">
            <img
              src="/profile-cutout.png"
              alt="Yuan Nata Nugraha"
              className="w-full h-full object-contain object-bottom filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>

        {/* LAYER 3 (IN FRONT OF SUBJECT): OUTLINE / STROKE ONLY TEXT */}
        <motion.div
          style={{ y: textY, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          aria-hidden="true"
        >
          <span
            className="text-transparent text-[18vw] sm:text-[18.5vw] md:text-[19vw] lg:text-[18.5vw] font-normal uppercase select-none leading-none tracking-[0.025em] whitespace-nowrap text-center"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              WebkitTextStroke: "1.5px #E8DFD1",
            }}
          >
            PORTFOLIO
          </span>
        </motion.div>

        {/* Subtle bottom fade to blend smoothly into the section below */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111112] via-[#111112]/60 to-transparent pointer-events-none z-35" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          BOTTOM BAR (Matches reference image footer)
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-40 w-full px-6 sm:px-10 md:px-14 pb-6 sm:pb-8 flex items-center justify-between text-[#8E8E93]">
        {/* Bottom-Left: Name */}
        <span className="text-[10px] sm:text-[11px] md:text-xs font-mono tracking-[0.22em] text-[#8E8E93] uppercase">
          YUAN NATA NUGRAHA
        </span>

        {/* Bottom-Right: Explore Projects */}
        <button
          onClick={() => scrollTo("projects")}
          className="group flex items-center gap-1.5 text-[10px] sm:text-[11px] md:text-xs font-mono tracking-[0.18em] text-[#8E8E93] hover:text-white uppercase transition-colors cursor-pointer"
        >
          <span>EXPLORE PROJECTS</span>
          <ArrowDown
            size={13}
            className="transform transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </button>
      </div>
    </section>
  );
}
