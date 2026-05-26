import { SYSTEM_PROMPT, buildUserPrompt, buildRewritePrompt } from './prompts';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeProfile(profileText, industry = "Technology") {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes('your_key_here')) {
    throw new Error("Missing Gemini API Key. Please get one for free at aistudio.google.com and add it to your .env file.");
  }

  const userPrompt = buildUserPrompt(industry, profileText);
  
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_API_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: [{
        role: "user",
        parts: [{ text: userPrompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Gemini API Error: " + (errorData.error?.message || response.statusText));
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;
  
  // Clean up any potential markdown formatting
  const clean = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export async function rewriteSection(sectionName, sectionContent, industry) {
  const prompt = buildRewritePrompt(sectionName, sectionContent, industry);

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_API_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Gemini API Error: " + (errorData.error?.message || response.statusText));
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;
  return rawText.trim();
}
