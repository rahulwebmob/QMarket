'use client';

import { useEffect, useState, useRef } from 'react';

export default function HeroFold() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* Main content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          opacity,
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
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
          className={`text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Aligning verified, multi-source market data into a single coherent surface
          for responsible decision-making.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="group relative px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]">
            <span className="relative z-10 flex items-center gap-2">
              Request Access
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="px-8 py-3.5 text-slate-300 text-sm font-medium rounded-lg border border-slate-700 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300">
            Watch Demo
          </button>
        </div>

        {/* Trust indicators */}
        <div
          className={`flex items-center justify-center gap-8 transition-all duration-1000 delay-800 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[10px] text-slate-600 uppercase tracking-widest">Trusted by</span>
          <div className="flex items-center gap-6 opacity-40">
            {['Bloomberg', 'Reuters', 'MSCI', 'S&P'].map((name) => (
              <span key={name} className="text-xs text-slate-500 font-medium">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
        style={{ opacity: Math.max(0, 1 - scrollY / 100) }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] text-slate-600 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border border-slate-700 rounded-full flex justify-center pt-2">
            <div className="w-0.5 h-2 bg-cyan-400/60 rounded-full animate-bounce" />
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
