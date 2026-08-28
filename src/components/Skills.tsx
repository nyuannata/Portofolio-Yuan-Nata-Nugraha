import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Code2, Brain, Wrench, Globe, Cloud, Wifi } from "lucide-react";

const skillCategories = [
  {
    Icon: Code2,
    title: "Programming & Data",
    color: "text-blue-400",
    skills: ["Python", "C++", "SQL", "Pandas", "NumPy"],
    // Parallax: LEFT → RIGHT
    parallax: { x: [-40, 0], y: [0, 0] },
  },
  {
    Icon: Brain,
    title: "AI / Machine Learning",
    color: "text-violet-400",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "Large Language Models",
      "Natural Language Processing",
      "Automatic Speech Recognition",
      "Model Evaluation",
      "Computer Vision",
    ],
    // Parallax: BOTTOM → TOP
    parallax: { x: [0, 0], y: [50, 0] },
  },
  {
    Icon: Wrench,
    title: "AI / ML Tools",
    color: "text-amber-400",
    skills: [
      "OpenAI Whisper",
      "Whisper Large-v3",
      "Google Gemini API",
      "Retrieval-Augmented Generation",
      "Hugging Face Transformers",
      "PyTorch",
      "YOLOv8",
    ],
    // Parallax: RIGHT → LEFT
    parallax: { x: [40, 0], y: [0, 0] },
  },
  {
    Icon: Globe,
    title: "Web & Application",
    color: "text-green-400",
    skills: ["HTML", "CSS", "JavaScript", "React", "Firebase", "REST API"],
    // Parallax: LEFT → RIGHT, slightly slower
    parallax: { x: [-30, 0], y: [0, 0] },
  },
  {
    Icon: Cloud,
    title: "Cloud & Platforms",
    color: "text-cyan-400",
    skills: ["Microsoft Azure AI Foundry", "Google AI Platforms", "Git", "GitHub"],
    // Parallax: BOTTOM → TOP, slower
    parallax: { x: [0, 0], y: [40, 0] },
  },
  {
    Icon: Wifi,
    title: "IoT",
    color: "text-pink-400",
    skills: ["ESP32", "Raspberry Pi", "MQTT"],
    // Parallax: RIGHT → LEFT
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
      className="card-base p-6 flex flex-col gap-5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.05)]"
    >
      {/* Category header */}
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center ${cat.color}`}>
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

  // Decorative background — moves UP as you scroll (parallax depth)
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-standard overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background parallax glow */}
      <motion.div
        className="absolute left-0 top-1/2 w-72 h-72 bg-violet-950/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"
        style={{ y: bgY }}
        aria-hidden="true"
      />

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
