import { motion } from "motion/react";
import { Award } from "lucide-react";

export function Certifications() {
  const certs = [
    { title: "Dasar Google Cloud", issuer: "Dicoding Indonesia", date: "October 2025" },
    { title: "Aplikasi Gen AI Microsoft Azure", issuer: "Dicoding Indonesia", date: "October 2025" },
    { title: "Dasar Cloud dan Gen AI di AWS", issuer: "Dicoding Indonesia", date: "October 2025" },
    { title: "Machine Learning Basic", issuer: "Dicoding Indonesia", date: "October 2025" },
    { title: "Penerapan Data Science dengan Microsoft Fabric", issuer: "Dicoding Indonesia", date: "October 2025" },
    { title: "Dasar AI", issuer: "Dicoding Indonesia", date: "September 2025" },
    { title: "Data Science", issuer: "Dicoding Indonesia", date: "September 2025" },
    { title: "Structured Query Language (SQL)", issuer: "Dicoding Indonesia", date: "September 2025" },
    { title: "Pemrograman dengan Python", issuer: "Dicoding Indonesia", date: "September 2025" },
  ];

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10 relative z-10">
      <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">Certifications</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-white/30 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Award size={20} />
            </div>
            <div>
              <h4 className="font-medium text-white text-sm leading-tight mb-1 shadow-sm">{cert.title}</h4>
              <p className="text-gray-400 text-xs mb-2">{cert.issuer}</p>
              <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono text-gray-400 bg-white/5 border border-white/10">
                {cert.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
