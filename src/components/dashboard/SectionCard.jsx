import React, { useState } from 'react';
import { Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BeforeAfter from './BeforeAfter';
import { getScoreLevel, getScoreLabel } from '@/lib/scoreUtils';

export default function SectionCard({ title, icon: Icon, data, originalText }) {
  const [copied, setCopied] = useState(false);
  
  if (!data) return null;
  
  const scoreLevel = getScoreLevel(data.score);
  const badgeColors = {
    poor: 'destructive',
    average: 'warning',
    excellent: 'success'
  };

  const handleCopy = () => {
    if (data.rewrite) {
      navigator.clipboard.writeText(data.rewrite);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="mb-4 overflow-hidden shadow-sm hover:shadow transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row border-b border-border">
          {/* Header & Feedback */}
          <div className="p-6 md:w-1/2 lg:w-2/5 md:border-r border-border bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-surface border border-border text-primary shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg text-text-primary capitalize">{title}</h3>
              </div>
              <Badge variant={badgeColors[scoreLevel]}>
                {data.score}/5.0
              </Badge>
            </div>
            
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Feedback</h4>
              <p className="text-sm text-text-primary leading-relaxed">{data.feedback}</p>
            </div>
            
            {data.rewrite && (
              <div className="mt-6 flex items-center justify-between">
                 <div className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                   <Sparkles className="h-3.5 w-3.5" />
                   AI Optimized
                 </div>
                 
                 <button 
                   onClick={handleCopy}
                   className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
                 >
                   {copied ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                   {copied ? 'Copied!' : 'Copy Rewrite'}
                 </button>
              </div>
            )}
          </div>
          
          {/* Rewrite Preview */}
          <div className="p-6 md:w-1/2 lg:w-3/5">
            {data.rewrite ? (
              <BeforeAfter 
                original={originalText || 'No original content provided.'} 
                rewrite={data.rewrite} 
              />
            ) : (
              <div className="h-full flex items-center justify-center text-text-secondary text-sm italic py-8">
                No optimization needed or provided.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
