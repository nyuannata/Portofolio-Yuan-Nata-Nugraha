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
      {/* Film grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <Header />

      <main className="relative z-10">
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
