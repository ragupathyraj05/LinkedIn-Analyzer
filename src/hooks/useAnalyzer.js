import { useState } from 'react';
import { analyzeProfile, rewriteSection } from '@/lib/mockClient';
import toast from 'react-hot-toast';

export function useAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const runAnalysis = async (profileText, industry) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      setStatusMessage('Reading your profile...');
      await new Promise(r => setTimeout(r, 800)); // UI delay for feel

      setStatusMessage('Scoring each section...');
      await new Promise(r => setTimeout(r, 800));

      setStatusMessage('Consulting Claude AI...');
      const result = await analyzeProfile(profileText, industry);

      setStatusMessage('Generating recommendations...');
      await new Promise(r => setTimeout(r, 500));

      setAnalysis(result);
      return result;
    } catch (error) {
      toast.error(error.message || 'Failed to analyze profile.');
      throw error;
    } finally {
      setIsAnalyzing(false);
      setStatusMessage('');
    }
  };

  const optimizeSection = async (sectionName, sectionContent, industry) => {
    try {
      toast.loading(`Optimizing ${sectionName}...`, { id: `opt-${sectionName}` });
      const rewrite = await rewriteSection(sectionName, sectionContent, industry);
      
      // Update the local analysis state to include this rewrite if not already there
      setAnalysis(prev => {
         if (!prev) return prev;
         const updated = { ...prev };
         if (updated.section_scores[sectionName.toLowerCase()]) {
           updated.section_scores[sectionName.toLowerCase()].rewrite = rewrite;
         }
         return updated;
      });
      
      toast.success(`${sectionName} optimized!`, { id: `opt-${sectionName}` });
      return rewrite;
    } catch (error) {
      toast.error(`Failed to optimize ${sectionName}`, { id: `opt-${sectionName}` });
      throw error;
    }
  };

  return {
    isAnalyzing,
    analysis,
    statusMessage,
    runAnalysis,
    optimizeSection
  };
}
