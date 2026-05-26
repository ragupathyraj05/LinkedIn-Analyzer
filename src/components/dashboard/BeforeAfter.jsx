import React, { useState } from 'react';

export default function BeforeAfter({ original, rewrite }) {
  const [view, setView] = useState('after'); // 'before' | 'after'

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
          Content comparison
        </h4>
        <div className="bg-surface border border-border rounded-lg p-0.5 inline-flex text-xs font-medium">
          <button
            onClick={() => setView('before')}
            className={`px-3 py-1 rounded-md transition-all ${view === 'before' ? 'bg-gray-100 text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
          >
            Original
          </button>
          <button
            onClick={() => setView('after')}
            className={`px-3 py-1 rounded-md transition-all ${view === 'after' ? 'bg-primary/10 text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
          >
            Optimized
          </button>
        </div>
      </div>
      
      <div className={`flex-1 rounded-xl p-4 text-sm leading-relaxed border transition-colors overflow-y-auto max-h-[250px] custom-scrollbar ${view === 'after' ? 'bg-primary/5 border-primary/20 text-primary-dark' : 'bg-surface border-border text-text-secondary line-through opacity-70'}`}>
        <div className="whitespace-pre-wrap">
          {view === 'after' ? rewrite : original}
        </div>
      </div>
    </div>
  );
}
