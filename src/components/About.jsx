import React from 'react';
import { 
  Sparkles, Terminal, BookOpen, Layers, ShieldCheck, 
  Calendar, Globe, Mail, Phone, Cpu, Award 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function About({ onOpenResume }) {
  const pillars = [
    {
      icon: Cpu,
      title: "Multimodal AI & Vision Language Models",
      affiliation: "IIT Gandhinagar • LINGO Group",
      description: "Conducted research under Dr. Mayank Singh on multimodal data annotation pipelines and quality evaluation benchmarks for cutting-edge Vision Language Models (VLMs).",
      tags: ["VLMs", "Multimodal Evaluation", "Data Pipelines"]
    },
    {
      icon: ShieldCheck,
      title: "AI Safety & Harassment Benchmarking",
      affiliation: "ACL Rolling Review (ARR) 2026 • Paper #9216",
      description: "Spearheaded SheSafe-Bench: an 8,221-comment multilingual benchmark across 8 Indic-English language pairs evaluating zero-shot LLM bias and harassment boundaries.",
      tags: ["Code-Mixed NLP", "AI Safety", "Cohen’s κ = 0.451"]
    },
    {
      icon: Layers,
      title: "Full-Stack AI Engineering",
      affiliation: "MERN Stack • Coding Spoon 2026",
      description: "Engineered responsive full-stack applications like DebugForge and context-aware local LLM chatbots that parse error telemetry and automate code patching.",
      tags: ["React.js", "Node.js", "MongoDB", "OpenAI API"]
    },
    {
      icon: Terminal,
      title: "Autonomous Drone Intelligence",
      affiliation: "Swarna Drone Technology • 2025–2026",
      description: "Collaborated on intelligent control modules and computer vision telemetry for autonomous drone operations, evaluating edge-compute embedded AI.",
      tags: ["Autonomous Systems", "Edge AI", "Control Modules"]
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // RESEARCH IDENTITY & PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            About <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Biswajeet</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
            A computer science student and researcher pushing the boundaries of reliable multimodal AI, multilingual evaluation, and production-grade full-stack systems.
          </p>
        </div>

        {/* Top Grid: Bio Narrative & Metadata Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Bio Narrative (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                Engineering Foundations Meets Rigorous AI Research
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a Computer Science Engineering student specializing in <strong className="text-white">Artificial Intelligence and Machine Learning</strong> at Chhattisgarh Swami Vivekanand Technical University (CSVTU), maintaining a consistent academic track record with a peak <strong className="text-cyan-300">9.42 Semester SPI</strong>.
                </p>
                <p>
                  My research trajectory is centered at the intersection of <strong className="text-white">machine learning, multilingual language technologies, and reliable AI evaluation</strong>. During my research internship with the <strong className="text-cyan-300">LINGO Research Group at IIT Gandhinagar</strong> under Dr. Mayank Singh, I contributed to multimodal data annotation pipelines and quality evaluation methodologies for Vision Language Models (VLMs).
                </p>
                <p>
                  I also lead <strong className="text-purple-300">SheSafe-Bench</strong>, a pioneering benchmark evaluating language models on women-directed harassment across 8 multilingual and code-mixed Asian language pairs, submitted to the prestigious <strong className="text-white">ACL Rolling Review (ARR), October 2026</strong>.
                </p>
              </div>

              {/* Research Quote Box */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs sm:text-sm text-cyan-200/90 italic space-y-2">
                <p>
                  "{resumeData.researchStatement.quote}"
                </p>
                <div className="text-[11px] font-mono text-cyan-400 not-italic flex items-center justify-between">
                  <span>— {resumeData.researchStatement.author}</span>
                  <span>OIST & IIT Gandhinagar Research Dossier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Verified Profile Card (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  Verified Resume Dossier
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Authenticated
                </span>
              </div>

              {/* Details table */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" /> Current Location:
                  </span>
                  <span className="text-slate-200 font-semibold">{resumeData.personal.location}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Degree Program:
                  </span>
                  <span className="text-slate-200 text-right">B.Tech CSE (AI & ML)</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-cyan-400" /> Academic Standing:
                  </span>
                  <span className="text-cyan-300 font-bold">9.42 Peak SPI / 8.90 Avg</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Date of Birth:
                  </span>
                  <span className="text-slate-200">{resumeData.personal.dob}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Direct Email:
                  </span>
                  <a
                    href={`mailto:${resumeData.personal.email}`}
                    className="text-cyan-400 hover:underline truncate max-w-[190px]"
                  >
                    {resumeData.personal.email}
                  </a>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Phone:
                  </span>
                  <a href={`tel:${resumeData.personal.phone}`} className="text-slate-200 hover:text-cyan-400">
                    {resumeData.personal.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">National Schooling:</span>
                  <span className="text-slate-200">Kendriya Vidyalaya (88%)</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    sounds.open();
                    onOpenResume('research');
                  }}
                  onMouseEnter={() => sounds.hover()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Inspect Academic Research CV</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Matrix: 4 Strategic Core Pillars */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white font-sans flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Core Research & Engineering Pillars
            </h3>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Verified Experience & Publications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 glass-panel-hover flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        0{i + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-200 transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
                        {pillar.affiliation}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                    {pillar.tags.map((tag, t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
