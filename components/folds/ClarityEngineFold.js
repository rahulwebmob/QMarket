'use client';

import { useEffect, useRef, useState } from 'react';
import { Radar, BarChart3, TrendingUp, Bell, Zap } from 'lucide-react';

const stages = [
  {
    id: 'scan',
    title: 'Scan',
    description: 'Our AI continuously monitors thousands of stocks, ETFs, and market signals in real-time.',
    icon: '01',
    lucideIcon: Radar,
  },
  {
    id: 'analyze',
    title: 'Analyze',
    description: 'Advanced algorithms identify patterns, trends, and opportunities across multiple timeframes.',
    icon: '02',
    lucideIcon: BarChart3,
  },
  {
    id: 'predict',
    title: 'Predict',
    description: 'Machine learning models forecast potential price movements and market scenarios.',
    icon: '03',
    lucideIcon: TrendingUp,
  },
  {
    id: 'alert',
    title: 'Alert',
    description: 'Get notified instantly when AI detects actionable opportunities matching your criteria.',
    icon: '04',
    lucideIcon: Bell,
  },
  {
    id: 'execute',
    title: 'Execute',
    description: 'Act on insights with confidence. All the intelligence you need to make informed decisions.',
    icon: '05',
    lucideIcon: Zap,
  },
];

// Beautiful CSS-based HUD visualization
function EngineCoreHUD({ hoveredStage, isVisible }) {
  const activeStage = stages.find(s => s.id === hoveredStage);
  const ActiveIcon = activeStage?.lucideIcon;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Outer rotating ring */}
      <div
        className="absolute inset-0 rounded-full border border-cyan-400/20"
        style={{
          animation: isVisible ? 'spin 60s linear infinite' : 'none',
        }}
      >
        {/* Tick marks on outer ring */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-2 bg-cyan-400/30 left-1/2 -translate-x-1/2"
            style={{
              transformOrigin: '50% 200px',
              transform: `rotate(${i * 6}deg)`,
            }}
          />
        ))}
      </div>

      {/* Middle ring - counter rotate */}
      <div
        className={`absolute inset-8 rounded-full border transition-all duration-500 ${
          hoveredStage ? 'border-cyan-400/40' : 'border-cyan-400/15'
        }`}
        style={{
          animation: isVisible ? 'spin 45s linear infinite reverse' : 'none',
        }}
      />

      {/* Inner dashed ring */}
      <div
        className={`absolute inset-16 rounded-full border border-dashed transition-all duration-500 ${
          hoveredStage ? 'border-cyan-400/50' : 'border-cyan-400/20'
        }`}
        style={{
          animation: isVisible ? 'spin 30s linear infinite' : 'none',
        }}
      />

      {/* Pulsing core */}
      <div className="absolute inset-24 rounded-full">
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            hoveredStage ? 'bg-cyan-400/15' : 'bg-cyan-400/5'
          }`}
          style={{
            animation: isVisible ? 'pulse-core 3s ease-in-out infinite' : 'none',
          }}
        />
        <div
          className={`absolute inset-4 rounded-full transition-all duration-500 ${
            hoveredStage ? 'bg-cyan-400/20' : 'bg-cyan-400/10'
          }`}
          style={{
            animation: isVisible ? 'pulse-core 3s ease-in-out infinite 0.5s' : 'none',
          }}
        />
        <div className={`absolute inset-8 rounded-full transition-all duration-500 ${
          hoveredStage ? 'bg-cyan-400/30' : 'bg-cyan-400/20'
        }`} />
      </div>

      {/* Center icon or dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {ActiveIcon ? (
          <div className="w-24 h-24 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.3)]">
            <ActiveIcon className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
          </div>
        ) : (
          <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)]" />
        )}
      </div>

      {/* Stage nodes positioned around the circle */}
      {stages.map((stage, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const radius = 42; // percentage from center
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        const isActive = hoveredStage === stage.id;
        const StageIcon = stage.lucideIcon;

        return (
          <div
            key={stage.id}
            className="absolute transition-all duration-300"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Node with icon */}
            <div
              className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-14 h-14 bg-cyan-400/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.4)]'
                  : 'w-10 h-10 bg-slate-800/60 border border-cyan-400/20'
              }`}
            >
              <StageIcon
                className={`transition-all duration-300 ${
                  isActive ? 'w-8 h-8 text-cyan-400' : 'w-5 h-5 text-cyan-400/50'
                }`}
                strokeWidth={1.5}
              />
            </div>
            {/* Connection line to center */}
            <div
              className={`absolute w-px bg-gradient-to-b from-cyan-400/40 to-transparent transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-30'
              }`}
              style={{
                height: `${radius * 0.8}%`,
                left: '50%',
                bottom: '100%',
                transformOrigin: 'bottom',
                transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
              }}
            />
          </div>
        );
      })}

      {/* Stage labels */}
      {stages.map((stage, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const radius = 56;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        const isActive = hoveredStage === stage.id;

        return (
          <div
            key={`label-${stage.id}`}
            className={`absolute text-[7px] font-mono uppercase tracking-wider transition-all duration-300 ${
              isActive ? 'text-cyan-400' : 'text-slate-600'
            }`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {stage.title}
          </div>
        );
      })}

      {/* Keyframes */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function ClarityEngineFold() {
  const [hoveredStage, setHoveredStage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#050709] to-[#0b0f14]" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 30% 50%, rgba(0, 255, 255, 0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-20">
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-cyan-400 text-sm font-mono">03</span>
            <div className="w-12 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
            <span className="text-slate-500 text-sm uppercase tracking-wider">The AI Engine</span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            How Quasar Markets{' '}
            <span className="font-medium bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
              works
            </span>
          </h2>

          <p
            className={`text-slate-500 text-lg max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our AI-powered engine processes millions of data points to deliver
            actionable insights in real-time.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Engine HUD */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <EngineCoreHUD hoveredStage={hoveredStage} isVisible={isVisible} />
          </div>

          {/* Right: Stage cards */}
          <div className="space-y-3">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`group relative p-5 rounded-lg cursor-pointer transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                } ${
                  hoveredStage === stage.id
                    ? 'bg-cyan-400/5 border border-cyan-400/20'
                    : 'bg-slate-900/30 border border-transparent hover:bg-slate-900/50'
                }`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <div className="flex flex-col gap-2">
                  {/* Header row - number, title, arrow */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-mono transition-colors duration-300 ${
                        hoveredStage === stage.id ? 'text-cyan-400' : 'text-slate-600'
                      }`}
                    >
                      {stage.icon}
                    </span>
                    <span
                      className={`flex-1 text-lg font-medium uppercase tracking-wide transition-colors duration-300 ${
                        hoveredStage === stage.id ? 'text-cyan-400' : 'text-white'
                      }`}
                    >
                      {stage.title}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-all duration-300 ${
                        hoveredStage === stage.id
                          ? 'text-cyan-400 translate-x-0 opacity-100'
                          : 'text-slate-600 -translate-x-2 opacity-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed pl-9">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom principles */}
        <div
          className={`mt-24 pt-12 border-t border-slate-800/30 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-lg text-white mb-8 font-medium">Why traders choose Quasar Markets</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Instant insights',
                text: 'No more hours of research. Get AI-powered analysis in seconds, not days.',
              },
              {
                title: 'Beginner friendly',
                text: 'Ask questions in plain English. Our AI explains complex market dynamics simply.',
              },
              {
                title: 'Always learning',
                text: 'Our models continuously improve, adapting to market conditions and your trading style.',
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <h4 className="text-slate-300 font-medium mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed pl-4">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
