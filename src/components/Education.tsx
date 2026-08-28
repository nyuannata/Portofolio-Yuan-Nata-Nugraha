import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap, Microscope, BookOpen } from "lucide-react";

const educations = [
  {
    icon: GraduationCap,
    institution: "Universitas Gunadarma",
    degree: "Bachelor's Degree in Computer Systems",
    period: "August 2024 – August 2026",
    location: "Bekasi, Indonesia",
    primary: true,
    focus: [
      "Artificial Intelligence",
      "Machine Learning",
      "Internet of Things",
      "Software Development",
    ],
    thesis: {
      title:
        "Implementasi Random Forest pada Sistem Monitoring Kesehatan Berbasis IoT untuk Klasifikasi Kondisi Pernapasan",
      note: "Bachelor's Thesis",
    },
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // FIX: Only use useScroll for X/Y transforms (visual depth).
  // Opacity is controlled by whileInView (viewport-based, reliable at any scroll depth).
  const headingX = useTransform(scrollYProgress, [0, 0.4], [35, 0]);
  const card0Y = useTransform(scrollYProgress, [0.05, 0.5], [45, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-standard overflow-hidden"
      aria-labelledby="education-heading"
    >
      {/* Floating background glow — parallax depth layer */}
      <motion.div
        className="absolute right-0 top-1/2 w-64 h-64 bg-[#E8262A]/4 rounded-full blur-[80px] pointer-events-none"
        style={{ y: glowY }}
        aria-hidden="true"
      />

      {/* Heading — RIGHT→LEFT parallax + whileInView opacity */}
      <motion.div
        style={{ x: headingX }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <p className="section-label">Academic Background</p>
        <h2 id="education-heading" className="section-heading">Education</h2>
      </motion.div>

      <div className="space-y-6">
        {/* Card 0 — BOTTOM→TOP parallax + whileInView opacity */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.25 } }}
          className="card-base p-6 md:p-8 relative overflow-hidden border-white/10 transition-all duration-300 hover:border-white/25 hover:shadow-[0_15px_35px_-10px_rgba(255,255,255,0.04)]"
        >
          {/* Accent glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#E8262A]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#E8262A]/10 border border-[#E8262A]/20 text-[#E8262A]">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">{educations[0].institution}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">{educations[0].degree}</p>
                  <p className="text-gray-600 text-xs mt-1">{educations[0].location}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-gray-500 bg-white/4 border border-white/8 py-1 px-3 rounded-full shrink-0 self-start">
                {educations[0].period}
              </span>
            </div>

            {educations[0].focus.length > 0 && (
              <div className="mt-5">
                <p className="text-xs text-gray-600 mb-2 flex items-center gap-1.5">
                  <BookOpen size={11} />
                  Academic Focus
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {educations[0].focus.map((f) => (
                    <span key={f} className="skill-tag text-xs">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {educations[0].thesis && (
              <div className="mt-5 pt-5 border-t border-white/5">
                <p className="text-xs text-[#E8262A] font-semibold mb-1.5 flex items-center gap-1.5">
                  <Microscope size={11} />
                  {educations[0].thesis.note}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {educations[0].thesis.title}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
