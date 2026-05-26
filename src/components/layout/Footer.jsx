import React from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Linkedin className="h-5 w-5 text-primary" />
          <span className="font-semibold text-text-primary">ProfileOptimizer</span>
          <span className="text-sm text-text-secondary ml-2">© {new Date().getFullYear()}</span>
        </div>
        
        <p className="text-sm text-text-secondary text-center max-w-sm">
          Built to help professionals land their dream roles with AI-powered LinkedIn optimization.
        </p>

        <div className="flex items-center gap-4 text-text-secondary">
          <a href="#" className="hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
