import React, { useState } from 'react';
import { 
  Briefcase, Calendar, Building, ChevronRight, CheckCircle2, 
  Sparkles, FileText, Award 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function Experience({ onOpenResume }) {
  const [activeExp, setActiveExp] = useState(resumeData.experience[0].id);

  return (
    <section id="experience" className="relative py-24 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>03 // PROFESSIONAL & RESEARCH TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Research & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Internships</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Verified academic appointments, peer-reviewed conference submissions, and engineering contributions strictly sourced from my official resume.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-cyan-500/20 ml-4 md:ml-32 space-y-12">
          {resumeData.experience.map((exp) => {
            const isSelected = activeExp === exp.id;
            return (
              <div 
                key={exp.id} 
                className="relative pl-6 sm:pl-10 group"
                onClick={() => {
                  sounds.click();
                  setActiveExp(exp.id);
                }}
              >
                {/* Timeline node icon */}
                <div 
                  className={`absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                    exp.featured
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                      : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-cyan-400'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Left Date Ribbon on Desktop */}
                <div className="hidden md:block absolute -left-36 top-2 text-right w-28 text-xs font-mono text-cyan-400/90 font-medium">
                  {exp.period}
                </div>

                {/* Card Container */}
                <div 
                  className={`glass-panel p-6 sm:p-8 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-cyan-500/50 bg-slate-900/90 shadow-[0_0_40px_rgba(6,182,212,0.15)]'
                      : 'border-slate-800/80 hover:border-slate-700 bg-slate-900/50'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      {exp.type}
                    </span>
                    <span className="md:hidden text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {exp.period}
                    </span>
                    {exp.status && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {exp.status}
                      </span>
                    )}
                  </div>

                  {/* Role & Organization Title */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-cyan-200 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400/90 font-sans flex flex-wrap items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      <span>{exp.organization}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 text-xs font-mono">{exp.location}</span>
                    </div>
                  </div>

                  {/* Mentor Highlight (if present) */}
                  {exp.mentor && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                      <Award className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Advisor: {exp.mentor}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5 font-sans">
                    {exp.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-slate-500 mr-1">
                      Technologies:
                    </span>
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Academic CV Footer Prompt */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              sounds.open();
              onOpenResume('research');
            }}
            onMouseEnter={() => sounds.hover()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-mono transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Open Complete Academic Research CV (OIST & IIT Format)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
