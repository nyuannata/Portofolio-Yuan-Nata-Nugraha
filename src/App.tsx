/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Certifications } from "./components/Certifications";
import FloatingChatbot from "./components/FloatingChatbot";
import FloatingSocials from "./components/FloatingSocials";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white">
      {/* Dynamic Background Noise / Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      
      <Header />
      
      <main className="relative z-10 pt-16">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certifications />
      </main>

      <Footer />

      <FloatingSocials />
      <FloatingChatbot />
    </div>
  );
}
