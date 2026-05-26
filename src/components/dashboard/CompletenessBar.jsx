import React from 'react';
import { Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function CompletenessBar({ percent = 0 }) {
  // Determine color based on completion
  const getColor = (p) => {
    if (p < 50) return 'bg-danger';
    if (p < 80) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-primary" />
          Profile Completeness
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Overall Completion</span>
          <span className="text-2xl font-bold font-display text-text-primary">{percent}%</span>
        </div>
        <Progress 
          value={percent} 
          indicatorColor={getColor(percent)} 
          className="h-3"
        />
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {percent >= 100 
            ? "Outstanding! Your profile is fully complete." 
            : "Complete profiles get 21x more views and 36x more messages from recruiters. Keep going!"}
        </p>
      </CardContent>
    </Card>
  );
}
