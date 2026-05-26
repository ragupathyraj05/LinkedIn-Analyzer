import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white transition-transform group-hover:scale-105">
            <Linkedin className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-primary-dark">
            Profile<span className="text-secondary-foreground font-medium">Optimizer</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            Analyzer
          </Link>
          <a href="#features" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            Pricing
          </a>
        </nav>
      </div>
    </header>
  );
}
