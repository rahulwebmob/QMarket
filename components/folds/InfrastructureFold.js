'use client';

import { useEffect, useRef, useState } from 'react';
import { Brain, LineChart, Smartphone, GraduationCap, PlayCircle, Video, Clock, BookOpen, Users, Wifi } from 'lucide-react';

const capabilities = [
  {
    title: 'AI-Powered Research',
    description: 'Ask questions in plain English and get instant, intelligent answers about any stock or market.',
    metrics: ['Natural language', 'Instant answers', 'Context-aware'],
    icon: Brain,
  },
  {
    title: 'Real-Time Analytics',
    description: 'Live market data, charts, and technical indicators that update in real-time.',
    metrics: ['Live quotes', 'Technical indicators', 'Multi-timeframe'],
    icon: LineChart,
  },
  {
    title: 'Multi-Device Access',
    description: 'Seamless experience across desktop, tablet, and mobile. Your data syncs everywhere.',
    metrics: ['Desktop app', 'Mobile app', 'Cloud sync'],
    icon: Smartphone,
  },
  {
    title: 'Learning Platform',
    description: 'Access courses, webinars, and educational content to level up your trading skills.',
    metrics: ['Video courses', 'Live webinars', 'Expert instructors'],
    icon: GraduationCap,
  },
];

// Video showcase
function VideoShowcase({ isVisible }) {
  const videoRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isMounted) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, isMounted]);

  return (
    <div className={`relative h-[500px] w-full max-w-xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Frame */}
      <div className="absolute -inset-2 border border-slate-800/50 rounded-lg" />
      <div className="absolute -inset-px border border-cyan-400/20 rounded-lg" />

      {/* Main video container */}
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-900">
        {isMounted && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/7579564/7579564-uhd_2732_1440_25fps.mp4"
            muted
            loop
            playsInline
          />
        )}

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent" />
        <div className="absolute inset-0 bg-[#04060a]/30" />

        {/* Scan line effect */}
        <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none"
          style={{ animation: 'scan-down 3s linear infinite' }}
        />

        {/* Label */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,255,255,0.6)' }} />
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider">
              Live Platform
            </span>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute -top-1 -left-1 w-6 h-6 border-t border-l border-cyan-400/50" />
      <div className="absolute -top-1 -right-1 w-6 h-6 border-t border-r border-cyan-400/50" />
      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b border-l border-cyan-400/50" />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b border-r border-cyan-400/50" />

      <style jsx>{`
        @keyframes scan-down {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Capability card
function CapabilityCard({ capability, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = capability.icon;

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
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-cyan-400/20' : 'bg-slate-800/50'}`}>
              <Icon className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-cyan-400' : 'text-slate-400'}`} strokeWidth={1.5} />
            </div>
            <h4 className={`text-base font-medium uppercase tracking-wide transition-colors duration-300 ${isHovered ? 'text-cyan-400' : 'text-white'}`}>
              {capability.title}
            </h4>
          </div>
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
    <section id="platform" ref={sectionRef} className="relative py-32 overflow-hidden">
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
            <span className="text-slate-500 text-sm uppercase tracking-wider">Platform</span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Everything you need to{' '}
            <span className="font-medium bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
              trade smarter
            </span>
          </h2>

          <p
            className={`text-slate-500 text-lg max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            A complete platform for traders at every level. Research, analyze, learn, and execute.
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
            <VideoShowcase isVisible={isVisible} />
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
            { value: '50+', label: 'Video Courses', icon: PlayCircle },
            { value: '100+', label: 'Expert Webinars', icon: Video },
            { value: '24/7', label: 'Platform Access', icon: Wifi },
          ].map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div key={i} className="text-center group">
                <div className="flex justify-center mb-2">
                  <StatIcon className="w-5 h-5 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="text-2xl md:text-3xl font-light text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
