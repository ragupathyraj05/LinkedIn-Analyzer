import React from 'react';
import { Briefcase } from 'lucide-react';

const INDUSTRIES = [
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Design",
  "Sales",
  "HR",
  "Legal",
  "Engineering",
  "Product Management",
  "Data Science"
];

export default function IndustrySelector({ value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor="industry" className="mb-2 block text-sm font-medium text-text-primary flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary" /> Target Industry
      </label>
      <div className="relative">
        <select
          id="industry"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-border bg-surface px-4 py-3 pr-10 text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
        >
          <option value="" disabled>Select your industry</option>
          {INDUSTRIES.map((ind) => (
             <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
