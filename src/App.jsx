import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import ResumeSection from './components/ResumeSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import CommandPalette from './components/CommandPalette';
import { sounds } from './utils/sound';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeModalType, setResumeModalType] = useState('technical');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);

  const handleOpenResume = (type = 'technical') => {
    setResumeModalType(type);
    setResumeModalOpen(true);
  };

  const handleToggleSound = () => {
    const newState = sounds.toggle();
    setSoundEnabled(newState);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* 2026 Futuristic Loading Screen */}
      {loading && (
        <LoadingScreen onFinish={() => setLoading(false)} />
      )}

      {/* Cyber Mesh & Particle Background Canvas */}
      <ParticleBackground />

      {/* Sticky Futuristic Navbar */}
      <Navbar
        onOpenResume={handleOpenResume}
        onOpenPalette={() => setPaletteOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col">
        {/* 00: Hero Section */}
        <Hero onOpenResume={handleOpenResume} />

        {/* 01: About Me Section */}
        <About onOpenResume={handleOpenResume} />

        {/* 02: Technical Skills */}
        <Skills />

        {/* 03: Professional & Research Experience */}
        <Experience onOpenResume={handleOpenResume} />

        {/* 04: Projects & SheSafe-Bench ARR Showcase */}
        <Projects />

        {/* 05: Academic Education & CSVTU SPIs */}
        <Education />

        {/* 06: Certifications & Hackathons */}
        <Certifications />

        {/* 07: Resume View & Download Section */}
        <ResumeSection onOpenResume={handleOpenResume} />

        {/* 08: Direct Contact & Transmission Portal */}
        <Contact />
      </main>

      {/* Futuristic Footer */}
      <Footer onOpenResume={handleOpenResume} />

      {/* Full-Screen PDF Resume & Academic CV Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        initialType={resumeModalType}
      />

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={setPaletteOpen}
        onOpenResume={handleOpenResume}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
}
