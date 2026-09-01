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
  const mapX = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [15, 0]);

  return (
    <footer ref={footerRef} className="border-t border-white/10 py-12 relative z-10 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">

          {/* Address */}
          <motion.div
            style={{ y: addressY }}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center md:text-left"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="text-blue-500" size={20} />
              Alamat Domisili
            </h3>
            <p className="text-gray-400 max-w-sm leading-relaxed mx-auto md:mx-0 text-sm md:text-base">
              Jl. Kusuma Indah Blok A19 No. 32<br />
              Jatibening, Pondok Gede<br />
              Bekasi Selatan
            </p>
          </motion.div>

          {/* Map */}
          <motion.div
            style={{ x: mapX }}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.2 } }}
            className="w-full md:w-auto flex justify-center"
          >
            <div className="h-32 w-full max-w-[250px] md:w-64 rounded-xl overflow-hidden border border-zinc-800 shadow-lg relative bg-zinc-900 transition-all hover:border-zinc-700">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps?q=jl.kusuma+indah+blok.A19+no.32,+jatibening,+pondokgede,+bekasi+selatan&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(20%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Social Links Row */}
        <div className="flex justify-center items-center gap-3 py-6 border-t border-white/5">
          <a
            href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-[#0A66C2] hover:bg-[#0A66C2]/15 text-xs font-medium transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin size={15} className="text-[#0A66C2]" />
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
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-green-500/50 hover:bg-green-500/10 text-xs font-medium transition-all"
            title="WhatsApp Direct"
          >
            <MessageCircle size={15} className="text-green-500" />
            <span>WhatsApp</span>
          </a>
          <a
            href="mailto:yuannatanugraha.official@gmail.com"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-[#E8262A]/50 hover:bg-[#E8262A]/10 text-xs font-medium transition-all"
            title="Send Email"
          >
            <Mail size={15} className="text-[#E8262A]" />
            <span>Email</span>
          </a>
          <a
            href="https://instagram.com/yuannatann"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 text-xs font-medium transition-all"
            title="Instagram Profile"
          >
            <Instagram size={15} className="text-pink-400" />
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
