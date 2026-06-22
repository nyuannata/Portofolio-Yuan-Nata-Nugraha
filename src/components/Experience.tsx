import { motion } from "motion/react";

const experiences = [
  {
    role: "Project AI",
    company: "Astra Credit Companies",
    date: "Mar 2026 \u2013 Present",
    location: "Jakarta, Indonesia",
    description: ["Operated and maintained AI solutions.", "Developed automation concepts for processing data."]
  },
  {
    role: "Laboratory Intern",
    company: "Sriwijaya University",
    date: "Feb 2020 \u2013 Mar 2020",
    location: "Palembang, Indonesia",
    description: [
      "Operated and monitored 3D printing processes.",
      "Understood detailed 3D printer system workflows and configurations.",
      "Assisted in basic troubleshooting and hardware maintenance."
    ]
  },
  {
    role: "Charity Livestream Committee - Moderator & Equipment",
    company: "Streamer Channel GAGITUSIL",
    date: "Jun 2025",
    location: "Volunteer",
    description: [
      "Selected as a committee member based on previous experience as a livestream moderator.",
      "Responsible for managing and preparing event equipment.",
      "Conducted event documentation through photo and video shooting.",
      "Carried out surveys of orphanages as potential charity beneficiaries."
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10 relative z-10">
      <div className="flex items-baseline gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">Work & Experience</h2>
        <div className="h-px bg-white/20 flex-1 ml-4 hidden md:block" />
      </div>

      <div className="grid gap-12 border-l border-white/10 pl-6 md:pl-10 relative">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 bg-red-500 rounded-full ring-4 ring-black" />
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12">
              <div className="md:w-1/3">
                <span className="text-xs font-mono text-gray-500 bg-white/5 py-1 px-3 rounded-full border border-white/10">{exp.date}</span>
                <h3 className="text-xl font-bold text-white mt-4">{exp.role}</h3>
                <p className="text-red-400 font-medium text-sm mt-1">{exp.company}</p>
                <p className="text-gray-500 text-xs mt-1">{exp.location}</p>
              </div>
              
              <div className="md:w-2/3">
                <ul className="space-y-2 text-gray-300">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-red-500 select-none">-</span>
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
