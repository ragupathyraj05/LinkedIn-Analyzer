import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

import ScoreGauge from '@/components/dashboard/ScoreGauge';
import UrgentAlert from '@/components/dashboard/UrgentAlert';
import CompletenessBar from '@/components/dashboard/CompletenessBar';
import SectionCard from '@/components/dashboard/SectionCard';
import ATSChecker from '@/components/dashboard/ATSChecker';
import ToneAnalysis from '@/components/dashboard/ToneAnalysis';
import IndustryInsights from '@/components/dashboard/IndustryInsights';
import StrengthsGrowth from '@/components/dashboard/StrengthsGrowth';
import ExportReport from '@/components/export/ExportReport';
import { Button } from '@/components/ui/button';

import { User, Briefcase, GraduationCap, Wrench, ThumbsUp, FileBadge, AlignLeft } from 'lucide-react';

const sectionIcons = {
  headline: AlignLeft,
  about: User,
  experience: Briefcase,
  education: GraduationCap,
  skills: Wrench,
  recommendations: ThumbsUp,
  certifications: FileBadge
};

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  
  const { analysis: initialAnalysis, profileText, industry } = location.state || {};

  useEffect(() => {
    if (!initialAnalysis) {
      navigate('/');
      return;
    }
    setAnalysis(initialAnalysis);
    
    // Confetti if score > 4.0
    if (initialAnalysis.overall_score >= 4.0) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0A66C2', '#F5A623', '#057642']
        });
      }, 500);
    }
  }, [initialAnalysis, navigate]);

  if (!analysis) return null;

  return (
    <div className="bg-bg min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-text-secondary hover:text-text-primary self-start sm:self-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Analyze Another Profile
          </Button>
          <ExportReport elementId="dashboard-results" />
        </div>

        {/* Dashboard Container (Print Target) */}
        <div id="dashboard-results" className="space-y-8 bg-surface sm:bg-transparent sm:p-0 rounded-xl">
          
          {/* Urgent Alert */}
          {analysis.overall_score < 2.0 && (
            <UrgentAlert issues={analysis.critical_issues} />
          )}

          {/* Top Row: Score & Completeness */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Score Card */}
            <div className="lg:col-span-1 bg-surface rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center justify-center">
               <h2 className="text-lg font-semibold text-text-secondary mb-4 uppercase tracking-wider">Overall Quality</h2>
               <ScoreGauge score={analysis.overall_score} />
            </div>

            {/* Quick Wins & Completeness */}
            <div className="lg:col-span-2 space-y-6">
              <CompletenessBar percent={analysis.completeness_percent} />
              
              <div className="bg-surface rounded-2xl border border-border shadow-sm p-6">
                 <h3 className="font-display font-semibold text-xl text-primary-dark mb-4 border-b border-border pb-2">Quick Wins 🚀</h3>
                 <ul className="space-y-3">
                   {analysis.quick_wins.map((win, idx) => (
                     <li key={idx} className="flex gap-3 items-start">
                       <span className="flex mt-1 h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                         {idx + 1}
                       </span>
                       <span className="text-text-primary leading-relaxed">{win}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

          </div>

          {/* Strengths & Growth */}
          <StrengthsGrowth strengths={analysis.strengths} growth_tips={analysis.growth_tips} />

          {/* Secondary Metrics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ATSChecker initialKeywords={analysis.ats_keywords} />
            <ToneAnalysis toneData={analysis.tone_analysis} />
          </div>

          <IndustryInsights industry={industry} insights={analysis.industry_insights} />

          {/* Detailed Section Breakthroughs */}
          <div id="section-recommendations" className="pt-8">
            <h2 className="font-display text-3xl font-bold text-text-primary mb-6">Section Breakdown & Rewrites</h2>
            
            {Object.entries(analysis.section_scores).map(([key, data]) => {
              const Icon = sectionIcons[key] || AlignLeft;
              return (
                <SectionCard 
                  key={key}
                  title={key}
                  icon={Icon}
                  data={data}
                  originalText={profileText} // In a real app we'd parse the sections out, but for UI spec we just pass full/mock.
                />
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
