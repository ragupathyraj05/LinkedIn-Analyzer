import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import ScoreGauge from '@/components/dashboard/ScoreGauge';
import { getScoreLabel } from '@/lib/scoreUtils';

export default function ReportPage() {
  const location = useLocation();
  const { analysis, industry } = location.state || {};

  if (!analysis) {
    return <Navigate to="/" replace />;
  }

  // Print-optimized simple view
  return (
    <div className="bg-white min-h-screen text-black p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b-2 border-primary pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark">LinkedIn Profile Analysis</h1>
            <p className="text-gray-600 mt-2">Target Industry: {industry}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            <p className="font-semibold text-primary">ProfileOptimizer</p>
          </div>
        </header>

        <section className="flex items-center justify-between bg-gray-50 p-6 rounded-xl border border-gray-200">
           <div>
             <h2 className="text-xl font-bold mb-2">Overall Score: {analysis.overall_score}/5.0</h2>
             <p className="font-medium text-lg">Rating: {getScoreLabel(analysis.overall_score)}</p>
             <p className="mt-2 text-gray-700">{analysis.summary}</p>
           </div>
        </section>

        {analysis.critical_issues && analysis.critical_issues.length > 0 && (
          <section className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h2 className="text-xl font-bold text-red-800 mb-4">Critical Issues to Fix</h2>
            <ul className="list-disc pl-5 space-y-2 text-red-900">
              {analysis.critical_issues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold border-b pb-2 mb-6">Quick Wins</h2>
          <ul className="list-decimal pl-5 space-y-3">
             {analysis.quick_wins.map((win, i) => <li key={i} className="text-gray-800">{win}</li>)}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold border-b pb-2 mb-6">Section Breakdown & Recommendations</h2>
          {Object.entries(analysis.section_scores).map(([section, data]) => (
            <div key={section} className="mb-8 break-inside-avoid">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold capitalize text-primary">{section}</h3>
                <span className="font-bold bg-gray-100 px-3 py-1 rounded">Score: {data.score}/5.0</span>
              </div>
              <p className="text-gray-700 italic mb-4">{data.feedback}</p>
              {data.rewrite && (
                <div className="bg-blue-50/50 p-4 border-l-4 border-primary rounded-r">
                   <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">AI Optimized Rewrite</p>
                   <p className="text-gray-900 whitespace-pre-wrap">{data.rewrite}</p>
                </div>
              )}
            </div>
          ))}
        </section>

        <footer className="pt-10 border-t text-center text-sm text-gray-500">
           Generated securely by ProfileOptimizer — Do not share without permission.
        </footer>
      </div>
    </div>
  );
}
