'use client';

import { useEffect, useRef, useState } from 'react';

// Chaotic data visualization (left side)
function ChaoticDataVisual({ progress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let elements = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resize();

    // Create chaotic elements
    for (let i = 0; i < 25; i++) {
      elements.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        width: Math.random() * 80 + 30,
        height: Math.random() * 40 + 15,
        rotation: Math.random() * 60 - 30,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 2 + 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.02;

      const chaos = 1 - progress;

      elements.forEach((el) => {
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(((el.rotation * chaos) * Math.PI) / 180);

        // Jitter based on chaos level
        const jitterX = Math.sin(time * el.speed + el.phase) * 5 * chaos;
        const jitterY = Math.cos(time * el.speed + el.phase) * 5 * chaos;

        // Blurred/glitchy rectangles
        ctx.fillStyle = `rgba(100, 116, 139, ${el.opacity * chaos})`;
        ctx.fillRect(jitterX - el.width / 2, jitterY - el.height / 2, el.width, el.height);

        // Glitch lines
        if (chaos > 0.3) {
          ctx.strokeStyle = `rgba(239, 68, 68, ${0.3 * chaos})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(jitterX - el.width / 2, jitterY);
          ctx.lineTo(jitterX + el.width / 2, jitterY + (Math.random() - 0.5) * 10);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Flickering numbers
      if (chaos > 0.2) {
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillStyle = `rgba(148, 163, 184, ${0.4 * chaos})`;
        for (let i = 0; i < 15 * chaos; i++) {
          const num = (Math.random() * 1000).toFixed(2);
          ctx.fillText(
            num,
            Math.random() * canvas.offsetWidth,
            Math.random() * canvas.offsetHeight
          );
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: `blur(${(1 - progress) * 2}px)` }}
    />
  );
}

// Clean coherent visualization (right side)
function CoherentDataVisual({ progress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resize();

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.01;

      const clarity = progress;
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;

      // Clean grid
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * clarity})`;
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.offsetHeight);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.offsetWidth, y);
        ctx.stroke();
      }

      // Central coherent signal
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.6 * clarity})`;
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.offsetWidth; x += 2) {
        const y = centerY + Math.sin((x / canvas.offsetWidth) * Math.PI * 4 + time * 2) * 30 * clarity;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glow effect
      ctx.shadowBlur = 20 * clarity;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';

      // Central node
      const pulseSize = 8 + Math.sin(time * 2) * 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize * clarity, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${0.8 * clarity})`;
      ctx.fill();

      // Concentric rings
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30 * i * clarity, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 255, ${(0.3 / i) * clarity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

// Animated divider line
function DividerLine({ progress }) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
        style={{
          opacity: 0.3 + progress * 0.4,
          boxShadow: `0 0 ${20 + progress * 20}px rgba(0, 255, 255, ${0.3 + progress * 0.3})`,
        }}
      />
      {/* Moving pulse */}
      <div
        className="absolute w-full h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
        style={{
          animation: 'scan-line 4s linear infinite',
          opacity: 0.6,
        }}
      />
    </div>
  );
}

export default function DivideFold() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionProgress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
      setProgress(sectionProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#07090c] to-[#0b0f14]" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0, 255, 255, 0.03) 0%, transparent 60%)',
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
          <span className="text-cyan-400/70 text-sm font-mono tracking-wider">02 / THE DIVIDE</span>
        </div>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 max-w-4xl transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          The divide is no longer access.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            It's coherence.
          </span>
        </h2>

        {/* Split screen visualization */}
        <div
          className={`relative mt-16 h-80 rounded-sm overflow-hidden border border-slate-800/50 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: Chaos */}
          <div className="absolute left-0 top-0 w-1/2 h-full bg-slate-900/50">
            <ChaoticDataVisual progress={progress} />
            <div className="absolute bottom-4 left-4 z-10">
              <span
                className="text-slate-500 text-sm font-mono transition-opacity duration-500"
                style={{ opacity: 1 - progress }}
              >
                FRAGMENTED
              </span>
            </div>
          </div>

          {/* Right: Coherent */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#07090c]">
            <CoherentDataVisual progress={progress} />
            <div className="absolute bottom-4 right-4 z-10">
              <span
                className="text-cyan-400/80 text-sm font-mono transition-opacity duration-500"
                style={{ opacity: progress }}
              >
                COHERENT
              </span>
            </div>
          </div>

          {/* Divider */}
          <DividerLine progress={progress} />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          {/* Left: explanation */}
          <div className="space-y-8">
            {[
              {
                title: 'The fragmentation problem',
                text: 'Modern markets generate signals across hundreds of venues, jurisdictions, and asset classes. Access is no longer the constraint — the challenge is making sense of it all.',
              },
              {
                title: 'Noise versus signal',
                text: 'Institutional teams spend more time reconciling conflicting data than extracting insight. Disconnected feeds create blind spots. Unverified sources introduce risk.',
              },
              {
                title: 'The coherence advantage',
                text: 'Quasar unifies fragmented streams into a single, verified surface. Not more data — better data. Aligned, contextualized, and auditable.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`space-y-4 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <h3 className="text-xl text-slate-200 font-medium">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Right: visual metaphor */}
          <div
            className={`flex items-center justify-center transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative w-full max-w-sm">
              {/* Transformation visual */}
              <div className="flex items-center justify-between">
                {/* Scattered fragments */}
                <div className="relative w-24 h-24">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-slate-700/40 border border-slate-600/30 transition-all duration-700"
                      style={{
                        width: `${15 + Math.random() * 20}px`,
                        height: `${10 + Math.random() * 15}px`,
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        transform: `rotate(${(1 - progress) * (Math.random() * 30 - 15)}deg) scale(${1 - progress * 0.3})`,
                        opacity: 0.3 + (1 - progress) * 0.4,
                      }}
                    />
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex-1 flex justify-center">
                  <svg width="80" height="24" viewBox="0 0 80 24" className="overflow-visible">
                    <defs>
                      <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(100, 116, 139, 0.3)" />
                        <stop offset="100%" stopColor="rgba(0, 255, 255, 0.8)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 12 L60 12 M50 4 L64 12 L50 20"
                      stroke="url(#arrowGrad)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 100,
                        strokeDashoffset: 100 - progress * 100,
                        transition: 'stroke-dashoffset 0.5s ease-out',
                      }}
                    />
                  </svg>
                </div>

                {/* Unified signal */}
                <div
                  className="relative w-24 h-24 flex items-center justify-center transition-all duration-700"
                  style={{
                    opacity: 0.3 + progress * 0.7,
                    transform: `scale(${0.8 + progress * 0.2})`,
                  }}
                >
                  <div className="absolute w-20 h-20 border border-cyan-400/30" />
                  <div className="absolute w-14 h-14 border border-cyan-400/50" />
                  <div className="absolute w-8 h-8 border border-cyan-400/70" />
                  <div
                    className="w-3 h-3 bg-cyan-400 rounded-full"
                    style={{
                      boxShadow: `0 0 ${10 + progress * 20}px rgba(0, 255, 255, ${0.3 + progress * 0.4})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-slate-800/30">
          {[
            { value: '200+', label: 'Data Sources Normalized' },
            { value: '< 50ms', label: 'Reconciliation Latency' },
            { value: '99.97%', label: 'Signal Verification Rate' },
            { value: '24/7', label: 'Continuous Monitoring' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`text-center md:text-left transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-light text-white mb-2 font-mono">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
