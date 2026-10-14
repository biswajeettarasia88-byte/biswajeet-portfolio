// Web Audio API synthesized futuristic sound effects
// Lightweight, zero external assets, customizable volume and mute

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.enabled = false; // default muted for great UX, user can toggle on navbar
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bt_portfolio_sound');
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('bt_portfolio_sound', String(this.enabled));
    }
    if (this.enabled) {
      this.init();
      this.playBeep(880, 'sine', 0.08, 0.08);
    }
    return this.enabled;
  }

  playBeep(freq = 600, type = 'sine', duration = 0.05, gain = 0.04) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gainNode.gain.setValueAtTime(gain, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio errors
    }
  }

  hover() {
    this.playBeep(1200, 'sine', 0.03, 0.015);
  }

  click() {
    this.playBeep(800, 'triangle', 0.07, 0.04);
  }

  open() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  success() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        setTimeout(() => {
          this.playBeep(freq, 'sine', 0.12, 0.05);
        }, i * 70);
      });
    } catch {}
  }
}

export const sounds = new SoundSystem();
