import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Mic2, MessageSquare, Bot, LayoutDashboard, Activity } from "lucide-react";

const projects = [
  {
    id: "iot-health",
    num: "01",
    Icon: Activity,
    iconColor: "text-green-400",
    title: "IoT-Based Health Monitoring System",
    subtitle: "Thesis Project — Respiratory Condition Classifier",
    description:
      "Implemented a Random Forest machine learning algorithm within an IoT-based health monitoring system to classify respiratory conditions. The system captures physiological data via IoT sensors and applies classification to assess breathing health status.",
    tags: ["Random Forest", "IoT", "ESP32", "Raspberry Pi", "MQTT", "Machine Learning", "Python"],
    highlight: "Thesis Project",
  },
  {
    id: "rag-app",
    num: "02",
    Icon: MessageSquare,
    iconColor: "text-blue-400",
    title: "RAG Information Retrieval Application",
    subtitle: "Web-based Generative AI App",
    description:
      "Built a web-based Retrieval-Augmented Generation application using the Google Gemini API. The app enables document-grounded question answering, allowing users to query specific knowledge bases with accurate, context-aware responses.",
    tags: ["Google Gemini API", "RAG", "LLM", "Python", "Web App"],
    highlight: "ACC Project",
  },
  {
    id: "chatbot",
    num: "03",
    Icon: Bot,
    iconColor: "text-violet-400",
    title: "AI Portfolio Chatbot",
    subtitle: "Domain-Restricted Conversational AI",
    description:
      "Developed an AI portfolio chatbot using the Google Gemini API with careful prompt engineering, domain restrictions, and guardrails to ensure responses are accurate, professional, and limited to relevant portfolio topics.",
    tags: ["Google Gemini API", "Prompt Engineering", "Domain Restriction", "RAG", "Python"],
    highlight: "ACC Project",
  },
  {
    id: "business-app",
    num: "04",
    Icon: LayoutDashboard,
    iconColor: "text-amber-400",
    title: "Business & Inventory Web Application",
    subtitle: "Full-Featured Management System",
    description:
      "Developed a comprehensive business and inventory management system handling orders, stock, income, expenses, and invoices. Features automatic calculations, real-time Firebase backend, and Excel export for reporting.",
    tags: ["Firebase", "JavaScript", "Excel Export", "REST API", "Inventory", "Orders"],
    highlight: "ACC Project",
  },
  {
    id: "asr-pipeline",
    num: "05",
    Icon: Mic2,
    iconColor: "text-cyan-400",
    title: "ASR Speech Transcription Pipeline",
    subtitle: "Whisper Large-v3 Evaluation System",
    description:
      "Built and operated an Automatic Speech Recognition pipeline using OpenAI Whisper Large-v3 on GPU infrastructure of approximately 42 GB VRAM. Annotated 125 audio recordings as ground truth for systematic transcription accuracy evaluation.",
    tags: ["Whisper Large-v3", "ASR", "Python", "GPU ~42 GB VRAM", "125 recordings", "Annotation"],
    highlight: "ACC Project",
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
