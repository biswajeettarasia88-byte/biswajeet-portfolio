import React, { useState } from 'react';
import { 
  Terminal, Cpu, Code2, Database, Wrench, FileCheck, 
  Search, ShieldCheck, Sparkles, CheckCircle2, Layers 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Disciplines', icon: Sparkles },
    { id: 'ai-ml', label: 'AI, ML & NLP', icon: Cpu },
    { id: 'languages-backend', label: 'Backend & Languages', icon: Terminal },
    { id: 'frontend-web', label: 'Frontend & Full-Stack', icon: Code2 },
    { id: 'tools-devops', label: 'Tools & Environments', icon: Wrench },
    { id: 'research-methodology', label: 'Research Methodologies', icon: FileCheck }
  ];

  const getFilteredCategories = () => {
    let list = resumeData.skills.categories;
    if (activeCategory !== 'all') {
      list = list.filter((c) => c.id === activeCategory);
    }
    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase();
    return list
      .map((cat) => ({
        ...cat,
        skills: cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.level.toLowerCase().includes(query) ||
            s.context.toLowerCase().includes(query)
        )
      }))
      .filter((cat) => cat.skills.length > 0);
  };

  const filtered = getFilteredCategories();

  return (
    <section id="skills" className="relative py-24 bg-[#030712]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // VERIFIED TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Technical <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Skillset</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Categorized strictly from my verified resume without inflated or arbitrary percentage bars. Demonstrated through published benchmarks and production projects.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          
          {/* Categories Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sounds.click();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={() => sounds.hover()}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium font-sans transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Skill Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. PyTorch, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Skills Cards Grid Grouped by Category */}
        <div className="space-y-10">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-sm">
              No skills match your current search query.
            </div>
          ) : (
            filtered.map((catGroup) => (
              <div key={catGroup.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-slate-200 flex items-center gap-2 font-sans">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {catGroup.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    {catGroup.skills.length} verified technologies
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {catGroup.skills.map((skill, s) => (
                    <div
                      key={s}
                      className="glass-panel p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 glass-panel-hover group flex flex-col justify-between space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors font-sans">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-cyan-500/20 whitespace-nowrap">
                          {skill.level}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {skill.context}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/40 text-[10px] font-mono text-slate-500">
                        <span className="flex items-center gap-1 text-emerald-400/80">
                          <CheckCircle2 className="w-3 h-3" /> Resume Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Strengths & Academic Highlights Callout */}
        <div className="mt-16 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>ETHICAL ENGINEERING & METHODOLOGY</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                Real Implementations, Zero Fake Metrics
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Unlike portfolios that claim arbitrary "95% in Python", every technical competence listed here is substantiated by working benchmark submissions, college examinations, and open-source contributions.
              </p>
            </div>

            {/* Strengths chips */}
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.strengths.map((str, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 hover:border-cyan-500/40 transition-colors"
                >
                  ⚡ {str}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
