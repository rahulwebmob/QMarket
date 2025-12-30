'use client';

import { useEffect, useRef, useState } from 'react';
import {
  TrendingUp, Database, Newspaper,
  LineChart, Brain, Bell, Star,
  Radio, Lightbulb, Zap,
  Globe, BarChart3, FileText
} from 'lucide-react';

const dataSources = [
  {
    category: 'Stocks & ETFs',
    items: ['NYSE', 'NASDAQ', 'S&P 500', 'Russell 2000', 'Global Markets'],
    icon: TrendingUp,
  },
  {
    category: 'Market Data',
    items: ['Real-time quotes', 'Historical data', 'After-hours trading', 'Pre-market analysis'],
    icon: Database,
  },
  {
    category: 'News & Events',
    items: ['Earnings reports', 'SEC filings', 'Market news', 'Economic indicators'],
    icon: Newspaper,
  },
];

const verificationLayers = [
  {
    layer: 'Real-Time Charts',
    description: 'Interactive charts with multiple timeframes and technical indicators',
    icon: LineChart,
  },
  {
    layer: 'AI Analysis',
    description: 'Pattern recognition and trend analysis powered by machine learning',
    icon: Brain,
  },
  {
    layer: 'Custom Alerts',
    description: 'Set price alerts and get notified when opportunities arise',
    icon: Bell,
  },
  {
    layer: 'Watchlists',
    description: 'Track your favorite stocks with personalized watchlists',
    icon: Star,
  },
];

// Clean data flow visualization with animations
function DataFlowVisual({ isVisible }) {
  return (
    <div className="relative w-full h-72 md:h-80 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/50">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Animated flowing particles - left to center */}
      {isVisible && [...Array(6)].map((_, i) => (
        <div
          key={`left-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
          style={{
            left: '15%',
            top: `${35 + (i % 3) * 15}%`,
            animation: `flow-right 3s ease-in-out infinite ${i * 0.5}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Animated flowing particles - center to right */}
      {isVisible && [...Array(6)].map((_, i) => (
        <div
          key={`right-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-teal-400"
          style={{
            left: '50%',
            top: `${35 + (i % 3) * 15}%`,
            animation: `flow-right-out 3s ease-in-out infinite ${i * 0.5 + 1.5}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Horizontal flow lines */}
      <div className="absolute left-[15%] right-[15%] top-1/2 -translate-y-1/2 h-px">
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-cyan-400/10 to-transparent"
          style={{
            animation: isVisible ? 'shimmer-line 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>
      <div className="absolute left-1/2 right-[15%] top-1/2 -translate-y-1/2 h-px">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/10 to-teal-400/30"
          style={{
            animation: isVisible ? 'shimmer-line 2s ease-in-out infinite 1s' : 'none',
          }}
        />
      </div>

      {/* Center hub */}
      <div className="relative z-10 w-24 h-24 flex items-center justify-center">
        {/* Pulse rings - expanding outward */}
        <div
          className="absolute w-24 h-24 rounded-full border border-cyan-400/30"
          style={{
            animation: isVisible ? 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none',
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full border border-cyan-400/30"
          style={{
            animation: isVisible ? 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite 1.5s' : 'none',
          }}
        />

        {/* Outer glow ring */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/10 to-teal-400/5 flex items-center justify-center border border-cyan-400/20">
          {/* Middle pulsing ring */}
          <div
            className="absolute w-16 h-16 rounded-full border border-cyan-400/30"
            style={{
              animation: isVisible ? 'pulse-ring 2s ease-in-out infinite' : 'none',
            }}
          />

          {/* Core */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,255,0.4)]">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Incoming data streams - left side */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8">
        {['Markets', 'News', 'Signals'].map((label, i) => (
          <div
            key={label}
            className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.5)]"
              style={{
                animation: isVisible ? `pulse-dot 2s ease-in-out infinite ${i * 0.3}s` : 'none',
              }}
            />
            <span className="text-xs font-mono text-slate-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Outgoing verified data - right side */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8">
        {['Insights', 'Alerts', 'Actions'].map((label, i) => (
          <div
            key={label}
            className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: `${300 + i * 150}ms` }}
          >
            <span className="text-xs font-mono text-slate-400">{label}</span>
            <div
              className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]"
              style={{
                animation: isVisible ? `pulse-dot 2s ease-in-out infinite ${i * 0.3}s` : 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-cyan-400/20 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-cyan-400/20 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-cyan-400/20 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-cyan-400/20 rounded-br-lg" />

      <style jsx>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes flow-right {
          0% { left: 18%; opacity: 0; transform: scale(0.5); }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1); }
          100% { left: 42%; opacity: 0; transform: scale(0.5); }
        }
        @keyframes flow-right-out {
          0% { left: 58%; opacity: 0; transform: scale(0.5); }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1); }
          100% { left: 82%; opacity: 0; transform: scale(0.5); }
        }
        @keyframes shimmer-line {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default function SourceFold() {
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
    <section id="coverage" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#050709] to-[#0b0f14]" />

      {/* Radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(0, 255, 255, 0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-400/50" />
            <span className="text-cyan-400 text-sm font-mono">04</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Comprehensive market{' '}
            <span className="font-medium bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
              coverage
            </span>
          </h2>

          <p
            className={`text-slate-500 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Access real-time data from major exchanges. All the tools you need in one place.
          </p>
        </div>

        {/* Data flow visualization */}
        <div
          className={`mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <DataFlowVisual isVisible={isVisible} />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Data Sources */}
          <div>
            <h3
              className={`text-xl text-white mb-8 font-medium flex items-center gap-3 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
              </span>
              Market Coverage
            </h3>

            <div className="space-y-6">
              {dataSources.map((source, i) => {
                const SourceIcon = source.icon;
                return (
                  <div
                    key={i}
                    className={`transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${500 + i * 100}ms` }}
                  >
                    <h4 className="text-slate-300 font-medium mb-3 flex items-center gap-2 text-sm">
                      <SourceIcon className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                      {source.category}
                    </h4>
                    <div className="flex flex-wrap gap-2 pl-6">
                      {source.items.map((item, j) => (
                        <span
                          key={j}
                          className="text-xs text-slate-500 py-1.5 px-3 bg-slate-800/50 rounded-full border border-slate-700/50 hover:border-cyan-400/30 hover:text-slate-400 transition-all duration-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Verification Layers */}
          <div>
            <h3
              className={`text-xl text-white mb-8 font-medium flex items-center gap-3 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
              </span>
              Analysis Tools
            </h3>

            <div className="space-y-3">
              {verificationLayers.map((layer, i) => {
                const LayerIcon = layer.icon;
                return (
                  <div
                    key={i}
                    className={`group p-4 rounded-lg border border-slate-800/50 hover:border-teal-400/20 bg-slate-900/30 hover:bg-slate-900/50 transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${500 + i * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-400/20 transition-colors duration-300">
                        <LayerIcon className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-slate-200 font-medium text-sm mb-0.5 group-hover:text-teal-400 transition-colors duration-300">
                          {layer.layer}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{layer.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div
          className={`mt-20 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-2xl md:text-3xl text-white font-light">
            All the data.{' '}
            <span className="text-cyan-400">All the insights. One platform.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
