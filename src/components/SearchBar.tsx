import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Mic,
  MicOff,
  X,
  Code2,
  Layers,
  Award,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Bot,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SearchItem {
  id: string;
  title: string;
  category: "Project" | "Skill" | "Certification" | "Experience" | "Education";
  subtitle?: string;
  targetId: string;
  keywords: string[];
}

const searchDatabase: SearchItem[] = [
  // Projects
  {
    id: "p1",
    title: "IoT-Based Health Monitoring System",
    category: "Project",
    subtitle: "Thesis Project — Respiratory Condition Classifier with Random Forest",
    targetId: "projects",
    keywords: ["iot", "health", "respiratory", "random forest", "esp32", "raspberry pi", "mqtt", "skripsi", "thesis", "python", "machine learning"],
  },
  {
    id: "p2",
    title: "RAG Information Retrieval Application",
    category: "Project",
    subtitle: "Web-based Generative AI App with Google Gemini API",
    targetId: "projects",
    keywords: ["rag", "retrieval augmented generation", "gemini", "google gemini", "llm", "generative ai", "web app", "acc", "python"],
  },
  {
    id: "p3",
    title: "AI Portfolio Chatbot",
    category: "Project",
    subtitle: "Domain-Restricted Conversational AI",
    targetId: "projects",
    keywords: ["chatbot", "ai assistant", "gemini", "prompt engineering", "domain restriction", "conversational ai", "acc"],
  },
  {
    id: "p4",
    title: "Business & Inventory Web Application",
    category: "Project",
    subtitle: "Full-Featured Management System with Firebase",
    targetId: "projects",
    keywords: ["business", "inventory", "management", "firebase", "excel export", "orders", "invoices", "stock", "acc"],
  },
  {
    id: "p5",
    title: "ASR Speech Transcription Pipeline",
    category: "Project",
    subtitle: "Whisper Large-v3 Evaluation System on ~42 GB VRAM GPU",
    targetId: "projects",
    keywords: ["asr", "speech", "whisper", "whisper large-v3", "transcription", "audio", "gpu", "vram", "42 gb", "evaluation", "acc", "ground truth"],
  },

  // Skills
  {
    id: "s1",
    title: "OpenAI Whisper (Whisper Large-v3)",
    category: "Skill",
    subtitle: "Automatic Speech Recognition & Model Evaluation",
    targetId: "skills",
    keywords: ["whisper", "asr", "audio", "transcription", "speech to text", "speech recognition"],
  },
  {
    id: "s2",
    title: "Google Gemini API & RAG",
    category: "Skill",
    subtitle: "Generative AI, Large Language Models & Prompt Engineering",
    targetId: "skills",
    keywords: ["gemini", "google ai", "rag", "retrieval", "llm", "generative ai", "prompt engineering"],
  },
  {
    id: "s3",
    title: "Python, PyTorch & Machine Learning",
    category: "Skill",
    subtitle: "Model Training, Random Forest, Data Processing (Pandas, NumPy)",
    targetId: "skills",
    keywords: ["python", "pytorch", "machine learning", "ml", "random forest", "pandas", "numpy", "yolov8", "scikit-learn"],
  },
  {
    id: "s4",
    title: "IoT & Hardware Integration",
    category: "Skill",
    subtitle: "ESP32, Raspberry Pi, MQTT, Sensor Integration",
    targetId: "skills",
    keywords: ["iot", "esp32", "raspberry pi", "mqtt", "hardware", "sensors", "microcontroller"],
  },
  {
    id: "s5",
    title: "Web Development & Cloud",
    category: "Skill",
    subtitle: "React, TypeScript, Tailwind CSS, Firebase, REST API, Azure AI Foundry",
    targetId: "skills",
    keywords: ["react", "typescript", "javascript", "tailwind", "firebase", "azure", "cloud", "rest api", "html", "css"],
  },

  // Certifications
  {
    id: "c1",
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    category: "Certification",
    subtitle: "Dicoding Indonesia (2025)",
    targetId: "certifications",
    keywords: ["azure", "gen ai", "generative ai", "microsoft", "dicoding", "sertifikat", "certificate"],
  },
  {
    id: "c2",
    title: "Course Machine Learning & Dasar Data Science",
    category: "Certification",
    subtitle: "Dicoding Indonesia (2025)",
    targetId: "certifications",
    keywords: ["machine learning", "data science", "dicoding", "sertifikat", "certificate"],
  },
  {
    id: "c3",
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    category: "Certification",
    subtitle: "Dicoding Indonesia (2025)",
    targetId: "certifications",
    keywords: ["microsoft fabric", "fabric", "data science", "dicoding", "sertifikat"],
  },
  {
    id: "c4",
    title: "Dasar Cloud dan GenAI di AWS",
    category: "Certification",
    subtitle: "Dicoding Indonesia (2025)",
    targetId: "certifications",
    keywords: ["aws", "cloud", "genai", "amazon", "dicoding", "sertifikat"],
  },

  // Experience & Education
  {
    id: "e1",
    title: "Astra Credit Companies (ACC) — AI Project Intern",
    category: "Experience",
    subtitle: "Maret 2026 – Sekarang (Whisper Large-v3, RAG Gemini, GPU 42GB)",
    targetId: "experience",
    keywords: ["astra", "acc", "intern", "internship", "experience", "pengalaman kerja", "whisper", "rag"],
  },
  {
    id: "ed1",
    title: "Universitas Gunadarma — S1 Sistem Komputer",
    category: "Education",
    subtitle: "Bachelor's Degree in Computer Systems (2024 – 2026)",
    targetId: "education",
    keywords: ["gunadarma", "kuliah", "education", "pendidikan", "sarjana", "s1", "sistem komputer"],
  },
];

const categoryIcons = {
  Project: Layers,
  Skill: Code2,
  Certification: Award,
  Experience: Briefcase,
  Education: GraduationCap,
};

const categoryColors = {
  Project: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Skill: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Certification: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Experience: "text-[#E8262A] bg-[#E8262A]/10 border-[#E8262A]/20",
  Education: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "id-ID";

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceFeedback("Mendengarkan suara Anda...");
        setIsOpen(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setQuery(transcript);
        setVoiceFeedback(`"${transcript}"`);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setVoiceFeedback("Izin mikrofon ditolak.");
        } else if (event.error === "no-speech") {
          setVoiceFeedback("Suara tidak terdengar, silakan coba lagi.");
        } else {
          setVoiceFeedback("Kendala pengenalan suara.");
        }
        setTimeout(() => setVoiceFeedback(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => setVoiceFeedback(null), 2500);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, []);

  // Keyboard shortcut (Ctrl+K or /) to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleVoiceRecognition = () => {
    if (!speechSupported) {
      alert("Browser Anda belum mendukung Web Speech API. Silakan gunakan Google Chrome, Edge, atau Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        setQuery("");
        recognitionRef.current?.start();
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  // Filter items
  const cleanQuery = query.toLowerCase().trim();
  const filteredResults = cleanQuery
    ? searchDatabase.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(cleanQuery);
        const subMatch = item.subtitle?.toLowerCase().includes(cleanQuery);
        const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(cleanQuery));
        return titleMatch || subMatch || keywordMatch;
      })
    : [];

  const handleSelectItem = (targetId: string) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Temporary highlight pulse effect
      element.classList.add("ring-2", "ring-[#E8262A]", "transition-all", "duration-500");
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-[#E8262A]");
      }, 1800);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto my-6 z-30">
      {/* Pill-Shaped Search Bar Container (Matching User's Reference) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`group relative flex items-center w-full h-12 md:h-13 px-4 rounded-full bg-white text-zinc-900 border-2 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${
          isListening
            ? "border-[#E8262A] ring-4 ring-[#E8262A]/25"
            : isOpen || query
            ? "border-[#E8262A] ring-2 ring-[#E8262A]/20"
            : "border-zinc-300 hover:border-zinc-400"
        }`}
      >
        {/* Search Icon (Left) */}
        <div className="flex items-center justify-center shrink-0 pr-2.5 text-zinc-500 group-focus-within:text-[#E8262A] transition-colors">
          <Search size={20} strokeWidth={2.2} />
        </div>

        {/* Text Input (Center) */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={
            isListening
              ? "Mendengarkan suara Anda..."
              : "Cari proyek, skill, sertifikat (misal: Whisper, RAG, Python)..."
          }
          className="w-full h-full bg-transparent text-zinc-900 text-base font-medium placeholder-zinc-400 focus:outline-none"
        />

        {/* Clear Button */}
        {query && !isListening && (
          <button
            onClick={handleClear}
            className="p-1 mr-1 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Hapus pencarian"
          >
            <X size={16} />
          </button>
        )}

        {/* Mic / Voice-to-Text Button (Right) */}
        <button
          type="button"
          onClick={toggleVoiceRecognition}
          className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all cursor-pointer shrink-0 ${
            isListening
              ? "bg-[#E8262A] text-white shadow-[0_0_15px_rgba(232,38,42,0.6)] animate-pulse"
              : "text-zinc-600 hover:text-[#E8262A] hover:bg-zinc-100"
          }`}
          title={isListening ? "Hentikan perekaman suara" : "Bicara untuk mencari (Voice-to-Text)"}
          aria-label="Voice search"
        >
          {isListening ? (
            <>
              <span className="absolute inset-0 rounded-full bg-[#E8262A] animate-ping opacity-40" />
              <MicOff size={18} className="relative z-10" />
            </>
          ) : (
            <Mic size={20} strokeWidth={2.2} />
          )}
        </button>
      </motion.div>

      {/* Voice Status Pill */}
      <AnimatePresence>
        {voiceFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-[#E8262A]/40 text-white text-xs font-mono flex items-center gap-2 shadow-lg z-40"
          >
            <span className="w-2 h-2 rounded-full bg-[#E8262A] animate-ping" />
            <span>{voiceFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-3 bg-zinc-950/95 backdrop-blur-xl border border-white/12 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-50 max-h-[300px] sm:max-h-[380px] flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-white/8 bg-zinc-900/60 flex items-center justify-between text-xs text-gray-400">
              <span>Hasil untuk: <strong className="text-white">"{query}"</strong></span>
              <span className="font-mono text-[11px]">{filteredResults.length} ditemukan</span>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => {
                  const Icon = categoryIcons[item.category];
                  const badgeColor = categoryColors[item.category];

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectItem(item.targetId)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/8 transition-all text-left group cursor-pointer border border-transparent hover:border-white/10"
                    >
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Icon size={15} className="text-gray-300 group-hover:text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#E8262A] transition-colors">
                            {item.title}
                          </h4>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full border ${badgeColor} shrink-0`}
                          >
                            {item.category}
                          </span>
                        </div>
                        {item.subtitle && (
                          <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
                        )}
                      </div>

                      <ArrowUpRight
                        size={14}
                        className="text-gray-500 group-hover:text-white shrink-0 mt-1 transition-colors"
                      />
                    </button>
                  );
                })
              ) : (
                <div className="p-6 text-center text-gray-400 text-sm">
                  <p>Tidak ditemukan hasil untuk "{query}".</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Coba kata kunci lain seperti <em>Whisper</em>, <em>RAG</em>, <em>Python</em>, atau <em>Gunadarma</em>.
                  </p>
                </div>
              )}
            </div>

            {/* AI Assistant Quick Prompt Footer */}
            <div className="p-2.5 bg-zinc-900/90 border-t border-white/8 flex items-center justify-between text-xs">
              <span className="text-gray-400 flex items-center gap-1.5 text-[11px]">
                <Bot size={13} className="text-[#E8262A]" />
                Ingin penjelasan mendalam?
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Find chatbot button or dispatch trigger
                  const chatTrigger = document.querySelector('button[aria-label="Buka Chatbot AI"], button[aria-label="Tutup Chatbot"]') as HTMLButtonElement;
                  if (chatTrigger) chatTrigger.click();
                }}
                className="inline-flex items-center gap-1 text-[#E8262A] hover:text-white hover:underline text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <span>Tanya AI Chatbot</span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
