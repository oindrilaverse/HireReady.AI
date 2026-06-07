# HireReady.AI — AI-Powered ATS Resume Analyzer & Job Matcher

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=flat-square&logo=vercel&logoColor=white)](https://hire-ready-ai-v2.vercel.app/)
[![Next.js Version](https://img.shields.io/badge/Next.js-v16.2-blue?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

HireReady.AI is a high-performance Software-as-a-Service (SaaS) application designed to optimize candidate resumes for Applicant Tracking Systems (ATS) and bridge the gap between job seekers and top-tier tech companies. Leveraging advanced Large Language Models (LLMs) and vector embedding search, the platform evaluates resumes against recruiter-grade ATS algorithms, identifies key skill gaps, and dynamically highlights job description compatibility in under 60 seconds.

---

## 🔗 Live Deployments

* **Frontend Web Application (Vercel)**: [https://hire-ready-ai-v2.vercel.app/](https://hire-ready-ai-v2.vercel.app/)
* **Production API Server**: [https://api.hireready.ai/api/health](https://api.hireready.ai/api/health) (Placeholder/Fallback active)

---

## 🚀 What It Does

In the modern job market, over 75% of resumes are filtered out by automated Applicant Tracking Systems before reaching a human recruiter. HireReady.AI acts as a personal career auditor by:
1. **Parsing Resumes**: Instantly reading PDFs, DOCX, and TXT files, extracting raw textual contents via native parsers and fallback generative AI vision extraction.
2. **AI scoring**: Evaluating technical competencies, keyword density, formatting consistency, experience impact, and verb strength to generate an overall ATS match rating (0-100).
3. **Keyword Gap Detection**: Scanning top tech job descriptions to pinpoint missing industry keywords, frameworks, and tools.
4. **Semantic Job Matching**: Using vector embeddings to run real-time cosine similarity search, matching the user's resume against a live database of mock positions (Vercel, Stripe, Netflix, Spotify) to recommend jobs.

---

## 🛠️ Technical Architecture & Stack

### Frontend Architecture (Client)
* **Framework**: Next.js 16.2 (App Router with Turbopack packaging)
* **Styling**: Tailwind CSS 4.0, featuring glassmorphism micro-interaction UI, CSS-hardware accelerated keyframe glow animations, and Outfit & Space Grotesk Google typography.
* **State Management**: Zustand (persisted state middleware for local cache hydration).
* **Animations**: Framer Motion (buttery-smooth, hardware-accelerated layouts).
* **Performance**: Lightweight IntersectionObserver on cinematic landing background video to suspend rendering when off-screen; Page visibility listener to halt requestAnimationFrame canvas drawing loop when tab is hidden or minimized.

### Backend Infrastructure (API Server)
* **Runtime**: Node.js & Express (TypeScript compilation watch loop).
* **AI Engine**: Google Gemini 2.0 Flash (`gemini-2.0-flash` for high-speed textual scanning, `text-embedding-004` for semantic vector calculations).
* **Database & Auth**: Supabase (PostgreSQL engine for data schemas, Row-Level Security, and Supabase GoTrue Auth JWT).
* **File Upload**: Multer (in-memory buffer parsing).

---

## ✨ Features

* **SaaS Tier-Gating & Usage Limits**: Secure middleware tracking user scan quotas. Free tier is gated to a maximum of 3 monthly scans with automated, non-intrusive database increment triggers.
* **Advanced Resume Parsing & Fallbacks**: Utilizes native binary buffer parser. In case of image-only or encrypted PDFs, the server auto-falls back to a Gemini multimodality parsing pipeline to extract text.
* **Vector Semantic Search**: Instead of simple substring matching, the platform embeds the resume text and performs cosine similarity matching against target roles.
* **Interactive Data Visualization**: Rendered historical score progressions over time utilizing a fully client-side responsive charting grid (Recharts).
* **Netflix-Grade Performance Tuning**: Scroll lag minimized to 0ms. Hardware-accelerated fixed container transforms ensure mobile viewports glide seamlessly.

---

## 📸 Screenshots

### 1. Landing Page (Cinematic Pink Energy Backdrop)
*`[Screenshot Placeholder: Landing Page with Cinematic Video Background]`*

### 2. Candidate Dashboard & Performance Analytics
*`[Screenshot Placeholder: Dashboard with Score Progression Chart and Recent Scan History]`*

### 3. AI Scan Report & Actionable Recommendations
*`[Screenshot Placeholder: ATS Score Target, Missing Keywords, and Structural Suggestions]`*

---

## 💻 Local Setup Instructions

Follow these steps to run both the frontend and backend servers locally.

### Prerequisites
* [Node.js](https://nodejs.org/) v18.0 or higher
* [NPM](https://www.npmjs.com/) v9.0 or higher
* Git

### 1. Clone the Repository
```bash
git clone https://github.com/oindrilaverse/HireReady.ai-V2.git
cd HireReady.ai-V2
```

### 2. Configure Environment Variables

Create a `.env.local` file in the **root** folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

Create a `.env` file in the **`backend`** folder:
```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

### 3. Install Dependencies

Install root dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

### 4. Run the Servers

Start the backend API server (runs on port 5000):
```bash
cd backend
npm run dev
```

In a new terminal window, start the frontend Next.js dev server (runs on port 3000):
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
