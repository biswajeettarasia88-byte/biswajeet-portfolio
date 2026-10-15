import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ShieldCheck, CheckCircle2, X, ArrowUpRight 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'research', label: 'ACL Research' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'fullstack', label: 'Full-Stack MERN' },
    { id: 'special', label: 'Enterprise Showcase' }
  ];

  const getFilteredProjects = () => {
    if (filter === 'all') return resumeData.projects;
    if (filter === 'research') return resumeData.projects.filter(p => p.id === 'shesafe-bench');
    if (filter === 'ml') return resumeData.projects.filter(p => p.category.includes('ML') || p.category.includes('Machine Learning') || p.category.includes('AI'));
    if (filter === 'fullstack') return resumeData.projects.filter(p => p.category.includes('Full-Stack'));
    if (filter === 'special') return resumeData.projects.filter(p => p.id === 'cavalier-logistics');
    return resumeData.projects;
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="relative py-24 bg-[#030712]">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 // VERIFIED ENGINEERING & RESEARCH INVENTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Featured <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Every project presented here reflects genuine architectures built and submitted to peer review, international challenges, and verified systems.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.click();
                setFilter(cat.id);
              }}
              onMouseEnter={() => sounds.hover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isFlagship = project.id === 'shesafe-bench';
            const isCavalier = project.id === 'cavalier-logistics';

            return (
              <div
                key={project.id}
                onClick={() => {
                  sounds.click();
                  setSelectedProject(project);
                }}
                className={`glass-panel rounded-3xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
                  isFlagship
                    ? 'md:col-span-2 lg:col-span-2 border-cyan-500/40 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-cyan-950/30 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]'
                    : isCavalier
                    ? 'border-purple-500/40 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-purple-950/30 hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]'
                    : 'border-slate-800/80 hover:border-cyan-500/30 glass-panel-hover'
                }`}
              >
                {/* Card Header & Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-[11px] font-mono px-3 py-1 rounded-full border ${
                      isFlagship
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 font-semibold'
                        : isCavalier
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/30 font-semibold'
                        : 'bg-slate-800/70 text-slate-300 border-slate-700'
                    }`}>
                      {project.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {project.period}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-sans flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    {project.summary}
                  </p>

                  {/* Highlight Metrics */}
                  {project.metrics && (
                    <div className={`grid gap-2 pt-2 ${
                      isFlagship ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'
                    }`}>
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                          <div className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Flagship: Languages Pills */}
                  {isFlagship && project.languages && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-mono text-slate-400">
                        8 Code-Mixed Asian Language Pairs:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.languages.map((lang, lIdx) => (
                          <span
                            key={lIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-cyan-500/20"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Presentation Note for Cavalier */}
                  {isCavalier && project.verificationNote && (
                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 font-mono flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{project.verificationNote}</span>
                    </div>
                  )}
                </div>

                {/* Footer Tech Stack & Action */}
                <div className="px-6 sm:px-8 py-4 bg-slate-950/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-500 self-center">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-cyan-400 group-hover:underline flex items-center gap-1">
                    Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {selectedProject.badge} • {selectedProject.period}
                </span>
                <h3 className="text-2xl font-bold text-white font-sans mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-sm text-slate-300 font-sans leading-relaxed">
              <p>{selectedProject.description}</p>

              {/* Verified Metrics */}
              {selectedProject.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-2">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-base font-bold text-cyan-400 font-mono">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Implementation Highlights */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Verified Technical Contributions:
                </h4>
                <div className="space-y-2">
                  {selectedProject.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages (for SheSafe) */}
              {selectedProject.languages && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Evaluated Linguistic Datasets:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.languages.map((l, lIdx) => (
                      <span key={lIdx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-cyan-500/30">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Full Technology Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Single Source of Truth Verified
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
