'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, TrendingUp, Newspaper, Brain, Trophy, GraduationCap } from 'lucide-react';

const browserCategories = [
  {
    icon: TrendingUp,
    label: 'Trading',
    description: 'Real-time market analysis, live charts, and actionable trading signals to help you make smarter investment decisions.',
  },
  {
    icon: Newspaper,
    label: 'News',
    description: 'Breaking financial news, earnings reports, and market-moving events delivered instantly to keep you informed.',
  },
  {
    icon: Brain,
    label: 'AI',
    description: 'Advanced machine learning models that analyze patterns, predict trends, and provide intelligent market insights.',
  },
  {
    icon: Trophy,
    label: 'Sports',
    description: 'Comprehensive sports analytics, betting odds comparison, and data-driven predictions for informed decisions.',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    description: 'Expert-led courses, live webinars, and educational resources to master trading strategies at any skill level.',
  },
];

export default function HeroFold() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef(null);

  // Cycle through categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % browserCategories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth cursor follower
  useEffect(() => {
    let animationId;
    const smoothFollow = () => {
      setCursorPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
      animationId = requestAnimationFrame(smoothFollow);
    };
    animationId = requestAnimationFrame(smoothFollow);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  const opacity = Math.max(0, 1 - scrollY / 700);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#030508]" />

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-bg">
          <div className="gradient-1" />
          <div className="gradient-2" />
          <div className="gradient-3" />
          <div className="gradient-4" />
        </div>
      </div>

      {/* Mouse follow glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.08) 0%, transparent 70%)',
          left: cursorPos.x - 250,
          top: cursorPos.y - 250,
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Cursor dot */}
      <div
        className="absolute w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          background: 'rgba(0,255,255,0.9)',
          left: cursorPos.x - 8,
          top: cursorPos.y - 8,
          boxShadow: '0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)',
        }}
      />

      {/* Cursor ring */}
      <div
        className="absolute w-10 h-10 rounded-full pointer-events-none z-50 border border-cyan-400/50"
        style={{
          left: cursorPos.x - 20,
          top: cursorPos.y - 20,
          transition: 'transform 0.2s ease-out',
        }}
      />


      {/* Grid pattern - animated */}
      <div className="absolute inset-0 grid-container">
        <div
          className="absolute inset-0 grid-pattern"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Grid glow pulse overlay */}
        <div
          className="absolute inset-0 grid-glow"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Horizontal scan effect on grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="grid-scan-h" />
        </div>
        {/* Vertical scan effect on grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="grid-scan-v" />
        </div>
      </div>


      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line" />
      </div>

      {/* Floating particles - very slow and subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full particle"
            style={{
              width: '2px',
              height: '2px',
              left: `${12 + i * 11}%`,
              top: '100%',
              background: 'rgba(0,255,255,0.4)',
              animationDuration: `${60 + i * 15}s`,
              animationDelay: `${i * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(3,5,8,0.9) 100%)',
        }}
      />

      {/* Corner accents - animated */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-cyan-400/30 corner-accent" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-cyan-400/30 corner-accent" style={{ animationDelay: '0.2s' }} />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-cyan-400/30 corner-accent" style={{ animationDelay: '0.4s' }} />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-cyan-400/30 corner-accent" style={{ animationDelay: '0.6s' }} />

      {/* Main content - Split Layout */}
      <div
        className="relative z-10 px-6 max-w-screen-2xl mx-auto"
        style={{
          opacity,
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-left">
            {/* Headline */}
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-white mb-6 leading-tight transition-all duration-1000 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              The institutional-grade
              <br />
              intelligence layer for
              <br />
              <span className="font-semibold bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                next-generation markets.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className={`text-base md:text-lg text-slate-400 max-w-xl mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Aligning verified, multi-source market data into a single coherent surface
              for responsible decision-making.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-start gap-4 mb-10 transition-all duration-1000 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button className="group relative px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  Sign Up Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="px-8 py-3.5 text-slate-300 text-sm font-medium rounded-lg border border-slate-700 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2">
                <Play className="w-4 h-4" strokeWidth={2} />
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div
              className={`flex items-center gap-6 transition-all duration-1000 delay-800 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-[10px] text-slate-600 uppercase tracking-widest">Trusted by</span>
              <div className="flex items-center gap-4 opacity-40">
                {['Bloomberg', 'Reuters', 'MSCI', 'S&P'].map((name) => (
                  <span key={name} className="text-xs text-slate-500 font-medium">{name}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Platform Preview Placeholder */}
          <div
            className={`relative transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-slate-800/30 rounded-2xl" />
            <div className="absolute -inset-2 border border-cyan-400/10 rounded-xl" />

            {/* Main placeholder container */}
            <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm">
              {/* Toolbar header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-800/50 border border-slate-700/50">
                  <svg className="w-3 h-3 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-[10px] text-slate-500">app.quasarmarkets.com</span>
                </div>
                <div className="w-16" />
              </div>

              {/* Content area with cycling icons */}
              <div className="aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background pulse effect */}
                <div
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.1) 0%, transparent 70%)',
                  }}
                />

                {/* Cycling icons */}
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  {browserCategories.map((category, index) => {
                    const Icon = category.icon;
                    const isActive = index === activeCategory;
                    return (
                      <div
                        key={category.label}
                        className={`absolute flex flex-col items-center justify-center gap-4 transition-all duration-700 ease-out ${
                          isActive
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-75 translate-y-8'
                        }`}
                      >
                        {/* Extra large icon with glow effect */}
                        <Icon
                          className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 text-cyan-400 transition-all duration-500"
                          strokeWidth={0.3}
                          style={{
                            filter: isActive ? 'drop-shadow(0 0 80px rgba(34,211,238,0.5))' : 'none',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Bottom status bar */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-slate-700/50 bg-slate-900/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse" />
                  <span className="text-[10px] text-slate-600">Live</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-slate-600">AI Analysis</span>
                  <span className="text-[10px] text-cyan-400/60">Active</span>
                </div>
              </div>
            </div>

            {/* Corner accents on placeholder */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400/40 rounded-tr" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400/40 rounded-bl" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40 rounded-br" />
          </div>
        </div>

        {/* Scroll indicator - centered below both columns */}
        <div
          className={`mt-16 flex justify-center transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] text-slate-600 uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 border border-slate-700 rounded-full flex justify-center pt-2">
              <div className="w-0.5 h-2 bg-cyan-400/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .grid-container {
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%);
        }
        .grid-pattern {
          opacity: 0.4;
        }
        .grid-glow {
          opacity: 0;
          animation: grid-pulse 8s ease-in-out infinite;
        }
        @keyframes grid-pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.6; }
        }
        .grid-scan-h {
          position: absolute;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(180deg, transparent, rgba(0,255,255,0.1), transparent);
          animation: grid-scan-horizontal 12s ease-in-out infinite;
        }
        @keyframes grid-scan-horizontal {
          0% { top: -120px; }
          100% { top: 100%; }
        }
        .grid-scan-v {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.08), transparent);
          animation: grid-scan-vertical 15s ease-in-out infinite;
        }
        @keyframes grid-scan-vertical {
          0% { left: -120px; }
          100% { left: 100%; }
        }
        .gradient-bg {
          position: absolute;
          inset: 0;
          filter: blur(150px);
        }
        .gradient-1 {
          position: absolute;
          width: 60%;
          height: 60%;
          top: -20%;
          right: -20%;
          background: radial-gradient(circle, rgba(0,255,255,0.08) 0%, transparent 70%);
          animation: float-1 90s ease-in-out infinite;
        }
        .gradient-2 {
          position: absolute;
          width: 50%;
          height: 50%;
          bottom: -10%;
          left: -10%;
          background: radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%);
          animation: float-2 120s ease-in-out infinite;
        }
        .gradient-3 {
          position: absolute;
          width: 40%;
          height: 40%;
          top: 40%;
          left: 30%;
          background: radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%);
          animation: float-3 100s ease-in-out infinite;
        }
        .gradient-4 {
          position: absolute;
          width: 35%;
          height: 35%;
          top: 20%;
          right: 20%;
          background: radial-gradient(circle, rgba(0,255,255,0.04) 0%, transparent 70%);
          animation: float-4 110s ease-in-out infinite;
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 10px) scale(1.02); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -10px) scale(1.02); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 10px) scale(1.03); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, 8px) scale(1.02); }
        }
        .scan-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.05), transparent);
          animation: scan 30s linear infinite;
        }
        @keyframes scan {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        .particle {
          animation: particle-rise linear infinite;
        }
        @keyframes particle-rise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        .corner-accent {
          animation: corner-pulse 8s ease-in-out infinite;
        }
        @keyframes corner-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
