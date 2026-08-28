import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mail, Linkedin, Phone, MapPin, Github } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "nyuannata@gmail.com",
    href: "mailto:nyuannata@gmail.com",
    hint: "For project inquiries & collaborations",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "yuan-nata-nugraha",
    href: "https://www.linkedin.com/in/yuan-nata-nugraha-590212361/",
    hint: "Professional profile",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "nyuannata",
    href: "https://github.com/nyuannata",
    hint: "Code & projects",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+62 8973860060",
    href: "tel:+628973860060",
    hint: "Available during working hours",
  },
];

// Per-card parallax X direction (alternating left/right)
const cardDirX = [-30, 30, -30, 30];

function ContactCard({
  item,
  idx,
  scrollYProgress,
}: {
  item: (typeof contactLinks)[0];
  idx: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const x = useTransform(
    scrollYProgress,
    [0.1 + idx * 0.05, 0.5 + idx * 0.05],
    [cardDirX[idx], 0]
  );

  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      style={{ x }}
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        delay: (idx % 2) * 0.08,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      className="card-base p-5 flex items-start gap-4 group hover:border-white/20 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.05)] transition-all duration-300"
      aria-label={`${item.label}: ${item.value}`}
    >
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-white/16 transition-all shrink-0">
        <item.icon size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
        <p className="text-sm font-medium text-white truncate">{item.value}</p>
        <p className="text-xs text-gray-600 mt-1">{item.hint}</p>
      </div>
    </motion.a>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.35], [40, 0]);
  const subtextY = useTransform(scrollYProgress, [0.05, 0.4], [25, 0]);
  const locationY = useTransform(scrollYProgress, [0.2, 0.6], [15, 0]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-standard overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading — upward parallax + whileInView opacity */}
        <motion.div
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-4"
        >
          <p className="section-label justify-center flex">Let's Connect</p>
          <h2 id="contact-heading" className="section-heading">Get In Touch</h2>
        </motion.div>

        {/* Subtext — slight offset parallax + whileInView */}
        <motion.p
          style={{ y: subtextY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-500 text-base text-center leading-relaxed mb-12"
        >
          I'm open to internship opportunities, AI project collaborations, and
          freelance work in machine learning, NLP, and generative AI.
        </motion.p>

        {/* Contact cards — alternating X parallax + whileInView opacity */}
        <div className="grid sm:grid-cols-2 gap-4">
          {contactLinks.map((item, i) => (
            <ContactCard
              key={item.label}
              item={item}
              idx={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Location note — upward parallax + whileInView opacity */}
        <motion.div
          style={{ y: locationY }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-2 text-gray-600 text-xs mt-8"
        >
          <MapPin size={12} className="text-[#E8262A]" />
          <span>Based in Bekasi, Indonesia · Open to remote opportunities</span>
        </motion.div>
      </div>
    </section>
  );
}
