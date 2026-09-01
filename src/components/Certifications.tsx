import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight, X, Award, ExternalLink, ZoomIn } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string;
  category: string;
  pdfPath: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Generative AI",
    pdfPath: "/certificates/cert-01.pdf",
  },
  {
    id: 2,
    title: "Dasar Data Science",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Data Science",
    pdfPath: "/certificates/cert-03.pdf",
  },
  {
    id: 3,
    title: "Course Machine Learning",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Machine Learning",
    pdfPath: "/certificates/cert-06.pdf",
  },
  {
    id: 4,
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Data Science",
    pdfPath: "/certificates/cert-07.pdf",
  },
  {
    id: 5,
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Artificial Intelligence",
    pdfPath: "/certificates/cert-02.pdf",
  },
  {
    id: 6,
    title: "Dasar Cloud dan GenAI di AWS",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Cloud & AI",
    pdfPath: "/certificates/cert-08.pdf",
  },
  {
    id: 7,
    title: "Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Programming",
    pdfPath: "/certificates/cert-05.pdf",
  },
  {
    id: 8,
    title: "Belajar Dasar SQL",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Database",
    pdfPath: "/certificates/cert-04.pdf",
  },
];

// Gradient palette per card (cycling)
const cardGradients = [
  "from-violet-950/50 to-black",
  "from-blue-950/50 to-black",
  "from-emerald-950/50 to-black",
  "from-cyan-950/50 to-black",
  "from-amber-950/50 to-black",
  "from-pink-950/50 to-black",
  "from-indigo-950/50 to-black",
  "from-teal-950/50 to-black",
];

type CardPosition = "active" | "prev" | "next" | "far-prev" | "far-next" | "hidden";

function getPosition(index: number, active: number, total: number): CardPosition {
  const diff = ((index - active) % total + total) % total;
  const revDiff = total - diff;
  const minDiff = Math.min(diff, revDiff);
  const direction = diff <= total / 2 ? diff : -revDiff;

  if (direction === 0) return "active";
  if (direction === 1 || direction === -1) return direction === 1 ? "next" : "prev";
  if (minDiff === 2) return direction > 0 ? "far-next" : "far-prev";
  return "hidden";
}

export function Certifications() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalCert, setModalCert] = useState<Certificate | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = certificates.length;
  const carouselRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => setActiveIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIdx((i) => (i + 1) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (modalCert) {
        if (e.key === "Escape") setModalCert(null);
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalCert, prev, next]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    setTouchStart(null);
  };

  const openModal = (cert: Certificate) => setModalCert(cert);
  const closeModal = () => setModalCert(null);

  // === PARALLAX ===
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Heading — LEFT → RIGHT
  const headingX = useTransform(scrollYProgress, [0, 0.3], [-35, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Carousel container — subtle horizontal drift (RIGHT → LEFT as you scroll)
  const carouselX = useTransform(scrollYProgress, [0.1, 0.6], [20, -10]);

  // Navigation dots row — upward reveal
  const dotsY = useTransform(scrollYProgress, [0.3, 0.65], [20, 0]);
  const dotsOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section-standard overflow-hidden"
      aria-labelledby="cert-heading"
    >
      {/* Heading — LEFT→RIGHT parallax + whileInView opacity */}
      <motion.div
        style={{ x: headingX }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <p className="section-label">Dicoding Indonesia</p>
        <h2 id="cert-heading" className="section-heading">Certifications</h2>
        <p className="text-gray-500 text-sm mt-3">
          {total} verified certificates from Dicoding Indonesia.
          <span className="hidden md:inline"> Use arrow keys or click to navigate.</span>
        </p>
      </motion.div>

      {/* === CAROUSEL — with subtle horizontal parallax === */}
      <motion.div style={{ x: carouselX }} className="relative select-none">
        {/* Desktop 3D coverflow */}
        <div
          ref={carouselRef}
          className="cert-carousel-container relative hidden md:flex items-center justify-center"
          style={{ height: "340px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Certificate carousel"
          role="region"
        >
          {certificates.map((cert, i) => {
            const pos = getPosition(i, activeIdx, total);
            return (
              <div
                key={cert.id}
                className={`cert-card absolute w-72`}
                style={{ position: "absolute" }}
                data-position={pos}
                onClick={() => {
                  if (pos === "active") openModal(cert);
                  else if (pos === "prev" || pos === "far-prev") prev();
                  else if (pos === "next" || pos === "far-next") next();
                }}
                role={pos === "active" ? "button" : undefined}
                aria-label={pos === "active" ? `Open ${cert.title}` : undefined}
                tabIndex={pos === "active" ? 0 : -1}
                onKeyDown={(e) => { if (pos === "active" && (e.key === "Enter" || e.key === " ")) openModal(cert); }}
              >
                <style>{`
                  [data-position="active"] { transform: translateX(0) scale(1) rotateY(0deg); opacity: 1; filter: none; z-index: 10; }
                  [data-position="prev"] { transform: translateX(-65%) scale(0.78) rotateY(28deg); opacity: 0.45; filter: blur(1px); z-index: 5; }
                  [data-position="next"] { transform: translateX(65%) scale(0.78) rotateY(-28deg); opacity: 0.45; filter: blur(1px); z-index: 5; }
                  [data-position="far-prev"] { transform: translateX(-100%) scale(0.62) rotateY(40deg); opacity: 0.18; filter: blur(2px); z-index: 1; }
                  [data-position="far-next"] { transform: translateX(100%) scale(0.62) rotateY(-40deg); opacity: 0.18; filter: blur(2px); z-index: 1; }
                  [data-position="hidden"] { opacity: 0; pointer-events: none; z-index: 0; }
                  .cert-card { transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s ease, filter 0.55s ease; transform-style: preserve-3d; cursor: pointer; }
                `}</style>
                <div
                  className={`relative rounded-2xl border overflow-hidden bg-gradient-to-br ${cardGradients[i % cardGradients.length]} ${
                    pos === "active"
                      ? "border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)] cert-card-glint"
                      : "border-white/6"
                  }`}
                  style={{ height: "280px" }}
                >
                  {/* Card content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center">
                        <Award size={18} className="text-[#FFD600]" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/8">
                        {cert.category}
                      </span>
                    </div>

                    {/* Bottom */}
                    <div>
                      <p className="text-[10px] font-mono text-gray-500 mb-2">{cert.issuer}</p>
                      <h3 className="text-sm font-bold text-white font-display leading-snug mb-3">
                        {cert.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-500 bg-white/4 px-2 py-0.5 rounded border border-white/8">
                          {cert.year}
                        </span>
                        {pos === "active" && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-1 text-[10px] text-gray-400"
                          >
                            <ZoomIn size={10} />
                            Click to view
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile grid cards */}
        <div
          className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.id}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => openModal(cert)}
              className={`text-left rounded-xl border bg-gradient-to-br ${cardGradients[i % cardGradients.length]} border-white/8 p-4 hover:border-white/20 transition-all active:scale-98`}
              aria-label={`Open certificate: ${cert.title}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Award size={14} className="text-[#FFD600]" />
                <span className="text-[10px] font-mono text-gray-500">{cert.category}</span>
              </div>
              <h3 className="text-xs font-bold text-white font-display leading-snug mb-2">
                {cert.title}
              </h3>
              <p className="text-[10px] text-gray-500">{cert.issuer} · {cert.year}</p>
            </motion.button>
          ))}
        </div>

        {/* Desktop Navigation arrows */}
        <div className="hidden md:flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            aria-label="Previous certificate"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2" role="tablist" aria-label="Certificate navigation">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Certificate ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIdx
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            aria-label="Next certificate"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Active cert info — desktop */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block text-center mt-6"
        >
          <p className="text-white font-display font-semibold text-sm">
            {certificates[activeIdx].title}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {certificates[activeIdx].issuer} · {certificates[activeIdx].year}
          </p>
        </motion.div>
      </motion.div>

      {/* === MODAL === */}
      <AnimatePresence>
        {modalCert && (
          <motion.div
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${modalCert.title}`}
          >
            <motion.div
              className="cert-modal-content"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b border-white/8 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    <Award size={15} className="text-[#FFD600]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold font-display leading-tight line-clamp-1">
                      {modalCert.title}
                    </p>
                    <p className="text-gray-500 text-xs">{modalCert.issuer} · {modalCert.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={modalCert.pdfPath}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                    aria-label="Open in new tab"
                  >
                    <ExternalLink size={15} />
                  </a>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Mobile Quick Action Banner (Solusi untuk browser iOS/Android yang memblokir PDF iframe) */}
              <div className="p-3 bg-zinc-900/90 border-b border-white/8 flex items-center justify-between text-xs sm:hidden shrink-0">
                <span className="text-gray-300 text-[11px]">Pratinjau PDF di ponsel:</span>
                <a
                  href={modalCert.pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8262A] text-white font-semibold text-xs shadow-sm hover:bg-[#c41f23] transition-colors"
                >
                  <span>Buka PDF Penuh</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* PDF viewer */}
              <div className="flex-1 min-h-0 bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden" style={{ minHeight: "350px" }}>
                <iframe
                  src={`${modalCert.pdfPath}#view=FitH`}
                  title={modalCert.title}
                  className="w-full h-full"
                  style={{ minHeight: "450px", border: "none" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
