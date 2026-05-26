import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ToneAnalysis({ toneData }) {
  if (!toneData) return null;

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageCircle className="h-5 w-5 text-primary" />
          Voice & Tone Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Active vs Passive Donut Chart representation built with CSS */}
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24 flex-shrink-0">
            {/* SVG Donut */}
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
              <circle
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke="var(--color-warning)"
                strokeWidth="20"
              />
              <circle
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke="var(--color-primary)"
                strokeWidth="20"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * toneData.active_voice_percent) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-medium text-text-primary">
                <span className="h-3 w-3 rounded-sm bg-primary border border-primary-dark"></span>
                Active Voice
              </span>
              <span className="font-bold">{toneData.active_voice_percent}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-medium text-text-primary">
                <span className="h-3 w-3 rounded-sm bg-warning border border-orange-600"></span>
                Passive Voice
              </span>
              <span className="font-bold">{toneData.passive_voice_percent}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t border-border pt-4">
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Professional Tone</span>
            <span className="font-bold text-text-primary">{toneData.professional_tone_score.toFixed(1)}/5.0</span>
          </div>
          <Progress 
            value={(toneData.professional_tone_score / 5) * 100} 
            indicatorColor={toneData.professional_tone_score > 3.5 ? 'bg-success' : 'bg-warning'} 
          />
        </div>

        <div className="rounded-lg bg-gray-50 p-4 border border-border">
          <p className="text-sm text-text-primary leading-relaxed italic">
            "{toneData.tone_feedback}"
          </p>
        </div>

      </CardContent>
    </Card>
  );
}
