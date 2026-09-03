/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Certifications } from "./components/Certifications";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import FloatingChatbot from "./components/FloatingChatbot";
import FloatingSocials from "./components/FloatingSocials";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle radial glow at top */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-950/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-950/10 rounded-full blur-[100px]" />
      </div>

      {/* Film grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <Header />

      <main className="relative z-10 pt-20">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />

      <FloatingSocials />
      <FloatingChatbot />
    </div>
  );
}
