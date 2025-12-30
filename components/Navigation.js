'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#07090c]/95 backdrop-blur-md border-b border-slate-800/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Logo width={140} className="text-white" />
          </a>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#how-it-works"
              className={`text-sm transition-all duration-300 ${
                scrolled ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              How it Works
            </a>
            <a
              href="#coverage"
              className={`text-sm transition-all duration-300 ${
                scrolled ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Coverage
            </a>
            <a
              href="#platform"
              className={`text-sm transition-all duration-300 ${
                scrolled ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Platform
            </a>
            <a
              href="#who-its-for"
              className={`text-sm transition-all duration-300 ${
                scrolled ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Who it's for
            </a>
            <a
              href="#pricing"
              className={`text-sm transition-all duration-300 ${
                scrolled ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Pricing
            </a>

            {/* CTA Button - Subtle until scrolled */}
            <button
              className={`relative px-5 py-2 text-sm font-medium transition-all duration-500 overflow-hidden group ${
                scrolled
                  ? 'border border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/10'
                  : 'border border-slate-700/50 text-slate-500 hover:border-slate-600 hover:text-slate-400'
              }`}
            >
              {/* Glow effect on scroll */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  boxShadow: scrolled ? '0 0 15px rgba(0, 255, 255, 0.1)' : 'none',
                  opacity: scrolled ? 1 : 0,
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                Sign Up Now
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <div
                className={`w-6 h-px transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2 bg-cyan-400' : 'bg-white'
                }`}
              />
              <div
                className={`w-6 h-px bg-white transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <div
                className={`w-6 h-px transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2 bg-cyan-400' : 'bg-white'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-6 border-t border-slate-800/30">
            <div className="flex flex-col gap-4">
              <a
                href="#how-it-works"
                className="text-slate-400 py-2 hover:text-white transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#coverage"
                className="text-slate-400 py-2 hover:text-white transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Coverage
              </a>
              <a
                href="#platform"
                className="text-slate-400 py-2 hover:text-white transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Platform
              </a>
              <a
                href="#who-its-for"
                className="text-slate-400 py-2 hover:text-white transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Who it's for
              </a>
              <a
                href="#pricing"
                className="text-slate-400 py-2 hover:text-white transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </a>
              <button className="mt-4 px-5 py-3 text-sm border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                Sign Up Now
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
