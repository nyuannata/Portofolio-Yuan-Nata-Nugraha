import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Brain, Cpu, Layers, Bot, Wand2, Mic2, FileDown } from "lucide-react";
import { SearchBar } from "./SearchBar";

const floatingIcons = [
  { Icon: Brain,  color: "text-violet-400/70", glow: "rgba(167,139,250,0.3)", x: "3%",  y: "14%", size: 32, delay: 0,   floatY: -10, dur: 4.2 },
  { Icon: Cpu,    color: "text-amber-400/70",  glow: "rgba(251,191,36,0.3)",  x: "38%", y: "10%", size: 28, delay: 0.3, floatY: 10,  dur: 4.8 },
  { Icon: Bot,    color: "text-green-400/70",  glow: "rgba(74,222,128,0.3)",  x: "48%", y: "32%", size: 32, delay: 0.6, floatY: -10, dur: 3.6 },
  { Icon: Mic2,   color: "text-cyan-400/70",   glow: "rgba(34,211,238,0.3)",  x: "2%",  y: "74%", size: 26, delay: 1.4, floatY: -8,  dur: 4.4 },
  { Icon: Layers, color: "text-blue-400/70",   glow: "rgba(96,165,250,0.3)",  x: "48%", y: "68%", size: 32, delay: 1.0, floatY: -12, dur: 5.0 },
  { Icon: Wand2,  color: "text-pink-400/70",   glow: "rgba(244,114,182,0.3)", x: "44%", y: "86%", size: 26, delay: 0.8, floatY: 8,   dur: 3.8 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.7]);
  const tagsY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* === PARALLAX BACKGROUND IMAGE === */}
      <motion.div
        className="absolute right-0 top-0 w-full md:w-[55%] h-full z-0 parallax-layer"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/profile.jpg')",
            backgroundPosition: "center 15%",
          }}
        />
        {/* Blend left → right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        {/* Vignette bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        {/* Subtle top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        {/* Cinematic overlay on scroll */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* === FLOATING DECORATIVE ICONS — positioned clear of text === */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden xl:block" aria-hidden="true">
        {floatingIcons.map(({ Icon, color, glow, x, y, size, delay, floatY, dur }, i) => (
          <motion.div
            key={i}
            className={`absolute ${color}`}
            style={{ left: x, top: y }}
            animate={{ y: [0, floatY, 0] }}
            transition={{ repeat: Infinity, duration: dur, ease: "easeInOut", delay }}
          >
            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-20"
                style={{ background: glow, width: size * 1.8, height: size * 1.8, margin: `-${size * 0.4}px` }}
              />
              <Icon size={size} strokeWidth={1.2} className="relative drop-shadow-md" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-24 pb-28">
        <motion.div
          className="max-w-2xl parallax-layer"
          style={{ y: textY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pre-heading label */}
          <motion.p
            className="section-label mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            AI Engineer · Bekasi, Indonesia
          </motion.p>

          {/* Main heading */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9]">
              Hi,<br />I'm Yuan
            </h1>
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 3 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -bottom-3 -right-2 md:right-auto md:left-[calc(100%-8rem)] bg-[#FFD600] text-black text-xs md:text-sm font-black py-1 px-3 rounded-md font-display"
            >
              Yuan N.
            </motion.div>
          </motion.div>

          {/* Sub-heading */}
          <motion.h2
            className="text-lg md:text-2xl lg:text-3xl text-gray-400 font-medium max-w-lg leading-snug mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Building{" "}
            <span className="text-white font-semibold">AI systems</span>{" "}
            — from speech recognition pipelines to generative AI applications.
          </motion.h2>

          {/* Tech tags */}
          <motion.div
            className="flex flex-wrap gap-2 mt-8 parallax-layer"
            style={{ y: tagsY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            aria-label="Key technologies"
          >
            {["Generative AI", "LLM", "RAG", "ASR / Whisper", "PyTorch", "Google Gemini"].map((tag) => (
              <span
                key={tag}
                className="skill-tag text-xs"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3.5 mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <a
              href="/CV.pdf"
              download="CV_Yuan_Nata_Nugraha.pdf"
              className="inline-flex items-center gap-2 bg-[#E8262A] hover:bg-[#c41f23] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(232,38,42,0.4)] shadow-lg"
              title="Download CV Yuan Nata Nugraha"
            >
              <FileDown size={17} />
              <span>Download CV</span>
            </a>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 border border-white/15"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:bg-white/5"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Pill-Shaped Search Bar with Voice-to-Text */}
          <div className="mt-8 max-w-xl">
            <SearchBar />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-white/10 flex items-center justify-center z-20 text-gray-500 hover:text-white hover:border-white/30 transition-colors hidden md:flex cursor-pointer"
        aria-label="Scroll to About section"
      >
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}
