import React from 'react';
import { 
  FileText, Download, ExternalLink, CheckCircle2, Eye 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function ResumeSection({ onOpenResume }) {
  const handleDownload = (file) => {
    sounds.success();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
    });
    const a = document.createElement('a');
    a.href = file;
    a.download = file.split('/').pop();
    a.click();
  };

  return (
    <section id="resume" className="relative py-24 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>07 // AUTHENTICATED DOCUMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Curriculum <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Vitae</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Access and download my official curriculum vitae and research dossier. Verified for academic fellowships, research internships, and engineering opportunities.
          </p>
        </div>

        {/* Dual Resume Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Document 1: Technical Resume */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-cyan-400 border border-cyan-500/20">
                  1-Page Engineering
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-sans">
                  Software & AI/ML Resume
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Optimized for Recruiters, SWE & AI Engineering Roles
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>IIT Gandhinagar LINGO Group internship details</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Full-Stack MERN & AI project architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>CSVTU B.Tech AI & ML verified SPI breakdown</span>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <button
                onClick={() => {
                  sounds.open();
                  onOpenResume('technical');
                }}
                onMouseEnter={() => sounds.hover()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>View Engineering Resume</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(resumeData.personal.resumes.technical.file)}
                  onMouseEnter={() => sounds.hover()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download PDF</span>
                </button>

                <a
                  href={resumeData.personal.resumes.technical.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.click()}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono transition-colors flex items-center justify-center"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Document 2: Academic Research CV */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 hover:border-purple-400 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-purple-400 border border-purple-500/20">
                  2-Page Research Dossier
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-sans">
                  Academic Research CV
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  OIST & IIT Format with Full Research Motivation
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>SheSafe-Bench ACL ARR Submission (#9216)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Multilingual 8-language dataset & Cohen's κ metrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Complete Personal Information & Research Statement</span>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <button
                onClick={() => {
                  sounds.open();
                  onOpenResume('research');
                }}
                onMouseEnter={() => sounds.hover()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>View Research CV</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(resumeData.personal.resumes.research.file)}
                  onMouseEnter={() => sounds.hover()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-purple-400" />
                  <span>Download PDF</span>
                </button>

                <a
                  href={resumeData.personal.resumes.research.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.click()}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono transition-colors flex items-center justify-center"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
