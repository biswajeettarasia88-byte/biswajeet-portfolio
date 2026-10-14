# Biswajeet Tarasia — 2026 Developer & AI Researcher Portfolio

A modern, animated, production-grade personal portfolio website built with **React 19**, **Vite 8**, and **Tailwind CSS v4**, designed specifically for **Biswajeet Tarasia** based strictly on verified resume and research records.

---

## 🌟 Key Features & Architecture

- **Futuristic 2026 Cyber Aesthetic**: Deep dark theme (`#030712`), cyan/blue/purple neon gradients, frosted glassmorphism panels, and interactive HTML5 Canvas cyber particle constellation.
- **Single Source of Truth (`src/data/resumeData.js`)**: All content strictly matches Biswajeet Tarasia's uploaded resume and research CV with 0% invented or inflated data.
- **Hero Section**:
  - Live availability badge (`Available for AI/ML Research & Engineering`)
  - Animated typewriter rotating through developer roles (Vision Language Models, AI Safety, Full-Stack MERN)
  - Holographic cyber shield framing Biswajeet's authentic uploaded photo without facial distortion
  - Quick metric ribbons (8,221+ benchmark data, 9.42 peak SPI, 6+ certs)
- **Interactive Sticky Navigation**: Active section tracking, mobile drawer, quick command launcher, sound synthesizer toggle, and instant resume view trigger.
- **Spotlight Command Palette (Ctrl+K / ⌘K)**: Power-user modal for rapid keyboard navigation, quick copying of email/phone, and document access.
- **About Me Section**: Deep dive into Biswajeet's research focus, 4 strategic pillars (Multimodal VLMs, Harassment Benchmarking, Full-Stack AI, Autonomous Drones), and personal verification table.
- **Categorized Technical Skills**: Filterable by AI/ML & NLP, Languages & Backend, Frontend & Web, Tools, and Research Methodologies — with contextual project notes instead of arbitrary fake percentages.
- **Experience Timeline**: Verified entries for:
  - **IIT Gandhinagar** (LINGO Research Group under Dr. Mayank Singh)
  - **SheSafe-Bench** (ACL Rolling Review - ARR 2026 Paper Submission #9216)
  - **Swarna Drone Technology** (Autonomous drone control modules)
- **Featured Projects & Modals**:
  - *SheSafe-Bench* (8,221 comments across 8 Asian language pairs, Cohen's κ = 0.451, zero-shot LLM benchmark)
  - *DebugForge* (Full-stack MERN AI code debugging application)
  - *Phishing Detection & URL Risk Scoring* (Python + ML + OSINT)
  - *Intelligent Context-Aware Chatbot* (Streamlit + LangChain + Local LLM)
  - *Rural Development Offline AI Learning Platform* (Python + NLP)
  - *Cavalier Logistics* (Special presentation module strictly highlighting verified operational architecture)
- **Education Section**: CSVTU B.Tech in CSE (AI & ML) with all 4 verified semester SPIs (Sem 1: 8.46, Sem 2: 9.42, Sem 3: 8.76, Sem 4: 8.95) and Kendriya Vidyalaya (PCMB: 88%).
- **Certifications & Hackathon Honors**: Oracle AI Foundations Associate, AWS Data Engineering, EY & Microsoft AI Skills Passport, Coding Spoon MERN, EduSkills Python, Infosys Springboard, MLH & GitHub Hackathon Winner, OSCG'26 Contributor, NASA Space Apps, Smart India Hackathon.
- **Dual Resume Viewer & Instant Download**:
  - Fullscreen embedded viewer for both 1-page Engineering Resume and 2-page Academic Research CV
  - Instant file download with celebratory confetti animation
- **Verified Contact Portal**: One-click copy for `biswajeettarasia88@gmail.com` and `+91 8260988838`, verified location (Durg, CG, India), social links (GitHub, LinkedIn, Medium, YouTube), and responsive message form.
- **Web Audio API Sound Effects**: Subtle, high-tech synthesized audio feedback for user interactions with persistent mute toggle.

---

## 🚀 Getting Started

### 1. Development Server
Run Vite in development mode with hot module replacement (HMR):
```bash
npm run dev
```

### 2. Production Build & Preview
Build the production bundle in `dist/`:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📁 Directory Structure
```
d:/portpolio 2/
├── public/
│   ├── biswajeet-tarasia.jpg            # Authentic uploaded professional portrait
│   ├── Biswajeet_Tarasia_Resume.pdf     # 1-page Technical Engineering Resume
│   └── Biswajeet_Tarasia_Research_CV.pdf # 2-page Academic Research CV
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Certifications.jsx
│   │   ├── CommandPalette.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── Projects.jsx
│   │   ├── ResumeModal.jsx
│   │   ├── ResumeSection.jsx
│   │   ├── Skills.jsx
│   │   └── SocialIcons.jsx
│   ├── data/
│   │   └── resumeData.js                # Centralized verified data store
│   ├── utils/
│   │   └── sound.js                     # Synthesized futuristic sound engine
│   ├── App.jsx
│   ├── index.css                        # Tailwind CSS v4 & custom glassmorphism styles
│   └── main.jsx
├── index.html                           # SEO meta tags, Google Fonts, OpenGraph
├── package.json
└── vite.config.js
```
