import { motion } from "motion/react";
import { Monitor, Server, Bot, Code2, PlaySquare, Database, Cpu, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-4 overflow-hidden pt-20">
      
      {/* Background Image on the right half blending into black */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0 opacity-50 md:opacity-90">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/profile.jpg')", backgroundPosition: 'center top' }}
        />
        {/* Gradient overlay to blend the left edge of the image into the black background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        {/* Gradient overlay to blend the bottom edge into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="w-full relative z-10 flex justify-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left w-full md:w-1/2 pl-4 md:pl-16 lg:pl-24"
        >
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white">
              Hi, I'm Yuan
            </h1>
            <motion.div 
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-2 -right-4 bg-[#FFD600] text-black text-sm md:text-base font-bold py-1 px-4 rounded-md transform rotate-3"
            >
              Yuan N.
            </motion.div>
          </div>
          
          <h2 className="text-xl md:text-3xl lg:text-4xl text-gray-400 font-medium max-w-2xl leading-tight mt-4 drop-shadow-md">
            Python & Data-focused developer automating systems & exploring AI.
          </h2>
        </motion.div>
      </div>

      {/* Floating decorative elements mimicking the 3D objects */}
      <motion.div 
        animate={{ y: [0, -15, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute left-[5%] bottom-[5%] text-blue-500 hidden lg:block"
      >
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
          <Monitor size={120} strokeWidth={1} className="relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[25%] right-[45%] text-green-400 hidden xl:block opacity-60 z-10"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <Bot size={60} strokeWidth={1.5} className="relative z-10 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }} 
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
        className="absolute top-[20%] left-[5%] text-purple-500 hidden xl:block opacity-70 z-10"
      >
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Database size={50} strokeWidth={1.5} className="relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }} 
        transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.2 }}
        className="absolute top-[15%] left-[28%] text-amber-500 hidden lg:block opacity-60 z-10"
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <Cpu size={45} strokeWidth={1.5} className="relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[35%] left-[32%] text-cyan-400 hidden xl:block opacity-50 z-10"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <Terminal size={55} strokeWidth={1.5} className="relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        </div>
      </motion.div>

      {/* Bottom Center Character Placeholder / Stylized Face or Icon */}
      <motion.div 
        initial={{ y: 150 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        className="absolute bottom-[-20px] left-[20%] z-10 text-rose-400 mix-blend-screen opacity-50 block lg:hidden"
      >
          <Code2 size={150} strokeWidth={0.5} />
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 8, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center z-20 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors hidden md:flex text-gray-500"
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-current">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </motion.div>
    </section>
  );
}
