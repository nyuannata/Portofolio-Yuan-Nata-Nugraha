import { motion } from "motion/react";
import { Mail, MapPin, Linkedin, Phone } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10 relative z-10">
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">About Me</h2>
          
          <div className="space-y-4 text-gray-400 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-red-500" />
              <span>Bekasi, Jawa Barat, 17412</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-red-500" />
              <a href="mailto:nyuannata@gmail.com" className="hover:text-white transition-colors">nyuannata@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-red-500" />
              <span>+62 8973860060</span>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin size={16} className="text-red-500" />
              <a href="https://www.linkedin.com/in/yuan-nata-nugraha-590212361/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn Profile</a>
            </div>
          </div>
        </div>

        <div>
           <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            My name is Yuan and I currently live in Bekasi. I am a motivated <span className="text-white font-semibold">Python and data-focused developer</span> with hands-on experience in system logic, automation concepts, and technical projects. 
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4">
            I am comfortable working with Python, basic data analysis, and problem-solving tasks. I am open to freelance projects involving scripting, data processing, and technical support, and I am committed to delivering reliable and well-structured solutions.
          </p>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 font-display flex items-center gap-2">
               Education
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="flex justify-between items-start flex-wrap gap-4 relative z-10">
                <div>
                  <h4 className="font-bold text-white text-lg">Universitas Gunadarma</h4>
                  <p className="text-gray-400 mt-1">Bachelor in Computer System</p>
                  <p className="text-sm font-mono text-yellow-500 mt-2">GPA: 3.45 / 4.00</p>
                </div>
                <div className="text-sm text-gray-500 font-mono">Oct 2024 - Present</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
