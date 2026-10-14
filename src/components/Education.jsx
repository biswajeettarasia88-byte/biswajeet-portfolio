import React from 'react';
import { 
  GraduationCap, Calendar, MapPin, Award, CheckCircle2, 
  TrendingUp, Sparkles, BookOpen, Layers 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function Education() {
  const [btech, kv] = resumeData.education;

  return (
    <section id="education" className="relative py-24 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>05 // ACADEMIC EXCELLENCE & FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Academic <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Strictly verified academic qualifications, university examinations, semester-by-semester SPI track records, and higher secondary credentials.
          </p>
        </div>

        {/* Education Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main University Card (Col 8) */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            
            {/* Institution Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                  Undergraduate Degree Program
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans mt-2">
                  {btech.institution}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-cyan-300 font-sans">
                  {btech.degree} — Specialization in {btech.specialization}
                </p>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-slate-400 space-y-1">
                <div className="flex sm:justify-end items-center gap-1.5 text-cyan-400 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{btech.period}</span>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{btech.location}</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  {btech.status}
                </div>
              </div>
            </div>

            {/* Semester SPI Performance Matrix */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Semester SPI Performance (4 Semesters Verified)
                </h4>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Peak: 9.42 / 10.0
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {btech.spiBreakdown.map((item, sIdx) => {
                  const isPeak = item.spi === 9.42;
                  const percent = (item.spi / 10) * 100;
                  return (
                    <div
                      key={sIdx}
                      className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
                        isPeak
                          ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                        {item.semester}
                      </div>
                      
                      <div className={`text-2xl font-black font-mono ${
                        isPeak ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'text-slate-100'
                      }`}>
                        {item.spi.toFixed(2)}
                      </div>

                      {/* Bar indicator */}
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isPeak
                              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_#22d3ee]'
                              : 'bg-slate-700'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="text-[10px] font-mono text-slate-500">
                        {item.status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Academic Scope & Highlights:
              </h4>
              <div className="space-y-2">
                {btech.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Secondary Schooling Card (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-5">
              <div className="space-y-1 pb-4 border-b border-slate-800">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
                  Higher Secondary Education
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mt-2">
                  {kv.institution}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-purple-300 mt-1">
                  {kv.specialization}
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span>Graduated {kv.period.replace('Graduated ', '')}</span>
                  <span>{kv.location}</span>
                </div>
              </div>

              {/* Percentage Badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/30 to-slate-900 border border-purple-500/30 text-center space-y-1">
                <div className="text-[11px] font-mono text-purple-300 uppercase tracking-widest">
                  Board Examination Score
                </div>
                <div className="text-3xl font-black font-mono text-purple-300">
                  {kv.score}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Distinction in Science & Mathematics (PCMB)
                </div>
              </div>

              {/* Key points */}
              <div className="space-y-2 pt-1">
                {kv.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Academic Integrity Badge */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Verified against official CSVTU & KV transcripts</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
