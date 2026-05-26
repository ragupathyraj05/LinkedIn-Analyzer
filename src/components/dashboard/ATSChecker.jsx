import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ATSChecker({ initialKeywords = { present: [], missing: [], ats_score: 0 } }) {
  const [jobDescription, setJobDescription] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState(initialKeywords);

  const handleCheck = () => {
    if (!jobDescription.trim()) return;
    setIsChecking(true);
    
    // In a full implementation, this could call Claude again to do a real match.
    // However, the spec didn't outline a specific new API route for this besides the initial run.
    // For this boilerplate, we simulate an API call check or just show the initial data.
    setTimeout(() => {
      setIsChecking(false);
      // We will just keep the initial keywords since this is a UI layer spec
      setResults(initialKeywords);
    }, 1500);
  };

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Search className="h-5 w-5 text-primary" />
          ATS Keyword Checker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {results?.present?.length > 0 || results?.missing?.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
               <div>
                 <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">ATS Match Score</h4>
                 <div className="flex items-center gap-2">
                   <div className="text-2xl font-bold font-display text-text-primary">{results.ats_score.toFixed(1)}<span className="text-sm text-text-secondary">/5.0</span></div>
                 </div>
               </div>
               <div className="h-12 w-12 rounded-full border-4 border-primary/20 flex items-center justify-center">
                 <span className="font-bold text-primary">{Math.round((results.ats_score / 5) * 100)}%</span>
               </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold flex items-center gap-1.5 text-success mb-3">
                <CheckCircle2 className="h-4 w-4" /> Present Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {results.present.length > 0 ? results.present.map((kw, i) => (
                  <span key={i} className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success border border-success/20">
                    {kw}
                  </span>
                )) : <span className="text-sm text-text-secondary italic">None detected</span>}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold flex items-center gap-1.5 text-danger mb-3">
                <XCircle className="h-4 w-4" /> Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {results.missing.length > 0 ? results.missing.map((kw, i) => (
                  <span key={i} className="inline-flex items-center rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-semibold text-danger border border-danger/20">
                    {kw}
                  </span>
                )) : <span className="text-sm text-text-secondary italic">None missing</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
             <div className="mb-4 text-text-secondary">
               No ATS keyword data available for this profile.
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
