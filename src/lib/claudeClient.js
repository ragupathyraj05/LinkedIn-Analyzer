const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export async function analyzeProfile(profileText, industry = "Technology") {
  const systemPrompt = `You are a world-class LinkedIn profile coach, recruiter, and personal branding expert with 15+ years of experience helping professionals land top roles at FAANG, Fortune 500, and high-growth startups. 

You analyze LinkedIn profiles with surgical precision and return ONLY a valid JSON object — no markdown, no backticks, no explanation outside the JSON.

Your JSON must follow this exact structure:
{
  "overall_score": <number 0.0–5.0 with one decimal>,
  "summary": "<2-sentence overall assessment>",
  "completeness_percent": <integer 0–100>,
  "section_scores": {
    "headline": { "score": <0.0–5.0>, "feedback": "<string>", "rewrite": "<improved version>" },
    "about": { "score": <0.0–5.0>, "feedback": "<string>", "rewrite": "<improved version>" },
    "experience": { "score": <0.0–5.0>, "feedback": "<string>", "rewrite": "<improved version>" },
    "education": { "score": <0.0–5.0>, "feedback": "<string>", "rewrite": "<improved version>" },
    "skills": { "score": <0.0–5.0>, "feedback": "<string>", "rewrite": "<improved version>" },
    "recommendations": { "score": <0.0–5.0>, "feedback": "<string>", "rewrite": "<string>" },
    "certifications": { "score": <0.0–5.0>, "feedback": "<string>", "rewrite": "<string>" }
  },
  "critical_issues": <array of strings — ONLY populate if overall_score < 2.0, otherwise empty array>,
  "quick_wins": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"],
  "tone_analysis": {
    "active_voice_percent": <integer 0–100>,
    "passive_voice_percent": <integer 0–100>,
    "professional_tone_score": <0.0–5.0>,
    "tone_feedback": "<string>"
  },
  "ats_keywords": {
    "present": ["<keyword>"],
    "missing": ["<keyword>"],
    "ats_score": <0.0–5.0>
  },
  "industry_insights": ["<tip 1>", "<tip 2>", "<tip 3>"],
  "strengths": ["<strength 1>", "<strength 2>"],
  "growth_tips": ["<tip 1>", "<tip 2>", "<tip 3>"]
}`;

  const userPrompt = `Industry Target: ${industry}

LinkedIn Profile to Analyze:
---
${profileText}
---

Analyze this profile thoroughly and return the JSON object.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Anthropic API Error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const rawText = data.content[0].text;
  const clean = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export async function rewriteSection(sectionName, sectionContent, industry) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are an expert LinkedIn coach. Rewrite this ${sectionName} section for a ${industry} professional. Make it compelling, keyword-rich, achievement-focused, and recruiter-friendly. Return ONLY the rewritten text, nothing else.\n\nOriginal:\n${sectionContent}`
      }]
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Anthropic API Error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}
