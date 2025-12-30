'use client';

import { useEffect, useRef, useState } from 'react';

const roles = [
  {
    title: 'Risk Teams',
    description: 'Real-time exposure monitoring across portfolios. Anomaly detection that surfaces what matters before it becomes critical.',
    useCase: 'Unified risk surface across asset classes and geographies',
  },
  {
    title: 'Research Groups',
    description: 'Deep historical context for hypothesis validation. Cross-market correlations without data reconciliation overhead.',
    useCase: 'Primary source access with verification metadata',
  },
  {
    title: 'Portfolio Managers',
    description: 'Coherent market view without information asymmetry. Decision-grade intelligence at the speed of markets.',
    useCase: 'Actionable signals with full provenance trail',
  },
  {
    title: 'Compliance Teams',
    description: 'Audit-ready data lineage for regulatory requirements. Complete transaction reconstruction capabilities.',
    useCase: 'Immutable records with temporal query support',
  },
  {
    title: 'Supervisors',
    description: 'Cross-institutional visibility into systemic patterns. Early warning indicators grounded in verified data.',
    useCase: 'Macro-level intelligence with drill-down capability',
  },
  {
    title: 'Policy Analysts',
    description: 'Evidence-based market intelligence for policy formation. Historical precedent analysis with context preservation.',
    useCase: 'Long-term trend analysis with regulatory context',
  },
];

// Institutional logos (placeholder representations)
const institutionalLogos = [
  'BLOOMBERG', 'REFINITIV', 'FACTSET', 'MSCI', 'S&P', 'MORNINGSTAR', 'ICE', 'LSE'
];

// Marquee component for logos
function LogoMarquee({ isVisible }) {
  return (
    <div className="relative overflow-hidden py-8 border-y border-slate-800/30">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#07090c] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#07090c] to-transparent z-10" />

      <div
        className={`flex gap-16 transition-opacity duration-1000 ${isVisible ? 'animate-marquee' : 'opacity-0'}`}
        style={{ width: 'max-content' }}
      >
        {/* Double the logos for seamless loop */}
        {[...institutionalLogos, ...institutionalLogos].map((logo, i) => (
          <div
            key={i}
            className="group flex items-center justify-center px-8 py-4 transition-all duration-500"
          >
            <span className="text-slate-700 text-sm font-mono tracking-widest group-hover:text-slate-400 transition-colors duration-500">
              {logo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Role card component
function RoleCard({ role, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative p-6 bg-slate-900/20 border border-slate-800/40 rounded-sm transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${isHovered ? 'border-cyan-400/30 bg-slate-900/40' : 'hover:border-slate-700'}`}
      style={{ transitionDelay: `${200 + index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Number indicator */}
      <div className="absolute top-4 right-4 text-slate-800 text-xs font-mono transition-colors duration-300 group-hover:text-slate-600">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon placeholder */}
      <div
        className={`w-8 h-8 mb-4 border flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'border-cyan-400/50 bg-cyan-400/5' : 'border-slate-700'
        }`}
      >
        <div className={`w-2 h-2 transition-colors duration-300 ${isHovered ? 'bg-cyan-400' : 'bg-slate-600'}`} />
      </div>

      {/* Title */}
      <h3 className={`text-lg font-medium mb-3 transition-colors duration-300 ${isHovered ? 'text-cyan-400' : 'text-white'}`}>
        {role.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        {role.description}
      </p>

      {/* Use case */}
      <div className="pt-4 border-t border-slate-800/50">
        <span className="text-xs text-slate-600 uppercase tracking-wider">Primary use case</span>
        <p className={`text-sm mt-1 transition-colors duration-300 ${isHovered ? 'text-slate-300' : 'text-slate-400'}`}>
          {role.useCase}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400/60 to-transparent transition-all duration-500"
        style={{ width: isHovered ? '100%' : '0%' }}
      />
    </div>
  );
}

export default function ValidationFold() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#07090c] to-[#0b0f14]" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(0, 255, 255, 0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-8 h-px bg-cyan-400/50" />
          <span className="text-cyan-400/70 text-sm font-mono tracking-wider">06 / INSTITUTIONAL VALIDATION</span>
        </div>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 max-w-4xl transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Built for those who bear
          <br />
          <span className="text-slate-500">institutional responsibility.</span>
        </h2>

        <p
          className={`text-slate-500 text-lg max-w-2xl mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Quasar serves teams where clarity is not a preference but a requirement.
          Each role benefits differently, but all share the same foundation of verified intelligence.
        </p>

        {/* Logo marquee */}
        <div
          className={`mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <LogoMarquee isVisible={isVisible} />
        </div>

        {/* Roles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role, i) => (
            <RoleCard key={i} role={role} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-slate-600">
            Quasar provides <span className="text-slate-400">clarity</span>, not features.
          </p>
          <p className="text-slate-700 text-sm mt-2">
            The value is in what teams can do with verified, coherent intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
