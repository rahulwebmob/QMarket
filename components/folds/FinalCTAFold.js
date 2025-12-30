'use client';

import { useEffect, useRef, useState } from 'react';
import Logo from '../Logo';

export default function FinalCTAFold() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDepth, setScrollDepth] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Track scroll depth for darkening effect
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled into this section
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const progress = visibleHeight / rect.height;
        // Deeper scroll = more darkness
        const depth = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
        setScrollDepth(depth);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Final CTA Section */}
      <section ref={sectionRef} className="relative py-32 overflow-hidden noise-overlay">
        {/* Background - darkens on scroll */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: `linear-gradient(to bottom,
              rgba(7, 9, 12, ${0.95 + scrollDepth * 0.05}) 0%,
              rgba(4, 5, 8, ${0.98 + scrollDepth * 0.02}) 100%)`,
          }}
        />

        {/* Subtle radial glow - fades as we scroll */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(0, 255, 255, 0.04) 0%, transparent 60%)',
            opacity: 1 - scrollDepth * 0.5,
          }}
        />

        {/* Vignette effect - intensifies on scroll */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(0, 0, 0, ${0.3 + scrollDepth * 0.4}) 100%)`,
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: isVisible ? 0.05 : 0 }}
        >
          <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="ctaGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M60 0v60H0" fill="none" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaGrid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Section label */}
          <div
            className={`flex items-center justify-center gap-3 mb-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-400/50" />
            <span className="text-cyan-400/70 text-sm font-mono tracking-wider">09 / GET STARTED</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>

          {/* Statement */}
          <div
            className={`mb-16 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-slate-400 leading-relaxed mb-4">
              Ready to stop guessing
              <br className="hidden md:block" />
              and start investing with confidence?
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white">
              Your free trial is waiting.
            </p>
          </div>

          {/* CTAs - Authoritative, no bounce */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-20 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Primary CTA - Glowing outline */}
            <button className="group relative px-10 py-5 bg-transparent overflow-hidden transition-all duration-500 hover:bg-cyan-400/5">
              {/* Glowing border effect */}
              <div className="absolute inset-0 border border-cyan-400/60 transition-all duration-500 group-hover:border-cyan-400" />

              {/* Animated glow on border */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.15), inset 0 0 20px rgba(0, 255, 255, 0.05)',
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 transition-all duration-500 group-hover:w-4 group-hover:h-4" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 transition-all duration-500 group-hover:w-4 group-hover:h-4" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 transition-all duration-500 group-hover:w-4 group-hover:h-4" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 transition-all duration-500 group-hover:w-4 group-hover:h-4" />

              <span className="relative z-10 text-cyan-400 font-medium tracking-wide transition-all duration-300 group-hover:text-cyan-300">
                Start Your 7-Day Free Trial
              </span>
            </button>

            {/* Secondary CTA */}
            <button className="group px-10 py-5 text-slate-500 font-medium border border-slate-800 transition-all duration-500 hover:text-slate-300 hover:border-slate-600 hover:bg-slate-800/20">
              <span className="tracking-wide">Schedule a Demo</span>
            </button>
          </div>

          {/* Logo - Fades further as page darkens */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ opacity: isVisible ? Math.max(0.2, 0.4 - scrollDepth * 0.3) : 0 }}
          >
            <Logo width={160} className="text-white" />
          </div>

          {/* Closing statement */}
          <p
            className={`mt-12 text-slate-700 text-sm transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Invest smarter, not harder. Join thousands of traders on Quasar Markets.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-slate-800/30">
        <div className="absolute inset-0 bg-[#04060a]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left: Copyright */}
            <div className="text-slate-600 text-sm font-mono">
              © {new Date().getFullYear()} Quasar Markets
            </div>

            {/* Center: Links */}
            <div className="flex items-center gap-8">
              <a href="#" className="text-slate-600 text-sm hover:text-slate-400 transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="text-slate-600 text-sm hover:text-slate-400 transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="text-slate-600 text-sm hover:text-slate-400 transition-colors duration-300">
                Support
              </a>
            </div>

            {/* Right: Status */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-50" />
              </div>
              <span className="text-slate-600 text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
