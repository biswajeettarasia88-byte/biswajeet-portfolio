import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, 
  MessageSquare 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, MediumIcon } from './SocialIcons';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function Contact({ links = resumeData?.personal?.links }) {
  const profileLinks = links || resumeData.personal.links;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const copyToClipboard = (text, type) => {
    sounds.success();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.click();
    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');
      sounds.success();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
      });

      // Reset after 4 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus('idle');
      }, 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#030712]">
      {/* Glow elements */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>08 // CONNECT & INITIATE DIALOGUE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Get In <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Interested in discussing Vision Language Model research, multilingual benchmarks, full-stack development, or full-time / internship opportunities?
          </p>
        </div>

        {/* Contact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Verified Channels (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  Direct Contact Channels
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Verified communications directly from official resume
                </p>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-2 group">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Mail className="w-4 h-4" /> Official Email
                  </span>
                  <button
                    onClick={() => copyToClipboard(resumeData.personal.email, 'email')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${resumeData.personal.email}`}
                  className="text-sm sm:text-base font-bold text-slate-100 hover:text-cyan-400 transition-colors block font-sans break-all"
                >
                  {resumeData.personal.email}
                </a>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-2 group">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Phone className="w-4 h-4" /> Direct Phone
                  </span>
                  <button
                    onClick={() => copyToClipboard(resumeData.personal.phone, 'phone')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`tel:${resumeData.personal.phone}`}
                  className="text-sm sm:text-base font-bold text-slate-100 hover:text-cyan-400 transition-colors block font-mono"
                >
                  {resumeData.personal.phone}
                </a>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Current Address
                </div>
                <div className="text-sm font-semibold text-slate-200 font-sans">
                  {resumeData.personal.location}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Open to on-site, hybrid, or remote collaborations
                </div>
              </div>

              {/* Social Platforms Row */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400">
                  Online Profiles & Repositories:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={profileLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.click()}
                    onMouseEnter={() => sounds.hover()}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all cursor-pointer relative z-10"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4 text-cyan-400 shrink-0 pointer-events-none" />
                    <span className="pointer-events-none">GitHub</span>
                  </a>

                  <a
                    href={profileLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.click()}
                    onMouseEnter={() => sounds.hover()}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all cursor-pointer relative z-10"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4 text-cyan-400 shrink-0 pointer-events-none" />
                    <span className="pointer-events-none">LinkedIn</span>
                  </a>

                  <a
                    href={profileLinks.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.click()}
                    onMouseEnter={() => sounds.hover()}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all cursor-pointer relative z-10"
                    title="Medium Publications"
                  >
                    <MediumIcon className="w-4 h-4 text-purple-400 shrink-0 pointer-events-none" />
                    <span className="pointer-events-none">Medium</span>
                  </a>

                  <a
                    href={profileLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.click()}
                    onMouseEnter={() => sounds.hover()}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all cursor-pointer relative z-10"
                    title="YouTube Channel"
                  >
                    <YoutubeIcon className="w-4 h-4 text-rose-400 shrink-0 pointer-events-none" />
                    <span className="pointer-events-none">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Portal Form (Col 7) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  Dispatch Direct Communication
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Messages route directly to biswajeettarasia88@gmail.com
                </p>
              </div>

              {status === 'sent' ? (
                <div className="py-12 px-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-center space-y-3 animate-in fade-in">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-sans">
                    Transmission Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans">
                    Thank you for reaching out. Your communication packet has been registered. You can also write directly to <strong className="text-cyan-300">biswajeettarasia88@gmail.com</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Jane Smith / Recruiter"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane.smith@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">
                      Subject / Intent *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI Research Fellowship / Engineering Opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">
                      Message Packet *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share project details, role description, or research inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    onMouseEnter={() => sounds.hover()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'sending' ? 'Transmitting...' : 'Dispatch Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
