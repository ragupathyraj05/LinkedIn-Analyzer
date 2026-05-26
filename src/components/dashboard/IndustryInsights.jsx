import React from 'react';
import { Lightbulb, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function IndustryInsights({ industry, insights = [] }) {
  if (!insights || insights.length === 0) return null;

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="h-5 w-5 text-primary" />
            Industry Insights
          </CardTitle>
          {industry && (
            <Badge variant="secondary" className="font-medium bg-primary/10 text-primary border-primary/20">
              {industry}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex relative items-start gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex mt-0.5 h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-dark">
                <Lightbulb className="h-4 w-4 text-warning" />
              </div>
              <p className="text-sm text-text-primary leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
