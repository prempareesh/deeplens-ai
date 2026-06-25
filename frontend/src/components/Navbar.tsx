import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Eye, ShieldAlert, Menu, X } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/detect', label: 'Detect' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/history', label: 'History' },
    { to: '/about', label: 'About' },
    { to: '/docs', label: 'Documentation' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/70 backdrop-blur-xl border-b border-border-custom py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none group">
          <div className="w-9 h-9 rounded-lg bg-primary-indigo/10 border border-primary-indigo/30 flex items-center justify-center text-primary-indigo group-hover:scale-105 transition-transform">
            <Eye className="w-5 h-5" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-primary-indigo transition-colors">
            DeepLens
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-primary-indigo'
                    : 'text-text-secondary hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link to="/detect">
            <Button size="sm" variant="accent" rightIcon={<ShieldAlert className="w-4 h-4" />}>
              Start Detection
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-text-secondary hover:text-white transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-background/95 backdrop-blur-2xl z-30 flex flex-col p-6 animate-fade-in border-t border-border-custom">
          <div className="flex flex-col gap-6 mt-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold tracking-wide border-b border-border-custom pb-2 ${
                    isActive ? 'text-primary-indigo' : 'text-text-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/detect" onClick={() => setIsMobileMenuOpen(false)} className="w-full mt-4">
              <Button className="w-full" size="lg" rightIcon={<ShieldAlert className="w-5 h-5" />}>
                Start Detection
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
