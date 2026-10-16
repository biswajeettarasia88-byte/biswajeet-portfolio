import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, FileText, Terminal, ShieldCheck, 
  Mail, Cpu, ChevronDown 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

const titles = resumeData.personal.subtitles;

export default function Hero({ onOpenResume }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for animated titles
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 75);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Information (Col 7) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>
              <span className="text-xs font-mono font-medium text-slate-300">
                Available for AI/ML Research & Engineering
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="hidden sm:inline text-xs font-mono text-cyan-400">
                2026 Cohort
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-400 flex items-center justify-center lg:justify-start gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Next-Gen AI Systems & Multimodal NLP</span>
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.08]">
                Hi, I'm <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.3)]">
                  {resumeData.personal.name}
                </span>
              </h1>
            </div>

            {/* Typewriter Rotator Bar */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-2 font-mono text-lg sm:text-2xl font-bold text-slate-200">
                <span className="text-cyan-400">&gt;</span>
                <span className="text-transparent bg-gradient-to-r from-slate-100 via-cyan-200 to-blue-300 bg-clip-text">
                  {displayText}
                </span>
                <span className="w-2.5 h-6 sm:h-7 bg-cyan-400 animate-pulse ml-0.5 inline-block" />
              </div>
            </div>

            {/* Professional Introduction paragraph strictly from resume */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Computer Science Engineering student specializing in <strong className="text-white font-semibold">Artificial Intelligence & Machine Learning</strong> at CSVTU. Research intern at <strong className="text-cyan-300 font-semibold">IIT Gandhinagar's LINGO Research Group</strong> under Dr. Mayank Singh, and author of <strong className="text-purple-300 font-semibold">SheSafe-Bench</strong> submitted to ACL Rolling Review (ARR 2026).
            </p>

            {/* CTAs & Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary Explore CTA */}
              <a
                href="#projects"
                onClick={() => sounds.click()}
                onMouseEnter={() => sounds.hover()}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Research & Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* View Resume Button */}
              <button
                onClick={() => {
                  sounds.open();
                  onOpenResume('technical');
                }}
                onMouseEnter={() => sounds.hover()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/50 text-sm font-semibold shadow-lg transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Resume</span>
              </button>

              {/* Contact Button */}
              <a
                href="#contact"
                onClick={() => sounds.click()}
                onMouseEnter={() => sounds.hover()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-slate-700 text-sm font-medium transition-all"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Quick Links & Verified Metadata */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-slate-400">
              <a
                href={resumeData.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.click()}
                onMouseEnter={() => sounds.hover()}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 pointer-events-none" />
                <span className="pointer-events-none">GitHub</span>
              </a>

              <a
                href={resumeData.personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.click()}
                onMouseEnter={() => sounds.hover()}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 pointer-events-none" />
                <span className="pointer-events-none">LinkedIn</span>
              </a>

              <a
                href={`mailto:${resumeData.personal.email}`}
                onMouseEnter={() => sounds.hover()}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{resumeData.personal.email}</span>
              </a>

              <div className="flex items-center gap-1.5 text-slate-500">
                <span>📍 Durg, CG, India</span>
              </div>
            </div>

          </div>

          {/* Right Column: Holographic Photo & Cyber Shield (Col 5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-72 sm:w-80 md:w-96 group">
              
              {/* Outer Glowing Cyber Rings */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-40 blur-xl group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-slow" />
              
              {/* Futuristic Cyber Frame Container */}
              <div className="relative rounded-3xl bg-slate-950 p-3 ring-1 ring-white/10 shadow-2xl">
                
                {/* Photo container without distortion */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-900 border border-cyan-500/30">
                  <img
                    src={resumeData.personal.photo}
                    alt={resumeData.personal.name}
                    className="h-full w-full object-cover object-center filter saturate-[1.05] contrast-[1.02] group-hover:scale-[1.03] transition-transform duration-500"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = `${import.meta.env.BASE_URL}Biswajeet_Tarasia_Photo.jpeg`;
                      } else if (!target.dataset.triedFallback2) {
                        target.dataset.triedFallback2 = 'true';
                        target.src = `${import.meta.env.BASE_URL}biswajeet-tarasia.jpg`;
                      }
                    }}
                  />

                  {/* Subtle futuristic scanline overlay & gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Holographic Top Corner Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>VERIFIED PROFILE</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-purple-500/40 text-[10px] font-mono text-purple-300">
                    OIST / IIT Gn
                  </div>

                  {/* Floating Bottom Card: SheSafe-Bench & IIT Gn Highlight */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-left space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan-400 font-semibold flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5" /> ACL ARR 2026 Author
                      </span>
                      <span className="text-emerald-400 font-mono font-bold">9.42 SPI</span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-1 font-sans">
                      Lead Author: SheSafe-Bench • LINGO IIT Gandhinagar
                    </p>
                  </div>
                </div>

                {/* Decorative Cyber Frame Corners */}
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
              </div>

              {/* Floating Pill Badges around photo */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl text-xs font-mono text-slate-200 animate-float">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Multimodal VLMs</span>
              </div>

              <div className="absolute -right-4 bottom-1/4 hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl text-xs font-mono text-slate-200">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                <span>8,221 Benchmark Data</span>
              </div>
            </div>
          </div>

        </div>

        {/* Highlight Stats Ribbon */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {resumeData.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-4 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all text-center group"
            >
              <div className="text-xl sm:text-2xl font-black font-sans bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1 font-sans">
                {stat.label}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono line-clamp-1">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#about"
        onClick={() => sounds.click()}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyan-400 transition-colors flex flex-col items-center gap-1 font-mono text-[11px]"
      >
        <span>DISCOVER</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
