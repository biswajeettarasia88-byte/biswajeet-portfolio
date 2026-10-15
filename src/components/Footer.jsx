import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    sounds.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 items-start">
          
          {/* Brand Info (Col 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                <span className="font-mono text-sm font-black text-cyan-400">BT</span>
              </div>
              <span className="font-sans font-bold text-lg text-white">
                {resumeData.personal.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-sans max-w-sm leading-relaxed">
              AI & ML Researcher specializing in Vision Language Models, Multilingual Harassment Benchmarking (SheSafe-Bench, ACL ARR 2026), and modern MERN architecture.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Resume Single Source of Truth • 100% Verified Information</span>
            </div>
          </div>

          {/* Quick Nav Links (Col 4) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Navigation Index
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <a href="#home" onClick={() => sounds.click()} className="hover:text-cyan-400 transition-colors">→ Home</a>
              <a href="#about" onClick={() => sounds.click()} className="hover:text-cyan-400 transition-colors">→ About Me</a>
              <a href="#skills" onClick={() => sounds.click()} className="hover:text-cyan-400 transition-colors">→ Technical Skills</a>
              <a href="#experience" onClick={() => sounds.click()} className="hover:text-cyan-400 transition-colors">→ Experience & IIT</a>
              <a href="#projects" onClick={() => sounds.click()} className="hover:text-cyan-400 transition-colors">→ Projects & ARR</a>
              <a href="#education" onClick={() => sounds.click()} className="hover:text-cyan-400 transition-colors">→ CSVTU Education</a>
              <a href="#certifications" onClick={() => sounds.click()} className="hover:text-cyan-400 transition-colors">→ Certifications</a>
              <a href="#contact" onClick={() => sounds.click()} className="hover:text-cyan-400 transition-colors">→ Direct Contact</a>
            </div>
          </div>

          {/* Action & Documents (Col 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Official Documents
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  sounds.open();
                  onOpenResume('technical');
                }}
                className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors flex items-center justify-between"
              >
                <span>Engineering Resume</span>
                <span>↗</span>
              </button>
              <button
                onClick={() => {
                  sounds.open();
                  onOpenResume('research');
                }}
                className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-purple-300 transition-colors flex items-center justify-between"
              >
                <span>Research CV (OIST)</span>
                <span>↗</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Biswajeet Tarasia. Crafted for high-impact AI research & engineering.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sounds.hover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all text-xs font-mono"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
