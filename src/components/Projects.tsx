import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Mic2, MessageSquare, Bot, LayoutDashboard, Activity } from "lucide-react";

const projects = [
  {
    id: "iot-health",
    num: "01",
    Icon: Activity,
    iconColor: "text-green-400",
    title: "IoT-Based Health Monitoring System with Random Forest",
    subtitle: "Undergraduate Thesis — Respiratory Condition Classification",
    description:
      "Built an ESP32-based health monitoring system using MAX30102, MPU6050, and DS18B20 sensors with MQTT data transfer. Implemented a Random Forest machine learning model to classify respiratory conditions and developed a real-time web-based monitoring dashboard.",
    tags: ["Random Forest", "IoT", "ESP32", "MAX30102", "MPU6050", "DS18B20", "MQTT", "Python", "Web Dashboard"],
    highlight: "Undergraduate Thesis",
  },
  {
    id: "asr-pipeline",
    num: "02",
    Icon: Mic2,
    iconColor: "text-cyan-400",
    title: "Speech Recognition & Fine-Tuning Pipeline",
    subtitle: "OpenAI Whisper Large-v3 on GPU Infrastructure (~42 GB VRAM)",
    description:
      "Fine-tuned and evaluated OpenAI Whisper Large-v3 on call-center audio using 125 manually transcribed ground-truth recordings, successfully reducing Word Error Rate (WER) from ~60% to ~40% and enhancing recognition of specific company domain terminology.",
    tags: ["Whisper Large-v3", "ASR Fine-Tuning", "WER ~60% → ~40%", "GPU ~42 GB VRAM", "125 Annotations", "PyTorch"],
    highlight: "ACC Project",
  },
  {
    id: "rag-app",
    num: "03",
    Icon: MessageSquare,
    iconColor: "text-blue-400",
    title: "RAG Information Retrieval Application",
    subtitle: "Web-based Generative AI & Knowledge Base Q&A",
    description:
      "Built a web-based Retrieval-Augmented Generation application integrated with the Google Gemini API to enable intelligent document-grounded question answering and context-aware information retrieval from enterprise knowledge bases.",
    tags: ["Google Gemini API", "RAG", "LLM", "Prompt Engineering", "Python", "Web App"],
    highlight: "ACC Project",
  },
  {
    id: "sentiment-dashboard",
    num: "04",
    Icon: LayoutDashboard,
    iconColor: "text-amber-400",
    title: "Social Media Sentiment Analysis Dashboard",
    subtitle: "Frontend Interface for ACC Facebook & Instagram Sentiment Monitoring",
    description:
      "Developed the frontend of a Social Media Sentiment Analysis dashboard, providing an interface for connecting ACC Facebook and Instagram accounts and monitoring real-time sentiment evaluation results.",
    tags: ["React", "Frontend", "REST API", "Social Media", "Sentiment Monitoring", "ACC Facebook & IG"],
    highlight: "ACC Project",
  },
  {
    id: "chatbot",
    num: "05",
    Icon: Bot,
    iconColor: "text-violet-400",
    title: "Portfolio Website with Google Gemini AI Chatbot",
    subtitle: "Domain-Restricted Conversational AI & Web Portfolio",
    description:
      "Built a personal portfolio website featuring an interactive AI chatbot powered by the Google Gemini API. Applied prompt engineering and domain boundaries to keep responses accurate and relevant, optimizing token usage.",
    tags: ["Google Gemini API", "React", "TypeScript", "Tailwind CSS", "Prompt Engineering", "RAG"],
    highlight: "Personal Project",
  },
  {
    id: "business-app",
    num: "06",
    Icon: LayoutDashboard,
    iconColor: "text-emerald-400",
    title: "Business & Inventory Web Application",
    subtitle: "Full-Featured Operations & Invoice Management System",
    description:
      "Developed a comprehensive business and inventory management system handling orders, stock, income, expenses, and invoices. Features automatic calculations, real-time Firebase backend, and Excel export for business reporting.",
    tags: ["Firebase", "JavaScript", "Excel Export", "REST API", "Inventory", "Orders"],
    highlight: "Web Project",
  },
];

// === ProjectCard with per-card scroll-driven parallax ===
function ProjectCard({
  project,
  scrollYProgress,
  startP,
  endP,
  dirX,
}: {
  project: (typeof projects)[0];
  scrollYProgress: MotionValue<number>;
  startP: number;
  endP: number;
  dirX: number;
}) {
  // FIX: useScroll only for X/Y (visual depth). Opacity → whileInView.
  const x = useTransform(scrollYProgress, [startP, endP], [dirX, 0]);
  const y = useTransform(scrollYProgress, [startP, endP], [25, 0]);

  return (
    <motion.article
      style={{ x }}
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.25 } }}
      className="card-base p-6 md:p-8 group transition-all duration-300 hover:border-white/20 hover:shadow-[0_15px_35px_-10px_rgba(255,255,255,0.04)]"
      aria-label={project.title}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Icon + number */}
        <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-2 md:min-w-[60px]">
          <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center ${project.iconColor} group-hover:border-white/16 transition-colors`}>
            <project.Icon size={18} />
          </div>
          <span className="text-xs font-mono text-gray-600">{project.num}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-3 mb-2">
            <h3 className="text-base md:text-lg font-bold text-white font-display leading-snug">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E8262A]/10 border border-[#E8262A]/20 text-[#E8262A] shrink-0">
              {project.highlight}
            </span>
          </div>
          <p className="text-gray-500 text-xs font-medium mb-3">{project.subtitle}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-tag text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Heading — LEFT → RIGHT (parallax entering from left)
  const headingX = useTransform(scrollYProgress, [0, 0.3], [-30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Decorative background — moves from top to bottom (depth layer)
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-standard overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Background depth layer */}
      <motion.div
        className="absolute right-0 top-0 w-80 h-80 bg-blue-950/15 rounded-full blur-[100px] pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      />

      {/* Heading — LEFT → RIGHT */}
      <motion.div
        style={{ x: headingX, opacity: headingOpacity }}
        className="mb-14"
      >
        <p className="section-label">Portfolio</p>
        <h2 id="projects-heading" className="section-heading">Projects</h2>
        <p className="text-gray-500 text-sm mt-3 max-w-lg">
          Selected projects from internship work and academic research. All details are sourced from actual CV and project experience.
        </p>
      </motion.div>

      {/* Projects list — each card has scroll-driven directional parallax */}
      <div className="space-y-5">
        {projects.map((project, i) => {
          // Staggered scroll ranges: each card reveals at a progressively later scroll point
          const startP = 0.05 + i * 0.07;
          const endP = startP + 0.35;
          // Alternate: even cards left→right (negative x), odd cards right→left (positive x)
          return (
            <ProjectCard
              key={project.id}
              project={project}
              scrollYProgress={scrollYProgress}
              startP={startP}
              endP={endP}
              dirX={i % 2 === 0 ? -28 : 28}
            />
          );
        })}
      </div>
    </section>
  );
}
