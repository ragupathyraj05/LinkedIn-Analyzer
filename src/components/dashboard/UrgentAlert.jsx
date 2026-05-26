import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function UrgentAlert({ issues }) {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="mb-8 w-full">
      <Alert variant="destructive" className="border-red-500 bg-red-50 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-800 font-semibold text-lg ml-2">
          ⚠️ Urgent: Your Profile Needs Immediate Attention
        </AlertTitle>
        <AlertDescription className="ml-2 mt-2">
          <ul className="list-disc pl-5 mt-2 space-y-1 text-red-700">
            {issues.map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
          <button 
            onClick={() => document.getElementById('section-recommendations')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 flex items-center font-semibold text-red-800 hover:text-red-600 hover:underline transition-all"
          >
            Fix These First <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
