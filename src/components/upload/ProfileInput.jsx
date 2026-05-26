import React, { useState } from 'react';
import { Type, FileUp } from 'lucide-react';
import PDFParser from './PDFParser';

export default function ProfileInput({ value, onChange, onError }) {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'pdf'

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full max-w-sm overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === 'text' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-text-primary'}`}
        >
          <div className="flex items-center justify-center gap-2">
            <Type className="h-4 w-4" />
            Paste Text
          </div>
        </button>
        <button
          onClick={() => setActiveTab('pdf')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === 'pdf' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-text-primary'}`}
        >
          <div className="flex items-center justify-center gap-2">
            <FileUp className="h-4 w-4" />
            Upload PDF
          </div>
        </button>
      </div>

      <div className="w-full transition-all duration-300">
        {activeTab === 'text' ? (
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste in your entire LinkedIn profile text (Ctrl+A, Ctrl+C on your profile page)..."
              className="min-h-[250px] w-full resize-y rounded-xl border border-border bg-surface p-4 text-sm text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
            />
          </div>
        ) : (
          <PDFParser 
            onTextExtracted={(text) => {
              onChange(text);
              onError('');
            }}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
}
