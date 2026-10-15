import React, { useState, useEffect } from 'react';
import { 
  Menu, X, FileText, Command, Volume2, VolumeX, ChevronRight 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';

export default function Navbar({ onOpenResume, onOpenPalette, soundEnabled, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section tracking
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    sounds.click();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Monogram */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            onMouseEnter={() => sounds.hover()}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all">
              <span className="font-mono text-sm font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                BT
              </span>
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </div>
            <div>
              <div className="font-sans font-extrabold text-sm tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                {resumeData.personal.name}
                <span className="hidden xl:inline-flex text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                  AI & ML
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
                CSVTU • IIT Gn Intern
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  onMouseEnter={() => sounds.hover()}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Bar (Sound, Command Palette, Resume CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => {
                sounds.click();
                onOpenPalette();
              }}
              onMouseEnter={() => sounds.hover()}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 text-xs font-mono transition-all"
              title="Search and commands (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono">⌘K</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              onMouseEnter={() => sounds.hover()}
              className={`p-2 rounded-xl border text-xs transition-all ${
                soundEnabled
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/70 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label="Toggle UI Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                sounds.open();
                onOpenResume('technical');
              }}
              onMouseEnter={() => sounds.hover()}
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-sans text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => {
                sounds.click();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white lg:hidden transition-colors"
              aria-label="Open mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-slate-950/95 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 pb-2 border-b border-slate-800">
              Navigation Menu
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 border border-transparent hover:border-cyan-500/20 transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800/80">
            <button
              onClick={() => {
                sounds.open();
                setMobileMenuOpen(false);
                onOpenResume('technical');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume (PDF)</span>
            </button>

            <button
              onClick={() => {
                sounds.click();
                setMobileMenuOpen(false);
                onOpenPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
            >
              <Command className="w-4 h-4 text-cyan-400" />
              <span>Open Command Palette</span>
            </button>

            <div className="text-center text-[11px] font-mono text-slate-500 pt-2">
              {resumeData.personal.name} • CSVTU AI&ML • IIT Gn Intern
            </div>
          </div>
        </div>
      )}
    </>
  );
}
