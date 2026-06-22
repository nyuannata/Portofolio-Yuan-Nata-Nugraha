import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Technical Skills",
    skills: ["Python Programming (basic to intermediate)", "Data Analysis Fundamentals", "SQL (basic querying)", "Machine Learning Fundamentals", "Data preprocessing & Feature Engineering (basic)"]
  },
  {
    title: "Cloud & Systems",
    skills: ["AWS", "Google Cloud", "Microsoft Azure", "Hardware & System Integration", "Microcontrollers (Arduino, ESP32)"]
  },
  {
    title: "Web & Robotics",
    skills: ["HTML, CSS, JavaScript (Basic)", "Robot Design & Assembly (Line Follower, Wall Follower, Mobile Robot)", "Computer Network Security", "Basic Automation & Control Logic"]
  },
  {
    title: "Soft Skills",
    skills: ["Analytical Thinking", "Problem Solving", "Teamwork & Collaboration", "Communication", "Fast Learner", "Self Motivated"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10 relative z-10">
      <div className="flex items-center gap-4 mb-16">
        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold font-display text-xl rotate-3">
          {"</>"}
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">Skills & Tech Stack</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors"
          >
            <h3 className="text-lg font-bold text-white mb-6 font-display border-b border-white/10 pb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2 group">
              {category.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="bg-black border border-white/10 text-gray-300 text-sm py-1.5 px-4 rounded-full transition-colors group-hover:border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
