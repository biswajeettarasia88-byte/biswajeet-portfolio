export const resumeData = {
  personal: {
    name: "Biswajeet Tarasia",
    title: "AI & ML Researcher | Full-Stack Engineer",
    subtitles: [
      "AI & Machine Learning Researcher",
      "IIT Gandhinagar Research Intern (LINGO)",
      "Lead Author of SheSafe-Bench (ACL ARR 2026)",
      "Vision Language Models & AI Safety Specialist",
      "Full-Stack MERN Developer"
    ],
    bio: "Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at CSVTU. Passionate about Multimodal AI, Vision Language Models (VLMs), Multilingual NLP, and robust AI Safety benchmarking. Research intern at IIT Gandhinagar under Dr. Mayank Singh, with first-author research submitted to ACL Rolling Review.",
    email: "biswajeettarasia88@gmail.com",
    phone: "+91 8260988838",
    location: "Durg, Chhattisgarh, India",
    dob: "27 December 2004",
    nationality: "Indian",
    photo: `${import.meta.env.BASE_URL}biswajeet-tarasia.jpg`,
    links: {
      github: "https://github.com/biswajeettarasia88-byte",
      linkedin: "https://www.linkedin.com/in/biswajeet-tarasia-981611373/",
      medium: "https://medium.com/@biswajeettarasia88",
      youtube: "https://www.youtube.com/@BiswajeetTarasia",
      openreview: "https://openreview.net/profile?id=%7EBiswajeet_Tarasia1"
    },
    resumes: {
      technical: {
        title: "Software & AI/ML Resume (1-Page)",
        file: `${import.meta.env.BASE_URL}Biswajeet_Tarasia_Resume.pdf`,
        pages: 1,
        type: "Engineering & Development"
      },
      research: {
        title: "Academic Research CV (2-Page OIST/IIT Format)",
        file: `${import.meta.env.BASE_URL}Biswajeet_Tarasia_Research_CV.pdf`,
        pages: 2,
        type: "Academic & Research Focus"
      }
    }
  },

  stats: [
    { label: "Benchmark Dataset Size", value: "8,221+", detail: "Multilingual harassment comments in 8 Asian language pairs" },
    { label: "Highest Semester SPI", value: "9.42", detail: "CSVTU B.Tech AI & ML (Sem 2 record)" },
    { label: "Research Internship", value: "IIT Gn", detail: "LINGO Group under Dr. Mayank Singh" },
    { label: "Conference Submission", value: "ACL ARR", detail: "October 2026 Cycle (ID: 9216)" },
    { label: "Industry Certifications", value: "6+", detail: "Oracle, AWS, EY/Microsoft, Infosys" },
    { label: "Hackathons & Honors", value: "5+", detail: "MLH Winner, Smart India Hackathon, NASA Space Apps" }
  ],

  experience: [
    {
      id: "iit-gn",
      role: "Research Intern – LINGO Research Group",
      organization: "Indian Institute of Technology Gandhinagar (IIT Gandhinagar)",
      location: "Online / Research Lab",
      period: "May 2026 – Jul 2026",
      type: "Research Internship",
      mentor: "Dr. Mayank Singh (Associate Professor, CSE, IIT Gandhinagar)",
      featured: true,
      description: "Selected to conduct cutting-edge AI research within IIT Gandhinagar's prestigious Language and Information Operations (LINGO) Research Group.",
      highlights: [
        "Worked on multimodal data annotation processing and quality evaluation for state-of-the-art Vision Language Models (VLMs).",
        "Designed and developed scalable data-processing pipelines, model experiments, and evaluation workflows.",
        "Supported annotation workflow benchmarking to systematically improve dataset reliability for AI and NLP research."
      ],
      tags: ["Vision Language Models (VLMs)", "Multimodal AI", "Data Pipelines", "Model Evaluation", "NLP Research"]
    },
    {
      id: "shesafe-bench-project",
      role: "Lead Researcher & Author – SheSafe-Bench",
      organization: "Research Project / ACL Rolling Review (ARR)",
      location: "Academic Research Submission",
      period: "2026 – Present",
      type: "Research Paper Submission",
      status: "Submitted (ARR October 2026 Cycle) | Review ID: 9216",
      featured: true,
      description: "Spearheaded research evaluating large language models for women-directed harassment across multilingual and code-mixed Asian language contexts.",
      highlights: [
        "Curated and validated a benchmark of 8,221 comments across 8 Indic-English language pairs with 6 nuanced annotation categories.",
        "Language pairs covered: Hindi-English, Urdu-English, Bengali-English, Gujarati-English, Marathi-English, Odia-English, Tamil-English, and Nepali-English.",
        "Reported rigorous annotation inter-rater agreement of Cohen’s κ = 0.451.",
        "Benchmarked character n-gram TF-IDF + Logistic Regression baseline against three closed-weight LLMs in zero-shot settings.",
        "Formally submitted to ACL Rolling Review (ARR) October 2026; submission ID: 9216 on OpenReview."
      ],
      tags: ["Multilingual NLP", "Code-Mixed Text", "AI Safety", "LLM Evaluation", "Cohen's κ", "PyTorch"]
    },
    {
      id: "swarna-drone",
      role: "Team Contributor – AI & Software Integration",
      organization: "Swarna Drone Technology",
      location: "Drone Systems & Embedded AI",
      period: "2025 – 2026",
      type: "Engineering Collaboration",
      description: "Collaborated on AI-driven software architecture and intelligent control modules for autonomous drone operations.",
      highlights: [
        "Collaborated on intelligent control modules and computer vision pipelines for autonomous flight dynamics.",
        "Assisted embedded-AI software testing and sensor integration protocols at the proposal stage.",
        "Evaluated edge-compute feasibility for real-time robotic navigation."
      ],
      tags: ["Autonomous Drones", "Embedded AI", "Intelligent Control", "System Integration", "Python"]
    }
  ],

  projects: [
    {
      id: "shesafe-bench",
      title: "SheSafe-Bench: Multilingual & Code-Mixed Harassment Benchmark",
      category: "Research",
      period: "2026",
      badge: "Flagship Research / ACL ARR",
      featured: true,
      summary: "A comprehensive benchmark evaluating language models on detecting sexual harassment and misogyny across 8 code-mixed Asian language pairs.",
      description: "SheSafe-Bench is an academic research contribution submitted to ACL Rolling Review (ARR) 2026 (Submission ID: 9216). It addresses critical evaluation blindspots in state-of-the-art LLMs when processing code-mixed South Asian languages.",
      metrics: [
        { label: "Dataset Volume", value: "8,221 Comments" },
        { label: "Language Pairs", value: "8 Indic-English Pairs" },
        { label: "Annotation Categories", value: "6 Rigorous Classes" },
        { label: "Agreement Score", value: "Cohen’s κ = 0.451" }
      ],
      languages: ["Hindi-English", "Urdu-English", "Bengali-English", "Gujarati-English", "Marathi-English", "Odia-English", "Tamil-English", "Nepali-English"],
      tech: ["Python", "PyTorch", "Hugging Face", "LLM Evaluation", "TF-IDF", "Logistic Regression", "OpenReview"],
      highlights: [
        "Analyzes failure modes, bias patterns, and boundary ambiguity in zero-shot closed-weight LLM prompts.",
        "Evaluates character n-gram lexical baselines vs foundation models on nuanced toxic language.",
        "Provides guidelines for deploying culturally-aware safety filters in Asian digital spaces."
      ],
      links: {
        paper: "ACL Rolling Review (ARR) Oct 2026 — ID: 9216",
        venue: "OpenReview Submission Page"
      }
    },
    {
      id: "cavalier-logistics",
      title: "Cavalier Logistics – Enterprise Logistics Architecture",
      category: "Special Presentation",
      period: "Verified Enterprise Module",
      badge: "Verified Client Showcase",
      featured: true,
      summary: "Special enterprise showcase for the Cavalier Logistic operational workflow, focusing exclusively on verified modules and scalable architecture.",
      description: "Custom modular logistic presentation module requested for verified enterprise presentation. Adheres strictly to verified feature sets with modular placeholders for proprietary enterprise metrics.",
      metrics: [
        { label: "Architecture", value: "Modular Dispatch" },
        { label: "Data Integrity", value: "100% Verified" },
        { label: "Pipeline", value: "End-to-End" }
      ],
      tech: ["Full-Stack Architecture", "Data Verification", "System Pipelines", "Modular API Logic"],
      highlights: [
        "Engineered for high-volume order ingestion, shipment dispatch tracking, and inventory status tracking.",
        "Strictly reflects verified functional components without unverified metrics or inflated parameters.",
        "Customizable enterprise parameter configuration for private deployment reviews."
      ],
      verificationNote: "Verified Enterprise Presentation: Features strictly aligned with client specifications and verified components."
    },
    {
      id: "debugforge",
      title: "DebugForge – AI Code Debugging Application",
      category: "Full-Stack",
      period: "2025",
      badge: "Full-Stack AI Application",
      featured: true,
      summary: "A modern full-stack developer tool that analyzes runtime and syntax programming errors, delivering structured explanations and verified code patches.",
      description: "DebugForge integrates full-stack MERN architecture with OpenAI API models to parse multi-language code snippets, identify root-cause bugs, and deliver contextual fixes.",
      metrics: [
        { label: "Stack", value: "MERN + OpenAI" },
        { label: "Output", value: "Structured Patches" }
      ],
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "OpenAI API", "REST APIs"],
      highlights: [
        "Built responsive web interface for paste-and-analyze code error inputs with line-by-line syntax highlighting.",
        "Constructed backend prompt orchestration and JSON schema validation for reliable AI response parsing.",
        "Features error categorization, solution explanations, and best-practice coding recommendations."
      ]
    },
    {
      id: "phishing-detection",
      title: "Phishing Detection & URL Risk Scoring Pipeline",
      category: "Machine Learning",
      period: "2025",
      badge: "Cyber Intelligence & ML",
      featured: false,
      summary: "Machine learning threat detection pipeline calculating URL risk scores using lexical tokenization, domain attributes, and OSINT telemetry.",
      description: "Combines feature engineering on URL anatomy (entropy, length, suspicious keywords) with external OSINT intelligence to flag malicious vectors in real time.",
      metrics: [
        { label: "Feature Matrix", value: "Lexical + OSINT" },
        { label: "Pipeline", value: "Real-Time Scoring" }
      ],
      tech: ["Python", "Scikit-Learn", "OSINT Data Extraction", "Feature Engineering", "Pandas"],
      highlights: [
        "Engineered lexical extractors to analyze subdomains, entropy, and character n-grams.",
        "Incorporated domain age, registrar attributes, and DNS reputation checks into risk score weights.",
        "Delivered an automated scoring endpoint classifying URLs into safe, suspicious, and high-risk tiers."
      ]
    },
    {
      id: "context-aware-chatbot",
      title: "Intelligent Context-Aware Chatbot",
      category: "AI / ML",
      period: "2025",
      badge: "Local LLM & LangChain",
      featured: false,
      summary: "Stateful interactive conversational agent featuring local-LLM execution, multi-turn persistent memory, and dynamic context tracking.",
      description: "Designed to provide conversational AI capabilities without leaking data to cloud endpoints, utilizing local inference engines and LangChain memory structures.",
      metrics: [
        { label: "Inference", value: "Local LLM" },
        { label: "Memory", value: "Persistent Context" }
      ],
      tech: ["Python", "Streamlit", "LangChain", "Local LLMs", "Vector Context"],
      highlights: [
        "Implemented sliding-window and summary memory buffers to preserve conversational history across extended dialogues.",
        "Integrated local open-source weights for private, on-device document query and assistance.",
        "Constructed an interactive, reactive UI in Streamlit with real-time token streaming."
      ]
    },
    {
      id: "rural-development-ai",
      title: "Offline AI Learning Platform for Rural Schools",
      category: "EdTech & NLP",
      period: "2025",
      badge: "Social Impact AI Concept",
      featured: false,
      summary: "An offline-first educational platform designed to empower students in rural schools with limited or zero internet connectivity.",
      description: "Built with modular architecture and rigorous input validation to run lightweight NLP learning modules on low-power local hardware.",
      metrics: [
        { label: "Connectivity", value: "Zero Internet Needed" },
        { label: "Focus", value: "Rural Education" }
      ],
      tech: ["Python", "NLP", "Modular System Design", "Input Validation"],
      highlights: [
        "Designed offline-capable content delivery architecture eliminating reliance on continuous bandwidth.",
        "Engineered strict input validation and fault-tolerant local data stores for low-resource computers.",
        "Targeted foundational STEM and language learning concepts for underserved educational environments."
      ]
    }
  ],

  skills: {
    categories: [
      {
        id: "ai-ml",
        name: "AI, ML & NLP",
        icon: "Cpu",
        skills: [
          { name: "PyTorch", level: "Core Framework", context: "Deep learning experiments & tensor pipelines" },
          { name: "Hugging Face Transformers", level: "Model Fine-tuning", context: "BERT, RoBERTa, Tokenizers & evaluation" },
          { name: "Multimodal AI & VLMs", level: "Research Domain", context: "IIT Gandhinagar research on Vision-Language Models" },
          { name: "Natural Language Processing (NLP)", level: "Specialization", context: "Text classification, tokenization, n-grams" },
          { name: "Multilingual & Code-Mixed NLP", level: "Paper Domain", context: "SheSafe-Bench cross-lingual benchmark" },
          { name: "LLM Evaluation & AI Safety", level: "Research Domain", context: "Zero-shot testing, bias detection, failure modes" },
          { name: "Data Analysis & Pattern Recognition", level: "Applied", context: "Statistical benchmarking, correlation & feature extraction" },
          { name: "Evaluation Metrics (Cohen’s κ, TF-IDF)", level: "Statistical", context: "Inter-annotator agreement & lexical baselines" }
        ]
      },
      {
        id: "languages-backend",
        name: "Languages & Backend",
        icon: "Terminal",
        skills: [
          { name: "Python", level: "Primary Language", context: "Machine learning, pipelines, data analysis, scripts" },
          { name: "SQL", level: "Database Querying", context: "Relational database queries, schema design" },
          { name: "JavaScript (ES6+)", level: "Core Language", context: "Full-stack web logic, Node.js, asynchronous flows" },
          { name: "HTML5 & CSS3", level: "Semantic Markup", context: "Responsive layouts, accessibility, styling" },
          { name: "Node.js & Express.js", level: "Backend Services", context: "RESTful APIs, routing, server architecture" },
          { name: "OpenAI API Integration", level: "API Orchestration", context: "Structured outputs, function calling, debugging" }
        ]
      },
      {
        id: "frontend-web",
        name: "Frontend & Full-Stack",
        icon: "Code2",
        skills: [
          { name: "React.js", level: "Component Framework", context: "Dynamic SPAs, hooks, state management" },
          { name: "MERN Stack", level: "Full Architecture", context: "MongoDB, Express, React, Node.js integration" },
          { name: "Bootstrap & Responsive Design", level: "UI Layouts", context: "Mobile-first grids, cross-device compatibility" },
          { name: "Streamlit", level: "Interactive UI", context: "Rapid prototyping for AI apps and chatbots" },
          { name: "Modern Glassmorphism & UI/UX", level: "Design System", context: "Dark futuristic aesthetics, micro-interactions" }
        ]
      },
      {
        id: "tools-devops",
        name: "Tools & Environments",
        icon: "Wrench",
        skills: [
          { name: "Git & GitHub", level: "Version Control", context: "Branch management, collaboration, open-source" },
          { name: "VS Code", level: "Primary IDE", context: "Extensions, debugging, modern development workflow" },
          { name: "Jupyter Notebook", level: "Interactive Analysis", context: "Model experimentation, EDA, prototyping" },
          { name: "LangChain", level: "Orchestration", context: "LLM chains, memory management, vector retrieval" }
        ]
      },
      {
        id: "research-methodology",
        name: "Research Methodologies",
        icon: "FileCheck",
        skills: [
          { name: "Dataset Curation", level: "Rigorous", context: "8,221+ comment cross-lingual dataset building" },
          { name: "Annotation Workflows", level: "Benchmarking", context: "Multi-annotator guidelines, inter-rater reliability" },
          { name: "Model Benchmarking", level: "Comparative", context: "Baseline vs closed-weight LLM performance evaluation" },
          { name: "Error & Bias Analysis", level: "Analytical", context: "Identifying systematic failure modes across linguistic contexts" }
        ]
      }
    ],
    strengths: [
      "Rigorous Analytical Problem Solving",
      "Cross-Functional Team Collaboration",
      "High Academic Consistency (9.42 Peak SPI)",
      "Deep Focus on Safe, Reliable AI Systems",
      "Effective Scientific Writing & Methodology"
    ]
  },

  education: [
    {
      institution: "Chhattisgarh Swami Vivekanand Technical University (CSVTU)",
      degree: "B.Tech in Computer Science and Engineering",
      specialization: "Artificial Intelligence and Machine Learning",
      period: "Aug 2024 – Jul 2028 (Expected)",
      location: "Durg, Chhattisgarh, India",
      status: "In Progress (Sophomore / 4 Semesters Completed)",
      averageSpi: "8.90",
      spiBreakdown: [
        { semester: "Semester 1", spi: 8.46, max: 10, status: "Completed" },
        { semester: "Semester 2", spi: 9.42, max: 10, status: "Completed (Peak Performance)" },
        { semester: "Semester 3", spi: 8.76, max: 10, status: "Completed" },
        { semester: "Semester 4", spi: 8.95, max: 10, status: "Completed" }
      ],
      highlights: [
        "Core focus on foundational computer science, data structures, algorithms, linear algebra, and machine learning theory.",
        "Consistently recognized for top-tier academic performance with a 9.42 peak SPI in Semester 2.",
        "Actively applying classroom computer science principles to peer-reviewed AI research at IIT Gandhinagar."
      ]
    },
    {
      institution: "Kendriya Vidyalaya, India",
      degree: "Higher Secondary Education (Class XII)",
      specialization: "PCMB: Physics, Chemistry, Mathematics, Biology",
      period: "Graduated 2022",
      location: "India",
      status: "Graduated",
      score: "88%",
      highlights: [
        "Strong foundation in advanced mathematics, analytical reasoning, and scientific methodology.",
        "Graduated with distinction in the rigorous national CBSE curriculum."
      ]
    }
  ],

  certifications: [
    {
      title: "Oracle AI Foundations Associate",
      issuer: "Oracle",
      year: "2025",
      type: "Artificial Intelligence",
      badgeColor: "cyan"
    },
    {
      title: "AI Skills Passport",
      issuer: "EY & Microsoft",
      year: "2025",
      type: "Enterprise AI & Cloud",
      badgeColor: "blue"
    },
    {
      title: "Data Engineering Internship Program",
      issuer: "AWS",
      year: "2025",
      type: "Cloud & Data Engineering",
      badgeColor: "purple"
    },
    {
      title: "MERN Full Stack Development",
      issuer: "Coding Spoon",
      year: "2026",
      type: "Full-Stack Web Development",
      badgeColor: "cyan"
    },
    {
      title: "Python Full Stack Internship",
      issuer: "EduSkills",
      year: "2025",
      type: "Python & Backend Systems",
      badgeColor: "blue"
    },
    {
      title: "Microsoft Office Suite",
      issuer: "Infosys Springboard",
      year: "2025",
      type: "Productivity & Documentation",
      badgeColor: "purple"
    }
  ],

  achievements: [
    {
      title: "Special Track Winner",
      organization: "Major League Hacking (MLH) & GitHub Hackathon",
      date: "April 2026",
      type: "Hackathon Award",
      icon: "Trophy",
      detail: "Recognized with a Special Track Award at the premier international MLH & GitHub hackathon for innovative software execution."
    },
    {
      title: "Open Source Contributor – OSCG’26",
      organization: "Open Source Community",
      date: "March 2026",
      type: "Open Source",
      icon: "GitPullRequest",
      detail: "Actively contributed to open-source codebases during the OSCG'26 initiative, collaborating with developer communities."
    },
    {
      title: "Hackathon Participant – IIT Bhilai",
      organization: "Indian Institute of Technology Bhilai",
      date: "March 2026",
      type: "Collegiate Hackathon",
      icon: "Code",
      detail: "Competed in high-intensity problem solving and rapid prototyping at the premier technical institute hackathon."
    },
    {
      title: "NASA Space Apps Challenge Participant",
      organization: "NASA (National Aeronautics and Space Administration)",
      date: "2025",
      type: "Global Hackathon",
      icon: "Globe",
      detail: "Participated in the world's largest annual global open-data hackathon, addressing real-world challenges with open science telemetry."
    },
    {
      title: "Smart India Hackathon (SIH) Participant",
      organization: "Ministry of Education & Govt. of India",
      date: "2025",
      type: "National Hackathon",
      icon: "Flame",
      detail: "Competed in India's flagship nation-wide innovation hackathon solving pressing institutional technology problem statements."
    }
  ],

  researchStatement: {
    quote: "My research interests lie at the intersection of machine learning, multilingual language technologies, and reliable AI evaluation. During my internship with the LINGO Research Group at IIT Gandhinagar, I worked on multimodal data annotation and quality evaluation for Vision Language Models. I am also working on SheSafe-Bench, a multilingual and code-mixed benchmark submitted to ACL Rolling Review in October 2026. This work has strengthened my interest in dataset quality, evaluation methodology, and the limitations of language models across linguistic contexts.",
    author: "Biswajeet Tarasia",
    context: "Research Statement & OIST / IIT Gn Research Trajectory"
  }
};
