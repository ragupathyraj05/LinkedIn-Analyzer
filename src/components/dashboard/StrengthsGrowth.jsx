import React from 'react';
import { TrendingUp, Award, CheckCircle2, ArrowRightCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function StrengthsGrowth({ strengths = [], growth_tips = [] }) {
  if (!strengths.length && !growth_tips.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      
      {/* Strengths Column */}
      <Card className="border-success/20 bg-success/5 shadow-sm">
        <CardContent className="p-6">
           <div className="flex items-center gap-2 mb-4 text-success border-b border-success/20 pb-3">
             <Award className="h-6 w-6" />
             <h3 className="font-display font-semibold text-lg text-green-800">Your Strengths</h3>
           </div>
           <ul className="space-y-3">
             {strengths.map((s, i) => (
               <li key={i} className="flex items-start gap-2.5">
                 <CheckCircle2 className="h-5 w-5 shrink-0 text-success mt-0.5" />
                 <span className="text-sm text-green-900 leading-relaxed">{s}</span>
               </li>
             ))}
           </ul>
        </CardContent>
      </Card>

      {/* Growth Opportunities Column */}
      <Card className="border-primary/20 bg-primary/5 shadow-sm">
        <CardContent className="p-6">
           <div className="flex items-center gap-2 mb-4 text-primary border-b border-primary/20 pb-3">
             <TrendingUp className="h-6 w-6" />
             <h3 className="font-display font-semibold text-lg text-primary-dark">Growth Opportunities</h3>
           </div>
           <ul className="space-y-3">
             {growth_tips.map((tip, i) => (
               <li key={i} className="flex items-start gap-2.5">
                 <ArrowRightCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                 <span className="text-sm text-primary-dark leading-relaxed">{tip}</span>
               </li>
             ))}
           </ul>
        </CardContent>
      </Card>

    </div>
  );
}
