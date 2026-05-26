// Completely Offline Mock Client
// Returns realistic simulated data without needing any API keys.

export async function analyzeProfile(profileText, industry = "Technology") {
  // Simulate network delay to make the UI feel real
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Basic "analysis" based on length just for fun
  const length = profileText.length;
  let score = 3.5;
  if (length < 500) score = 1.8;
  else if (length > 2000) score = 4.8;
  else score = 3.5;

  return {
    overall_score: score,
    summary: "This is a simulated analysis for your " + industry + " profile. Your profile shows good potential but needs optimization to stand out to recruiters.",
    completeness_percent: score < 2 ? 40 : score > 4 ? 95 : 70,
    section_scores: {
      headline: { 
        score: score < 2 ? 1.5 : 4.0, 
        feedback: "Your headline should be more precise and include key industry terminology.", 
        rewrite: "Senior " + industry + " Professional | Proven Track Record | Scalable Solutions"
      },
      about: { 
        score: score < 2 ? 2.0 : 4.5, 
        feedback: "The about section is a bit dry. Add more personal narrative and specific achievements.", 
        rewrite: "Passionate " + industry + " expert with a deep focus on driving value and leading cross-functional teams to build innovative products."
      },
      experience: { 
        score: Math.min(score + 0.5, 5), 
        feedback: "Quantify your achievements! Use numbers (%, $, time saved) instead of just listing duties.", 
        rewrite: "- Increased revenue by 25% by implementing robust new workflows.\n- Led a team of 5 to successfully deliver the project 2 weeks ahead of schedule." 
      },
      education: { 
        score: 5.0, 
        feedback: "Education is perfectly formatted.", 
        rewrite: "" 
      },
      skills: { 
        score: 3.5, 
        feedback: "You are missing some critical ATS keywords. Ensure you align your skills with your target job descriptions.", 
        rewrite: industry + " Strategy, Project Management, Data Analysis, Leadership"
      },
      recommendations: { 
        score: 2.0, 
        feedback: "Try to request at least 2 more recent recommendations from colleagues or managers.", 
        rewrite: "" 
      },
      certifications: { 
        score: 4.0, 
        feedback: "Great job listing relevant certifications.", 
        rewrite: "" 
      }
    },
    critical_issues: score < 2 ? [
      "Missing a clear value proposition in the headline.",
      "Experience section lacks quantitative metrics.",
      "Profile photo or background banner is not optimized."
    ] : [],
    quick_wins: [
      "Add 3 more industry-specific skills.",
      "Rewrite your summary to be in the first-person.",
      "Customize your LinkedIn public URL."
    ],
    tone_analysis: {
      active_voice_percent: 65,
      passive_voice_percent: 35,
      professional_tone_score: 4.2,
      tone_feedback: "Your tone is generally professional, but reducing passive voice will make you sound more confident and action-oriented."
    },
    ats_keywords: {
      present: ["Leadership", "Management", industry, "Strategy"],
      missing: ["Agile", "Cross-functional", "Data-driven", "ROI"],
      ats_score: 3.2
    },
    industry_insights: [
      "Recruiters in " + industry + " look heavily for quantifiable impacts in your bullet points.",
      "Highlight modern tools and software specific to your niche.",
      "Engage with top voices in your sector to increase profile visibility."
    ],
    strengths: [
      "Clear formatting and readable structure.",
      "Good progression of roles over your career."
    ],
    growth_tips: [
      "Inject more personality into your 'About' section.",
      "Ensure all listed roles have at least 3 bullet points."
    ]
  };
}

export async function rewriteSection(sectionName, sectionContent, industry) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return "[Simulated AI Rewrite for " + sectionName + "]\n\nAs a " + industry + " professional, my focus is on delivering exceptional results.\n• Streamlined operations improving efficiency by 20%.\n• Developed strategic initiatives that drove user engagement.\n\n(This is an offline mockup since no API key is being used!)";
}
