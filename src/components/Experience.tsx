import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, Mic2, FileText, Bot, LayoutDashboard, Brain } from "lucide-react";

// ACC scroll-driven milestone steps
const accMilestones = [
  {
    icon: Mic2,
    num: "01",
    title: "Automatic Speech Recognition",
    desc: "Built an ASR pipeline using OpenAI Whisper Large-v3 on GPU infrastructure of approximately 42 GB VRAM. Performed manual transcription and ground-truth annotation on 125 audio recordings, then conducted systematic transcription accuracy evaluation.",
    tags: ["Whisper Large-v3", "ASR", "GPU ~42 GB VRAM", "125 recordings"],
  },
  {
    icon: Bot,
    num: "02",
    title: "RAG Information Retrieval App",
    desc: "Developed a web-based Retrieval-Augmented Generation application using the Google Gemini API to enable intelligent document-grounded question answering and information retrieval.",
    tags: ["Google Gemini API", "RAG", "LLM", "Web App"],
  },
  {
    icon: Brain,
    num: "03",
    title: "AI Portfolio Chatbot",
    desc: "Built an AI-powered portfolio chatbot using Google Gemini API with carefully engineered prompt restrictions and domain constraints to ensure responses remain accurate and on-topic.",
    tags: ["Google Gemini API", "Prompt Engineering", "Domain Restriction"],
  },
  {
    icon: LayoutDashboard,
    num: "04",
    title: "Business & Inventory Web App",
    desc: "Developed a full-featured business and inventory management web application covering orders, stock, income, expenses, and invoices. Integrated automatic calculations, Firebase for real-time data, and Excel export functionality.",
    tags: ["Firebase", "Excel Export", "Orders & Stock", "Invoices"],
  },
  {
    icon: FileText,
    num: "05",
    title: "LLM Model Inventory & Documentation",
    desc: "Created and maintained comprehensive LLM model inventory and documentation. Explored and evaluated AI capabilities through Microsoft Azure AI Foundry and Google AI platforms.",
    tags: ["Azure AI Foundry", "Google AI", "LLM Documentation"],
  },
];

const otherExperiences = [
  {
    role: "Laboratory Intern",
    company: "Universitas Sriwijaya",
    date: "Sep 2019 – Oct 2019",
    location: "Palembang, Indonesia",
    description: [
      "Operated and monitored 3D printing processes for prototype development.",
      "Understood detailed 3D printer system workflows and hardware configurations.",
      "Assisted in basic troubleshooting and hardware maintenance.",
    ],
  },
  {
    role: "Charity Livestream Committee — Moderator & Equipment",
    company: "Streamer Channel GAGITUSIL",
    date: "Jun 2025",
    location: "Volunteer",
    description: [
      "Selected as committee member based on prior livestream moderation experience.",
      "Managed and prepared event equipment; conducted documentation via photo and video.",
      "Surveyed orphanages as potential charity beneficiaries.",
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingX = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-standard"
      aria-labelledby="experience-heading"
    >
      {/* Section header */}
      <motion.div
        style={{ x: headingX, opacity: headingOpacity }}
        className="mb-16"
      >
        <p className="section-label">Career</p>
        <div className="flex items-baseline gap-6">
          <h2 id="experience-heading" className="section-heading">Work & Experience</h2>
          <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1 hidden md:block" />
        </div>
      </motion.div>

      {/* === PRIMARY: ACC — scroll-driven milestones === */}
      <div className="mb-20">
        <div className="mb-10">
          {/* ACC Header card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.25 } }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-[#E8262A]/20 bg-gradient-to-br from-[#E8262A]/5 to-transparent mb-8 shadow-[0_10px_30px_-15px_rgba(232,38,42,0.1)] transition-colors hover:border-[#E8262A]/40"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8262A]/10 border border-[#E8262A]/20 flex items-center justify-center shrink-0">
                <Briefcase size={18} className="text-[#E8262A]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">AI Project Intern</h3>
                <p className="text-[#E8262A] font-medium text-sm mt-0.5">Astra Credit Companies (ACC)</p>
                <p className="text-gray-500 text-xs mt-1">Jakarta, Indonesia</p>
              </div>
            </div>
            <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/8 py-1.5 px-4 rounded-full shrink-0">
              Mar 2026 – Present
            </span>
          </motion.div>

          {/* ACC Milestones */}
          <div className="grid gap-4 md:grid-cols-2">
            {accMilestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  delay: (i % 2) * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, scale: 1.015, transition: { duration: 0.2 } }}
                className={`card-base p-5 ${i === 0 ? "md:col-span-2" : ""} transition-all duration-300 hover:border-white/20`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                    <m.icon size={15} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono text-[#E8262A] font-bold">{m.num}</span>
                      <h4 className="text-sm font-bold text-white font-display">{m.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {m.tags.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/4 border border-white/8 text-gray-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* === OTHER EXPERIENCES — timeline === */}
      <div className="border-l border-white/8 pl-6 md:pl-10 relative space-y-10">
        <div className="timeline-line" />
        {otherExperiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 6, transition: { duration: 0.2 } }}
            className="relative"
          >
            <div className="timeline-dot" />
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12 p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div className="md:w-1/3">
                <span className="text-[10px] font-mono text-gray-500 bg-white/4 py-1 px-3 rounded-full border border-white/8 inline-block">
                  {exp.date}
                </span>
                <h3 className="text-base font-bold text-white mt-3 font-display leading-snug">{exp.role}</h3>
                <p className="text-[#E8262A] font-medium text-xs mt-1">{exp.company}</p>
                <p className="text-gray-500 text-xs mt-0.5">{exp.location}</p>
              </div>
              <div className="md:w-2/3">
                <ul className="space-y-2 text-gray-400 text-sm">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[#E8262A] mt-0.5 shrink-0">–</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
