import React, { useState, useEffect } from 'react';
import { 
  Search, X, FileText, Download, Mail, Phone, ExternalLink,
  Terminal, Sparkles, GraduationCap, Briefcase, Code, Award, Volume2, VolumeX 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function CommandPalette({ isOpen, onClose, onOpenResume, soundEnabled, onToggleSound }) {
  const [query, setQuery] = useState('');
  const [copiedText, setCopiedText] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sounds.click();
        if (onClose) {
          onClose(!isOpen);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        sounds.click();
        if (onClose) {
          onClose(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'sec-about',
      label: 'About Biswajeet Tarasia',
      category: 'Navigation',
      icon: Terminal,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose(false);
      }
    },
    {
      id: 'sec-skills',
      label: 'Technical Skills (AI/ML, Backend, MERN, Tools)',
      category: 'Navigation',
      icon: Code,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose(false);
      }
    },
    {
      id: 'sec-exp',
      label: 'Experience (IIT Gandhinagar & Research)',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose(false);
      }
    },
    {
      id: 'sec-projects',
      label: 'Projects & SheSafe-Bench ARR Showcase',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose(false);
      }
    },
    {
      id: 'sec-education',
      label: 'Education (CSVTU AI&ML & Semester SPIs)',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => {
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
        onClose(false);
      }
    },
    {
      id: 'sec-certifications',
      label: 'Certifications & Hackathon Awards',
      category: 'Navigation',
      icon: Award,
      action: () => {
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
        onClose(false);
      }
    },
    {
      id: 'sec-contact',
      label: 'Contact Information & Message Portal',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose(false);
      }
    },
    {
      id: 'act-view-resume-tech',
      label: 'View Software & AI/ML Resume (1-Page)',
      category: 'Documents',
      icon: FileText,
      action: () => {
        onOpenResume('technical');
        onClose(false);
      }
    },
    {
      id: 'act-view-resume-cv',
      label: 'View Academic Research CV (2-Page OIST/IIT)',
      category: 'Documents',
      icon: FileText,
      action: () => {
        onOpenResume('research');
        onClose(false);
      }
    },
    {
      id: 'act-download-resume',
      label: 'Download Engineering Resume (PDF)',
      category: 'Documents',
      icon: Download,
      action: () => {
        const a = document.createElement('a');
        a.href = resumeData.personal.resumes.technical.file;
        a.download = resumeData.personal.resumes.technical.file.split('/').pop().split('?')[0].split('#')[0];
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        sounds.success();
        onClose(false);
      }
    },
    {
      id: 'act-download-cv',
      label: 'Download Academic Research CV (PDF)',
      category: 'Documents',
      icon: Download,
      action: () => {
        const a = document.createElement('a');
        a.href = resumeData.personal.resumes.research.file;
        a.download = resumeData.personal.resumes.research.file.split('/').pop().split('?')[0].split('#')[0];
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        sounds.success();
        onClose(false);
      }
    },
    {
      id: 'act-copy-email',
      label: `Copy Email (${resumeData.personal.email})`,
      category: 'Quick Actions',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(resumeData.personal.email);
        sounds.success();
        setCopiedText('Email copied to clipboard!');
        setTimeout(() => {
          setCopiedText('');
          onClose(false);
        }, 1200);
      }
    },
    {
      id: 'act-copy-phone',
      label: `Copy Phone (${resumeData.personal.phone})`,
      category: 'Quick Actions',
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText(resumeData.personal.phone);
        sounds.success();
        setCopiedText('Phone copied to clipboard!');
        setTimeout(() => {
          setCopiedText('');
          onClose(false);
        }, 1200);
      }
    },
    {
      id: 'act-open-github',
      label: 'Open GitHub Profile (@biswajeettarasia88-byte)',
      category: 'Social Profiles',
      icon: ExternalLink,
      action: () => {
        window.open(resumeData.personal.links.github, '_blank', 'noopener,noreferrer');
        sounds.click();
        onClose(false);
      }
    },
    {
      id: 'act-open-linkedin',
      label: 'Open LinkedIn Profile (Biswajeet Tarasia)',
      category: 'Social Profiles',
      icon: ExternalLink,
      action: () => {
        window.open(resumeData.personal.links.linkedin, '_blank', 'noopener,noreferrer');
        sounds.click();
        onClose(false);
      }
    },
    {
      id: 'act-open-medium',
      label: 'Open Medium Blog (@biswajeettarasia88)',
      category: 'Social Profiles',
      icon: ExternalLink,
      action: () => {
        window.open(resumeData.personal.links.medium, '_blank', 'noopener,noreferrer');
        sounds.click();
        onClose(false);
      }
    },
    {
      id: 'act-open-youtube',
      label: 'Open YouTube Channel (@BiswajeetTarasia)',
      category: 'Social Profiles',
      icon: ExternalLink,
      action: () => {
        window.open(resumeData.personal.links.youtube, '_blank', 'noopener,noreferrer');
        sounds.click();
        onClose(false);
      }
    },
    {
      id: 'act-toggle-sound',
      label: soundEnabled ? 'Mute Futuristic Audio FX' : 'Enable Futuristic Audio FX',
      category: 'Settings',
      icon: soundEnabled ? VolumeX : Volume2,
      action: () => {
        onToggleSound();
      }
    }
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or jump to section (e.g. SheSafe, IIT, Resume, Skills)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onClose(false)}
            className="px-2 py-1 text-[11px] font-mono rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {copiedText && (
          <div className="px-4 py-2 bg-emerald-500/20 text-emerald-300 text-xs font-mono border-b border-emerald-500/30 flex items-center justify-between">
            <span>✓ {copiedText}</span>
          </div>
        )}

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500 font-mono">
              No matching commands or sections found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sounds.click();
                    item.action();
                  }}
                  onMouseEnter={() => sounds.hover()}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 border border-transparent hover:border-cyan-500/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-950/60 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-200 group-hover:text-cyan-200">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-600 group-hover:text-cyan-400">
                    ↵ Execute
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with mouse or click</span>
          <div className="flex gap-2">
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">K</kbd> to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
