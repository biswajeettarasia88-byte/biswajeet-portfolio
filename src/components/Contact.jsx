import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, 
  MessageSquare, AlertCircle, Loader2, RefreshCw, ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, MediumIcon } from './SocialIcons';
import { resumeData } from '../data/resumeData';
import { sounds } from '../utils/sound';
import { validateContactForm, FIELD_LIMITS } from '../utils/contactValidation';
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

  const [botField, setBotField] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');

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

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (status === 'error') {
      setStatus('idle');
      setServerMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (status === 'submitting') return;

    sounds.click();

    // Bot honeypot check
    if (botField) {
      // Discard silently if bot filled hidden field
      setStatus('success');
      return;
    }

    // Client-side validation
    const { isValid, errors: validationErrors, sanitized } = validateContactForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      sounds.click();
      return;
    }

    setErrors({});
    setStatus('submitting');
    setServerMessage('');

    // Determine target API endpoint:
    // 1. If VITE_CONTACT_API_URL is configured (e.g. deployed serverless endpoint or Formspree), use it.
    // 2. Otherwise default to FormSubmit AJAX endpoint for static GitHub Pages delivery to biswajeettarasia88@gmail.com.
    const endpoint = (import.meta.env.VITE_CONTACT_API_URL || '').trim() ||
      'https://formsubmit.co/ajax/biswajeettarasia88@gmail.com';

    try {
      const payload = {
        name: sanitized.name,
        email: sanitized.email,
        subject: sanitized.subject,
        message: sanitized.message,
        _subject: `[Portfolio Inquiry] ${sanitized.subject} — ${sanitized.name}`,
        _replyto: sanitized.email,
        _honey: botField,
        botField: botField
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success !== false)) {
        setStatus('success');
        sounds.success();
        confetti({
          particleCount: 80,
          spread: 85,
          origin: { y: 0.7 },
          colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
        });
        // Clear form fields only on confirmed success
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setServerMessage(
          data?.error || data?.message ||
          'Message could not be dispatched by the email gateway. Please try again or reach out directly.'
        );
      }
    } catch {
      setStatus('error');
      setServerMessage(
        'Network error preventing message dispatch. Please check your connection or contact me directly.'
      );
    }
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

              {status === 'success' ? (
                <div className="py-12 px-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-center space-y-4 animate-in fade-in" role="status" aria-live="polite">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-sans">
                    Transmission Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans leading-relaxed">
                    Thank you for reaching out. Your communication packet has been accepted by the dispatch gateway for <strong className="text-cyan-300">biswajeettarasia88@gmail.com</strong>. I will review and reply directly to your email shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.click();
                        setStatus('idle');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Dispatch Another Transmission</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Status announcement for screen readers */}
                  <div aria-live="polite" role="status" className="sr-only">
                    {status === 'submitting' && 'Dispatching transmission to email gateway...'}
                    {status === 'error' && (serverMessage || 'Message could not be sent. Please check the form errors.')}
                  </div>

                  {/* Honeypot Spam Prevention Field (hidden from genuine users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-botfield">Leave this empty</label>
                    <input
                      type="text"
                      id="contact-botfield"
                      name="botField"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />
                  </div>

                  {/* Top Error Alert Banner if submission failed */}
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs font-mono space-y-2 animate-in fade-in" role="alert">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-semibold text-rose-300">
                            {serverMessage || 'Message could not be sent. Please try again or contact me directly.'}
                          </p>
                          <p className="text-slate-400 text-[11px]">
                            Your drafted message packet has been preserved below.
                          </p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <a
                          href={`mailto:biswajeettarasia88@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Biswajeet,\n\n${formData.message}\n\nFrom,\n${formData.name} (${formData.email})`)}`}
                          className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 underline text-xs font-mono font-medium"
                        >
                          <span>Open in your Email App instead (mailto)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono text-slate-300 block">
                        Your Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        maxLength={FIELD_LIMITS.NAME_MAX}
                        placeholder="e.g. Dr. Jane Smith / Recruiter"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-colors ${
                          errors.name 
                            ? 'border-rose-500/70 focus:border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]' 
                            : 'border-slate-800 focus:border-cyan-500/60'
                        }`}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-rose-400 text-xs font-mono mt-1 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono text-slate-300 block">
                        Your Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        maxLength={FIELD_LIMITS.EMAIL_MAX}
                        placeholder="jane.smith@organization.com"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-colors ${
                          errors.email 
                            ? 'border-rose-500/70 focus:border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]' 
                            : 'border-slate-800 focus:border-cyan-500/60'
                        }`}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-rose-400 text-xs font-mono mt-1 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300 block">
                      Subject / Intent <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      required
                      maxLength={FIELD_LIMITS.SUBJECT_MAX}
                      placeholder="e.g. AI Research Fellowship / Engineering Opportunity"
                      value={formData.subject}
                      onChange={(e) => handleFieldChange('subject', e.target.value)}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-colors ${
                        errors.subject 
                          ? 'border-rose-500/70 focus:border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]' 
                          : 'border-slate-800 focus:border-cyan-500/60'
                      }`}
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" className="text-rose-400 text-xs font-mono mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="contact-message" className="text-xs font-mono text-slate-300 block">
                        Message Packet <span className="text-cyan-400">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        {formData.message.length} / {FIELD_LIMITS.MESSAGE_MAX}
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      maxLength={FIELD_LIMITS.MESSAGE_MAX}
                      placeholder="Share project details, role description, or research inquiry..."
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans transition-colors resize-none ${
                        errors.message 
                          ? 'border-rose-500/70 focus:border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]' 
                          : 'border-slate-800 focus:border-cyan-500/60'
                      }`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-rose-400 text-xs font-mono mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    onMouseEnter={() => sounds.hover()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer relative z-10"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
                        <span>Dispatching Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Message</span>
                      </>
                    )}
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
