import React, { useState, useEffect, useCallback } from 'react';
import { X, Download, ExternalLink, Printer, FileText, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function ResumeModal({ isOpen, onClose, initialType = 'technical' }) {
  const [userSelectedType, setUserSelectedType] = useState(null);
  const activeType = userSelectedType || initialType;

  const handleClose = useCallback(() => {
    setUserSelectedType(null);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const currentResume = resumeData.personal.resumes[activeType] || resumeData.personal.resumes.technical;

  if (!isOpen) return null;

  const handleDownload = () => {
    sounds.success();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
    });
    const a = document.createElement('a');
    a.href = currentResume.file;
    a.download = currentResume.file.split('/').pop().split('?')[0].split('#')[0];
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    sounds.click();
    const printWindow = window.open(currentResume.file, '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-100 font-sans">
                  {resumeData.personal.name} — Verified Resume Document
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Source of Truth
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {currentResume.title} ({currentResume.pages} {currentResume.pages === 1 ? 'Page' : 'Pages'})
              </p>
            </div>
          </div>

          {/* Document Switcher Tabs */}
          <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => {
                sounds.click();
                setUserSelectedType('technical');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeType === 'technical'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Engineering Resume (1-Page)
            </button>
            <button
              onClick={() => {
                sounds.click();
                setUserSelectedType('research');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeType === 'research'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Academic Research CV (2-Page)
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              onMouseEnter={() => sounds.hover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-all"
              title="Download PDF File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              onMouseEnter={() => sounds.hover()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <a
              href={currentResume.file}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.click()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all"
              title="Open in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Tab</span>
            </a>

            <button
              onClick={() => {
                sounds.click();
                handleClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Frame Viewer */}
        <div className="flex-1 w-full bg-slate-950 relative overflow-hidden flex flex-col">
          <iframe
            key={currentResume.file}
            src={`${currentResume.file}#toolbar=1&navpanes=0`}
            title={currentResume.title}
            className="w-full h-full border-0"
          />

          {/* Overlay fallback helper for mobile browsers or systems blocking iframe PDFs */}
          <div className="sm:hidden px-4 py-2 bg-slate-900 border-t border-slate-800 text-center text-xs text-slate-400 font-mono flex items-center justify-between">
            <span>Mobile PDF preview limited?</span>
            <a
              href={currentResume.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline font-semibold"
            >
              Open Fullscreen PDF →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
