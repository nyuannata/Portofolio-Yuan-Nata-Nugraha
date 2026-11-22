import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Linkedin, Github, Mail, MessageCircle, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const addressY = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [15, 0]);

  return (
    <footer ref={footerRef} className="border-t border-white/10 py-12 relative z-10 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center mb-8">

          {/* Address */}
          <motion.div
            style={{ y: addressY }}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
              <MapPin className="text-zinc-400" size={20} />
              Alamat Domisili
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Bekasi Selatan
            </p>
          </motion.div>
        </div>

        {/* Social Links Row */}
        <div className="flex justify-center items-center gap-3 py-6 border-t border-white/5">
          <a
            href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 text-xs font-medium transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin size={15} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/nyuannata"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 text-xs font-medium transition-all"
            title="GitHub Profile"
          >
            <Github size={15} />
            <span>GitHub</span>
          </a>
          <a
            href="https://wa.me/628973860060"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 text-xs font-medium transition-all"
            title="WhatsApp Direct"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
          <a
            href="mailto:yuannatanugraha.official@gmail.com"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 text-xs font-medium transition-all"
            title="Send Email"
          >
            <Mail size={15} />
            <span>Email</span>
          </a>
          <a
            href="https://instagram.com/yuannatann"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 text-xs font-medium transition-all"
            title="Instagram Profile"
          >
            <Instagram size={15} />
            <span>Instagram</span>
          </a>
        </div>

        {/* Copyright */}
        <motion.div
          style={{ y: copyY }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-gray-500 text-sm border-t border-white/5 pt-6"
        >
          <p>&copy; {new Date().getFullYear()} Yuan Nata Nugraha. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-50">Built with React, Tailwind CSS &amp; Framer Motion</p>
        </motion.div>
      </div>
    </footer>
  );
};
