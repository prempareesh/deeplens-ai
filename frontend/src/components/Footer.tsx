import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Cpu, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-custom bg-background py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        
        {/* Info Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-sm">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-indigo/10 border border-primary-indigo/30 flex items-center justify-center text-primary-indigo">
              <Eye className="w-4.5 h-4.5" />
            </div>
            <span className="font-heading text-base font-bold tracking-tight text-white">
              DeepLens
            </span>
          </Link>
          <p className="text-sm text-text-secondary leading-relaxed">
            AI-Powered Deepfake Detection Platform using advanced Vision Transformer models. See beyond the pixels, verify the truth.
          </p>
        </div>

        {/* Links Columns */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center md:text-left">
          
          {/* Navigation Links */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold tracking-wider text-white font-heading">
              Platform
            </span>
            <Link to="/detect" className="text-sm text-text-secondary hover:text-white transition-colors">
              Detector
            </Link>
            <Link to="/dashboard" className="text-sm text-text-secondary hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/history" className="text-sm text-text-secondary hover:text-white transition-colors">
              History Logs
            </Link>
          </div>

          {/* Docs & About Links */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold tracking-wider text-white font-heading">
              Resources
            </span>
            <Link to="/docs" className="text-sm text-text-secondary hover:text-white transition-colors">
              Documentation
            </Link>
            <Link to="/about" className="text-sm text-text-secondary hover:text-white transition-colors">
              Research Paper
            </Link>
            <a href="https://github.com/prempareesh/deeplens-ai" target="_blank" rel="noreferrer" className="text-sm text-text-secondary hover:text-white transition-colors flex items-center gap-1.5 justify-center md:justify-start">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg> Github Repo
            </a>
          </div>

          {/* Tech Stack Info */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold tracking-wider text-white font-heading">
              Technology
            </span>
            <div className="text-sm text-text-secondary flex flex-col gap-1 items-center md:items-start">
              <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-accent-cyan" /> Vision Transformer</span>
              <span>PyTorch Engine</span>
              <span>FastAPI Backend</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto border-t border-border-custom mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} DeepLens. All rights reserved.
        </span>
        <span className="text-xs text-text-secondary flex items-center gap-1.5">
          Made with <Heart className="w-3.5 h-3.5 text-danger-red fill-danger-red animate-pulse" /> for secure digital media verification.
        </span>
      </div>
    </footer>
  );
};
