import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Brain, Cpu, Layers, Bot, Wand2, Mic2, FileDown, Linkedin } from "lucide-react";
import { SearchBar } from "./SearchBar";

const floatingIcons = [
  { Icon: Brain,  color: "text-violet-400/60", glow: "rgba(167,139,250,0.25)", x: "6%",  y: "18%", size: 30, delay: 0,   floatY: -10, dur: 4.2 },
  { Icon: Cpu,    color: "text-amber-400/60",  glow: "rgba(251,191,36,0.25)",  x: "88%", y: "16%", size: 28, delay: 0.3, floatY: 10,  dur: 4.8 },
  { Icon: Bot,    color: "text-green-400/60",  glow: "rgba(74,222,128,0.25)",  x: "8%",  y: "72%", size: 30, delay: 0.6, floatY: -10, dur: 3.6 },
  { Icon: Mic2,   color: "text-cyan-400/60",   glow: "rgba(34,211,238,0.25)",  x: "90%", y: "68%", size: 28, delay: 1.4, floatY: -8,  dur: 4.4 },
  { Icon: Layers, color: "text-blue-400/60",   glow: "rgba(96,165,250,0.25)",  x: "15%", y: "88%", size: 28, delay: 1.0, floatY: -12, dur: 5.0 },
  { Icon: Wand2,  color: "text-pink-400/60",   glow: "rgba(244,114,182,0.25)", x: "82%", y: "86%", size: 26, delay: 0.8, floatY: 8,   dur: 3.8 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.75]);
  const tagsY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* === PARALLAX BACKGROUND PHOTO (PRE-BLENDED PNG) === */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none parallax-layer overflow-hidden"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        {/* PNG with built-in RGBA alpha feathering — blends naturally with dark bg */}
        <div className="relative w-[480px] sm:w-[600px] md:w-[720px] lg:w-[820px] xl:w-[900px] max-w-[95vw] aspect-square flex items-center justify-center opacity-55 sm:opacity-60">
          <img
            src="/profile-blended.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Subtle atmospheric gradients to reinforce blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        {/* Extra bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        {/* Scroll dim overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* === FLOATING DECORATIVE ICONS === */}
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

      {/* === MAIN CONTENT (CENTERED) === */}
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 pt-20 sm:pt-24 pb-14 sm:pb-16 flex flex-col items-center text-center">
        <motion.div
          className="w-full flex flex-col items-center parallax-layer"
          style={{ y: textY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pre-heading label & Name */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex flex-col items-center gap-1.5 mb-2.5"
          >
            <span className="section-label">
              YUAN NATA NUGRAHA · AI ENGINEER
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full">
              Bekasi, Indonesia · Machine Learning &amp; Generative AI
            </span>
          </motion.div>

          {/* MAIN BIG HEADING: PORTOFOLIO (TRANSPARENT & CENTERED) */}
          <motion.div
            className="relative my-1 select-none"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-black uppercase font-display tracking-[0.16em] sm:tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-white/80 via-white/30 to-white/5 leading-none transition-all duration-300 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              style={{
                WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.45)",
                textShadow: "0 0 35px rgba(232, 38, 42, 0.15)",
              }}
            >
              PORTOFOLIO
            </h1>
          </motion.div>

          {/* Sub-heading */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-300 font-medium max-w-2xl leading-relaxed mt-2.5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            Building{" "}
            <span className="text-white font-semibold">Reliable AI Systems</span>{" "}
            — Speech Recognition (Whisper Large-v3), Generative AI (RAG Gemini), and IoT Health Classification.
          </motion.p>

          {/* Tech tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-1.5 mt-3.5 parallax-layer max-w-xl"
            style={{ y: tagsY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            aria-label="Key technologies"
          >
            {["Generative AI", "LLM", "RAG", "ASR / Whisper Large-v3", "PyTorch", "Google Gemini"].map((tag) => (
              <span
                key={tag}
                className="skill-tag text-[11px] sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-3 mt-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <a
              href="/CV.pdf"
              download="CV_Yuan_Nata_Nugraha.pdf"
              className="inline-flex items-center gap-2 bg-[#E8262A] hover:bg-[#c41f23] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_25px_rgba(232,38,42,0.4)] shadow-lg"
              title="Download CV Yuan Nata Nugraha"
            >
              <FileDown size={15} />
              <span>Download CV</span>
            </a>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 border border-white/15 backdrop-blur-sm"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/5 backdrop-blur-sm"
            >
              Contact Me
            </a>
            <a
              href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A66C2]/15 hover:bg-[#0A66C2] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 border border-[#0A66C2]/30 hover:border-[#0A66C2] shadow-md backdrop-blur-sm"
              title="Kunjungi Profil LinkedIn Yuan Nata Nugraha"
            >
              <Linkedin size={15} className="text-[#0A66C2] group-hover:text-white" />
              <span>LinkedIn</span>
            </a>
          </motion.div>

          {/* Pill-Shaped Search Bar with Voice-to-Text */}
          <div className="mt-5 w-full max-w-xl mx-auto">
            <SearchBar />
          </div>

          {/* Scroll Down Indicator Button (Directly visible in Hero view) */}
          <motion.button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-6 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white hover:border-white/40 transition-all cursor-pointer shadow-lg"
            aria-label="Scroll to About section"
            title="Gulir ke bagian About"
          >
            <ArrowDown size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
