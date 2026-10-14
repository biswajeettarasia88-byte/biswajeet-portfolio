import React from 'react';
import { 
  Award, Trophy, ShieldCheck, CheckCircle2, Flame, 
  Globe, GitPullRequest, Code, Sparkles, ExternalLink 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function Certifications() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy': return Trophy;
      case 'GitPullRequest': return GitPullRequest;
      case 'Globe': return Globe;
      case 'Flame': return Flame;
      default: return Code;
    }
  };

  return (
    <section id="certifications" className="relative py-24 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>06 // CREDENTIALS & HONORS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Certifications & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Accredited enterprise certifications and competitive international hackathon awards verified directly from my credentials.
          </p>
        </div>

        {/* Dual Grid: Certifications & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Certifications (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-white font-sans flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Industry Certifications
              </h3>
              <span className="text-xs font-mono text-cyan-400">
                6 Verified Badges
              </span>
            </div>

            <div className="space-y-3">
              {resumeData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 glass-panel-hover flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-200 transition-colors font-sans">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {cert.issuer} • <span className="text-cyan-400">{cert.year}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 whitespace-nowrap">
                    {cert.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Hackathons (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-white font-sans flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-400" />
                Hackathons & Activities
              </h3>
              <span className="text-xs font-mono text-purple-400">
                5 Major Competitions
              </span>
            </div>

            <div className="space-y-3">
              {resumeData.achievements.map((ach, idx) => {
                const Icon = getIcon(ach.icon);
                const isWinner = ach.title.toLowerCase().includes('winner');
                return (
                  <div
                    key={idx}
                    className={`glass-panel p-4 sm:p-5 rounded-2xl border transition-all ${
                      isWinner
                        ? 'border-purple-500/40 bg-gradient-to-r from-purple-950/20 via-slate-900/60 to-slate-900/80 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                        : 'border-slate-800/80 hover:border-slate-700 bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-xl border ${
                        isWinner
                          ? 'bg-purple-950/50 border-purple-500/40 text-purple-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-slate-100 font-sans">
                            {ach.title}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-500">
                            {ach.date}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-purple-300 font-sans">
                          {ach.organization}
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                          {ach.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
