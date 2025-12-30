'use client';

import { useEffect, useRef, useState } from 'react';

export default function FounderFold() {
  const [isVisible, setIsVisible] = useState(false);
  const [revealedLines, setRevealedLines] = useState(0);
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

  // Line-by-line text reveal
  useEffect(() => {
    if (isVisible && revealedLines < 4) {
      const timer = setTimeout(() => {
        setRevealedLines((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isVisible, revealedLines]);

  const narrativeLines = [
    'Markets do not need more opinions. They need better infrastructure for understanding what is actually happening.',
    'Quasar exists to provide that foundation — a layer of verified, coherent intelligence that institutions can trust.',
    'We are not building tools for speculation or prediction. We are building the plumbing that allows responsible actors to make informed decisions based on facts, not noise.',
    'This is infrastructure for those who understand that clarity is not a luxury — it is a responsibility.',
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#04060a] to-[#0b0f14]" />

      {/* Large background quote text */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
        style={{ opacity: isVisible ? 0.03 : 0, transition: 'opacity 2s ease-out' }}
      >
        <p className="text-[20vw] font-light text-white whitespace-nowrap">
          INFRASTRUCTURAL
        </p>
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0, 255, 255, 0.02) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-8 h-px bg-cyan-400/50" />
          <span className="text-cyan-400/70 text-sm font-mono tracking-wider">07 / FOUNDER</span>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: Founder visual with cinematic lighting */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative max-w-sm mx-auto">
              {/* Cinematic frame */}
              <div className="relative aspect-square">
                {/* Outer frame */}
                <div className="absolute inset-0 border border-slate-800/50" />
                <div className="absolute inset-4 border border-slate-700/30" />

                {/* Light mask effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,255,255,0.03) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%)',
                  }}
                />

                {/* Inner glow */}
                <div className="absolute inset-8 border border-cyan-400/10 bg-[#04060a]/80" />

                {/* Founder initials */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-28 h-28 mx-auto mb-6 border border-slate-700/50 flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, rgba(0,255,255,0.02) 0%, transparent 50%)',
                      }}
                    >
                      {/* Animated scan line */}
                      <div
                        className="absolute w-full h-px bg-cyan-400/20"
                        style={{
                          animation: 'scan-line 4s linear infinite',
                        }}
                      />
                      <span className="text-5xl font-extralight text-slate-500 tracking-wider">SO</span>
                    </div>
                    <div className="text-white font-medium text-lg">Steven E. Orr</div>
                    <div className="text-sm text-slate-500 mt-1">Founder</div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/30" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/30" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/30" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/30" />
              </div>
            </div>
          </div>

          {/* Right: Philosophy */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main quote */}
            <blockquote
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="absolute -left-4 -top-4 text-7xl text-cyan-400/10 font-serif leading-none">"</div>
              <p className="text-2xl md:text-3xl font-light text-white leading-relaxed pl-8">
                The vision is not adversarial.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  It is infrastructural.
                </span>
              </p>
            </blockquote>

            {/* Supporting narrative with line-by-line reveal */}
            <div className="space-y-5 pl-8">
              {narrativeLines.map((line, i) => (
                <p
                  key={i}
                  className={`leading-relaxed transition-all duration-700 ${
                    revealedLines > i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } ${i === narrativeLines.length - 1 ? 'text-slate-500 text-sm' : 'text-slate-400'}`}
                  style={{
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Principles */}
            <div
              className={`pl-8 pt-8 border-t border-slate-800/30 transition-all duration-1000 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="grid grid-cols-3 gap-6">
                {['Clarity over complexity', 'Verification over velocity', 'Infrastructure over application'].map((principle, i) => (
                  <div
                    key={i}
                    className="text-center group"
                  >
                    <div className="w-1 h-1 bg-slate-600 group-hover:bg-cyan-400/60 mx-auto mb-3 transition-colors duration-300" />
                    <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300">{principle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
