'use client';

import { useEffect, useRef, useState } from 'react';

const capabilities = [
  {
    title: 'Real-Time Stream Processing',
    description: 'Sub-millisecond ingestion and normalization across global market feeds.',
    metrics: ['< 1ms latency', '10M+ events/sec', '99.999% uptime'],
  },
  {
    title: 'Historical Context Layers',
    description: 'Deep temporal archives with point-in-time reconstruction.',
    metrics: ['20+ years depth', 'Tick-level', 'Point-in-time'],
  },
  {
    title: 'Modular Intelligence Components',
    description: 'Composable building blocks for custom analytical workflows.',
    metrics: ['50+ modules', 'API-first', 'Custom integrations'],
  },
  {
    title: 'Sovereign-Grade Security',
    description: 'Multi-layered security posture meeting stringent requirements.',
    metrics: ['SOC 2 Type II', 'E2E encryption', 'Geo-redundancy'],
  },
];

const layers = [
  { name: 'Application Layer', color: 'from-cyan-400/20 to-cyan-400/5' },
  { name: 'Intelligence Layer', color: 'from-teal-400/20 to-teal-400/5' },
  { name: 'Processing Layer', color: 'from-emerald-400/20 to-emerald-400/5' },
  { name: 'Data Layer', color: 'from-cyan-400/20 to-cyan-400/5' },
  { name: 'Infrastructure Layer', color: 'from-slate-400/20 to-slate-400/5' },
];

// 3D Layered stack diagram
function ArchitectureDiagram({ isVisible }) {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  return (
    <div className="relative h-80 w-full max-w-md mx-auto perspective-1000">
      <div
        className="relative h-full w-full transition-transform duration-1000"
        style={{
          transformStyle: 'preserve-3d',
          transform: isVisible ? 'rotateX(15deg) rotateY(-10deg)' : 'rotateX(0deg) rotateY(0deg)',
        }}
      >
        {layers.map((layer, i) => {
          const isHovered = hoveredLayer === i;
          const baseOffset = i * 50;
          const hoverOffset = isHovered ? -10 : 0;

          return (
            <div
              key={layer.name}
              className={`absolute left-0 right-0 h-12 rounded-lg border transition-all duration-500 cursor-pointer ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${
                isHovered
                  ? 'border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]'
                  : 'border-slate-700/50'
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                bottom: `${baseOffset}px`,
                transform: `translateZ(${i * 10}px) translateY(${hoverOffset}px)`,
                background: `linear-gradient(135deg, ${layer.color.split(' ')[0].replace('from-', '')}, ${layer.color.split(' ')[1].replace('to-', '')})`,
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
              }}
              onMouseEnter={() => setHoveredLayer(i)}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <div className="absolute inset-0 flex items-center px-4">
                <span
                  className={`text-xs font-mono uppercase tracking-wider transition-colors duration-300 ${
                    isHovered ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  {layer.name}
                </span>
              </div>

              {/* Connection lines */}
              {i < layers.length - 1 && (
                <div className="absolute -bottom-[38px] left-1/2 w-px h-[38px] bg-gradient-to-b from-cyan-400/30 to-transparent" />
              )}

              {/* Glow on hover */}
              {isHovered && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/5 to-transparent" />
              )}
            </div>
          );
        })}

        {/* Decorative data flow particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isVisible && [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                animation: `flow-up ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes flow-up {
          0% { bottom: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { bottom: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Capability card
function CapabilityCard({ capability, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative p-5 bg-slate-900/40 border border-slate-800/50 rounded-xl transition-all duration-500 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isHovered ? 'border-cyan-400/30 bg-slate-900/60' : ''}`}
      style={{ transitionDelay: `${400 + index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(0,255,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Top line accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className={`text-base font-medium transition-colors duration-300 ${isHovered ? 'text-cyan-400' : 'text-white'}`}>
            {capability.title}
          </h3>
          <span className={`text-xs font-mono transition-colors duration-300 ${isHovered ? 'text-cyan-400' : 'text-slate-600'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          {capability.description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-1.5">
          {capability.metrics.map((metric, j) => (
            <span
              key={j}
              className={`text-[10px] font-mono px-2 py-1 rounded transition-all duration-300 ${
                isHovered
                  ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                  : 'text-slate-500 bg-slate-800/50 border border-slate-700/50'
              }`}
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InfrastructureFold() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#050709] to-[#0b0f14]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 70% 30%, rgba(0, 255, 255, 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-cyan-400 text-sm font-mono">05</span>
            <div className="w-12 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
            <span className="text-slate-500 text-sm uppercase tracking-wider">Infrastructure</span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Built for{' '}
            <span className="font-medium bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
              institutional scale
            </span>
          </h2>

          <p
            className={`text-slate-500 text-lg max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Infrastructure, not application. A layer that institutions build upon.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Architecture diagram */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <ArchitectureDiagram isVisible={isVisible} />
          </div>

          {/* Right: Capabilities grid */}
          <div className="grid gap-4">
            {capabilities.map((cap, i) => (
              <CapabilityCard key={i} capability={cap} index={i} isVisible={isVisible} />
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div
          className={`grid grid-cols-3 gap-8 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '99.999%', label: 'Uptime SLA' },
            { value: '< 1ms', label: 'P99 Latency' },
            { value: '10M+', label: 'Events/Second' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-light text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
