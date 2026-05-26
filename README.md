# 🚀 LinkedIn Profile Analyzer

A premium, AI-powered web application that analyzes your LinkedIn profile (via text or PDF export) and provides recruiter-grade scoring, section-by-section optimization, ATS keyword gap analysis, and tailored recommendations to help you land more interviews.

Powered by advanced LLMs (Claude Sonnet / Gemini Flash) and built with a modern React + Vite + Tailwind CSS stack.

---

## ✨ Features

- **📊 Comprehensive Scoring**: Get an overall profile rating (0.0 to 5.0), completeness percentage, and targeted scores for key sections (Headline, About, Experience, Skills, Education, etc.).
- **🤖 Multi-Model AI Analysis**: Integrates with:
  - **Google Gemini** (`gemini-1.5-flash-latest`) for fast, structured JSON insights.
  - **Anthropic Claude** (`claude-sonnet-4-20250514`) for surgical, high-fidelity recruiter analysis.
  - **Offline Sandbox Mode**: Fully featured mockup client to test the entire application interface instantly without requiring API keys.
- **📄 PDF Export & Import**: Drop your exported LinkedIn profile PDF directly to extract content using `pdfjs-dist`, and export your finalized analysis report back to PDF.
- **🎯 Industry-Specific Advice**: Customize insights based on target industries (Technology, Finance, Healthcare, Marketing, etc.).
- **✍️ One-Click Section Optimization**: View AI-generated rewrites for specific profile sections and optimize them on-the-fly to emphasize achievements and active voice.
- **🔍 ATS Keyword Checker**: Scans your text against typical industry keywords to identify missing terminology and boost searchability.
- **🎭 Tone Analysis**: Breakdown of active vs. passive voice percentage alongside a professional tone alignment score.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) + [Tailwind CSS v4](https://tailwindcss.com/)
- **State & Transitions**: [Framer Motion](https://www.framer.com/motion/) + [Lucide React Icons](https://lucide.dev/)
- **PDF Extraction**: [pdfjs-dist](https://github.com/mozilla/pdf.js)
- **PDF Exporting**: [jspdf](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ragupathyraj05/LinkedIn-Analyzer.git
cd linkedin-analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
# Add either or both API keys to enable live AI analysis
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
