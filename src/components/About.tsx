import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Mail, Linkedin, Phone, GraduationCap, FileDown } from "lucide-react";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Directional parallax — Left panel slides from left, right panel from right
  const leftX = useTransform(scrollYProgress, [0, 0.5], [-20, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-standard"
      aria-labelledby="about-heading"
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

        {/* LEFT — directional from left */}
        <motion.div style={{ x: leftX, opacity }}>
          <p className="section-label">Who I Am</p>
          <h2 id="about-heading" className="section-heading">About Me</h2>

          {/* Profile Photo */}
          <div className="relative w-32 h-40 md:w-36 md:h-48 rounded-2xl overflow-hidden border-2 border-[#E8262A]/40 shadow-[0_10px_30px_rgba(232,38,42,0.2)] mt-6 mb-6 group">
            <img
              src="/profile.jpg"
              alt="Yuan Nata Nugraha"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          </div>

          <div className="space-y-3 text-gray-400 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={15} className="text-[#E8262A] shrink-0" />
              <span>Bekasi, Jawa Barat, 17412</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={15} className="text-[#E8262A] shrink-0" />
              <a
                href="mailto:nyuannata@gmail.com"
                className="link-hover"
              >
                nyuannata@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={15} className="text-[#E8262A] shrink-0" />
              <span>+62 8973860060</span>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin size={15} className="text-[#E8262A] shrink-0" />
              <a
                href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
                target="_blank"
                rel="noreferrer"
                className="link-hover"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <a
              href="/CV.pdf"
              download="CV_Yuan_Nata_Nugraha.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E8262A]/10 hover:bg-[#E8262A] text-white border border-[#E8262A]/30 hover:border-[#E8262A] text-xs font-semibold transition-all duration-200 group w-full justify-center sm:w-auto shadow-sm"
              title="Download CV Yuan Nata Nugraha"
            >
              <FileDown size={15} className="text-[#E8262A] group-hover:text-white" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT — directional from right */}
        <motion.div style={{ x: rightX, opacity }}>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            I'm a{" "}
            <span className="text-white font-semibold">
              motivated AI and Machine Learning practitioner
            </span>{" "}
            based in Bekasi, Indonesia, currently pursuing a Bachelor's in Computer Systems
            at Universitas Gunadarma while working as an{" "}
            <span className="text-white font-semibold">AI Project Intern</span>{" "}
            at Astra Credit Companies.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-5">
            My hands-on work spans{" "}
            <span className="text-white font-medium">Automatic Speech Recognition</span>,{" "}
            <span className="text-white font-medium">Retrieval-Augmented Generation</span>,{" "}
            <span className="text-white font-medium">Generative AI applications</span>, and{" "}
            <span className="text-white font-medium">IoT-based health monitoring</span>.{" "}
            I focus on building reliable, well-structured AI solutions that solve real problems.
          </p>

          {/* Education card */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
              <GraduationCap size={14} className="text-[#E8262A]" />
              Current Education
            </h3>
            <motion.div
              whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.25 } }}
              className="card-base p-6 relative overflow-hidden group transition-all duration-300 hover:border-white/20"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8262A]/5 rounded-bl-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <h4 className="font-bold text-white text-base font-display">Universitas Gunadarma</h4>
                    <p className="text-gray-400 text-sm mt-0.5">Bachelor's Degree in Computer Systems</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {["Artificial Intelligence", "Machine Learning", "IoT", "Software Development"].map((f) => (
                        <span key={f} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/8 text-gray-400">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 shrink-0">Aug 2024 – Aug 2026</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-xs text-gray-500 font-mono leading-relaxed">
                    <span className="text-gray-400 font-semibold">Thesis:</span>{" "}
                    Implementasi Random Forest pada Sistem Monitoring Kesehatan Berbasis IoT
                    untuk Klasifikasi Kondisi Pernapasan.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
