import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('Initializing quantum core...');

  useEffect(() => {
    const steps = [
      { at: 15, text: 'Mounting verified resume telemetry...' },
      { at: 40, text: 'Loading IIT Gandhinagar LINGO research modules...' },
      { at: 70, text: 'Verifying SheSafe-Bench (ARR 2026) parameters...' },
      { at: 90, text: 'Calibrating 2026 holographic interface...' },
      { at: 100, text: 'System ready.' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        const currentStep = steps.find((s) => next >= s.at && prev < s.at);
        if (currentStep) {
          setStepText(currentStep.text);
        }
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 350);
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white selection:bg-cyan-500/30">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {/* Monogram Badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
          <span className="font-mono text-2xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            BT
          </span>
        </div>

        {/* Title */}
        <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-2 flex items-center justify-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          Neural Portfolio Kernel v2026
        </h1>
        <h2 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl font-sans">
          Biswajeet Tarasia
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          AI & ML Researcher • Full-Stack Engineer
        </p>

        {/* Progress Bar Container */}
        <div className="mt-8">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
            <span className="truncate pr-2">{stepText}</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-800 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-75 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Telemetry status tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-[10px] font-mono text-slate-500">
          <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/50">IIT Gandhinagar LINGO</span>
          <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/50">ACL ARR 2026</span>
          <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900/50">CSVTU AI & ML</span>
        </div>

        {/* Quick skip button */}
        <button
          onClick={onFinish}
          className="mt-8 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors underline underline-offset-4"
        >
          Skip animation →
        </button>
      </div>
    </div>
  );
}
