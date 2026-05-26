import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import ProfileInput from '@/components/upload/ProfileInput';
import IndustrySelector from '@/components/upload/IndustrySelector';
import { useAnalyzer } from '@/hooks/useAnalyzer';
import { sampleProfiles } from '@/lib/sampleProfiles';

export default function HomePage() {
  const navigate = useNavigate();
  const { isAnalyzing, statusMessage, runAnalysis } = useAnalyzer();
  const [profileText, setProfileText] = useState('');
  const [industry, setIndustry] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!profileText.trim()) {
      setError('Please provide your LinkedIn profile text or PDF.');
      return;
    }
    if (!industry) {
      setError('Please select a target industry.');
      return;
    }
    setError('');

    try {
      const results = await runAnalysis(profileText, industry);
      navigate('/results', { state: { analysis: results, profileText, industry } });
    } catch (err) {
      console.error(err);
      // Toast already handled in hook
    }
  };

  const loadDemo = (type) => {
    setProfileText(sampleProfiles[type]);
    setIndustry('Technology');
    toast.success(`Loaded ${type} demo profile`);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
          <Sparkles className="h-4 w-4" /> Powered by Claude AI
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary tracking-tight mb-6">
          Get Your LinkedIn Score in <span className="text-primary italic">30 Seconds</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Paste your profile or drop your PDF export. Our AI recruiter analyzes your experience, headline, and skills to help you land more interviews.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="w-full max-w-2xl bg-surface rounded-2xl border border-border shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 relative">
        
        {/* Loading Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-50 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center p-8">
             <div className="h-16 w-16 mb-6 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
             <h3 className="text-2xl font-display font-bold text-primary mb-2">Analyzing Profile</h3>
             <motion.p 
               key={statusMessage}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="text-lg text-text-secondary"
             >
               {statusMessage}
             </motion.p>
          </div>
        )}

        <div className="p-6 md:p-8 space-y-8">
          
          <IndustrySelector value={industry} onChange={setIndustry} />

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">Profile Content</label>
            <ProfileInput 
              value={profileText} 
              onChange={setProfileText} 
              onError={setError}
            />
          </div>

          {error && (
            <div className="text-danger flex items-center gap-2 text-sm font-medium bg-danger/10 p-3 rounded-lg border border-danger/20">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full h-14 text-lg font-bold shadow-md hover:shadow-lg transition-all rounded-xl relative overflow-hidden group border-b-4 border-primary-dark active:border-b-0 active:translate-y-[4px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Analyze My Profile <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

        </div>
        
        {/* Demo Section Footer */}
        <div className="bg-gray-50 border-t border-border p-6 flex flex-col items-center">
          <p className="text-sm text-text-secondary font-medium mb-3">Or try a sample profile:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" onClick={() => loadDemo('poor')}>
              Poor Profile (~1.5)
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadDemo('average')}>
              Average Profile (~3.0)
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadDemo('strong')} className="bg-primary/5 border-primary/30 text-primary hover:bg-primary/10">
              Strong Profile (~4.5)
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
