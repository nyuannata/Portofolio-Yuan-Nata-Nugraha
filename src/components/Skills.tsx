import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Code2, Brain, Wrench, Globe, Cloud, Wifi } from "lucide-react";

const skillCategories = [
  {
    Icon: Code2,
    title: "Programming & Data Analysis",
    skills: ["Python", "C++", "SQL", "JavaScript", "Pandas", "NumPy", "Matplotlib", "Data Annotation", "Data Validation", "Model Evaluation"],
    parallax: { x: [-40, 0], y: [0, 0] },
  },
  {
    Icon: Brain,
    title: "AI & Machine Learning",
    skills: [
      "OpenAI Whisper",
      "Whisper Large-v3",
      "Speech Recognition (ASR)",
      "Generative AI",
      "Large Language Models (LLM)",
      "Natural Language Processing (NLP)",
      "Random Forest",
      "PyTorch",
      "YOLOv8",
      "Hugging Face Transformers",
    ],
    parallax: { x: [0, 0], y: [50, 0] },
  },
  {
    Icon: Wrench,
    title: "Generative AI & RAG Tools",
    skills: [
      "Google Gemini API",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering",
      "Domain Boundaries & Guardrails",
      "Ground-Truth Benchmarking",
      "WER Evaluation",
    ],
    parallax: { x: [40, 0], y: [0, 0] },
  },
  {
    Icon: Globe,
    title: "Web & Database Systems",
    skills: ["HTML", "CSS", "React", "REST API", "Streamlit", "PostgreSQL", "SQLite", "Firebase Realtime DB"],
    parallax: { x: [-30, 0], y: [0, 0] },
  },
  {
    Icon: Cloud,
    title: "Cloud & Developer Platforms",
    skills: ["Microsoft Azure AI Foundry", "Google AI Platforms", "Git", "GitHub", "Vercel", "Model Inventory"],
    parallax: { x: [0, 0], y: [40, 0] },
  },
  {
    Icon: Wifi,
    title: "IoT, Design & Languages",
    skills: ["ESP32", "Raspberry Pi", "MQTT", "CorelDRAW", "Graphic Design", "Technical Documentation", "Indonesian (Native)", "English (Intermediate)"],
    parallax: { x: [30, 0], y: [0, 0] },
  },
];

// Per-card parallax thresholds — staggered so each card enters at different scroll point
const cardScrollRanges = [
  [0.0, 0.35],
  [0.05, 0.4],
  [0.1, 0.45],
  [0.15, 0.5],
  [0.2, 0.55],
  [0.25, 0.6],
];

function SkillCard({
  cat,
  scrollYProgress,
  idx,
}: {
  cat: (typeof skillCategories)[0];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  idx: number;
}) {
  const [start, end] = cardScrollRanges[idx];
  const x = useTransform(scrollYProgress, [start, end], cat.parallax.x as [number, number]);

  return (
    <motion.div
      style={{ x }}
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        delay: (idx % 3) * 0.08,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className="card-base p-6 flex flex-col gap-5 transition-all duration-300 hover:border-white/20"
    >
      {/* Category header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
          <cat.Icon size={17} />
        </div>
        <h3 className="text-sm font-bold text-white font-display">{cat.title}</h3>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5">
        {cat.skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Heading — RIGHT → LEFT (opposite of About which goes left→right)
  const headingX = useTransform(scrollYProgress, [0, 0.25], [35, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-standard overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Heading — RIGHT → LEFT */}
      <motion.div
        style={{ x: headingX, opacity: headingOpacity }}
        className="mb-14"
      >
        <p className="section-label">Expertise</p>
        <h2 id="skills-heading" className="section-heading">Skills & Tech Stack</h2>
      </motion.div>

      {/* Grid — each card has its own directional parallax */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((cat, idx) => (
          <SkillCard
            key={idx}
            cat={cat}
            scrollYProgress={scrollYProgress}
            idx={idx}
          />
        ))}
      </div>
    </section>
  );
}
