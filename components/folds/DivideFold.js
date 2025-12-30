'use client';

import { useEffect, useRef, useState } from 'react';
import { Layers, HelpCircle, Sparkles, Users, Radio, Target, Clock } from 'lucide-react';

// AI Chat with typing animation
function AIChat() {
  const qaPairs = [
    { q: "Is $AAPL a good buy today?", a: "Bullish. RSI 58, strong volume. Entry above $185." },
    { q: "What's the outlook for $NVDA?", a: "Strong momentum. AI demand driving growth. Hold." },
    { q: "Should I sell $TSLA now?", a: "Neutral. Wait for earnings. Set stop at $240." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [phase, setPhase] = useState('typing-q');
  const [cursorOpacity, setCursorOpacity] = useState(1);
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    const currentQ = qaPairs[currentIndex].q;
    const currentA = qaPairs[currentIndex].a;
    let timeout;

    if (phase === 'typing-q') {
      if (questionText.length < currentQ.length) {
        timeout = setTimeout(() => {
          setQuestionText(currentQ.slice(0, questionText.length + 1));
        }, 60 + Math.random() * 40); // Natural typing speed variation
      } else {
        timeout = setTimeout(() => {
          setAnswerVisible(true);
          setPhase('typing-a');
        }, 500);
      }
    } else if (phase === 'typing-a') {
      if (answerText.length < currentA.length) {
        timeout = setTimeout(() => {
          setAnswerText(currentA.slice(0, answerText.length + 1));
        }, 30 + Math.random() * 25);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 2500);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('fade-out'), 800);
    } else if (phase === 'fade-out') {
      setAnswerVisible(false);
      timeout = setTimeout(() => {
        setAnswerText('');
        setQuestionText('');
        setCurrentIndex((currentIndex + 1) % qaPairs.length);
        setPhase('typing-q');
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [phase, questionText, answerText, currentIndex]);

  // Smooth cursor blink
  useEffect(() => {
    let frame;
    let start = performance.now();
    const animate = (time) => {
      const elapsed = time - start;
      const opacity = 0.3 + Math.abs(Math.sin(elapsed / 400)) * 0.7;
      setCursorOpacity(opacity);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const isTypingAnswer = phase === 'typing-a' || phase === 'pause' || phase === 'fade-out';

  return (
    <div className="absolute right-0 top-0 w-1/2 h-full bg-[#07090c] overflow-hidden flex flex-col justify-center px-5">
      <div className="space-y-3">
        {/* Question */}
        <div className="flex justify-end">
          <div
            className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 px-4 py-2.5 rounded-2xl rounded-br-sm min-h-[42px] transition-all duration-300"
            style={{
              opacity: phase === 'fade-out' ? 0 : 1,
              transform: phase === 'fade-out' ? 'translateX(10px)' : 'translateX(0)'
            }}
          >
            <span className="text-[13px] text-white">
              {questionText}
              {!isTypingAnswer && questionText.length > 0 && (
                <span className="text-slate-400 ml-[1px]" style={{ opacity: cursorOpacity }}>|</span>
              )}
            </span>
          </div>
        </div>

        {/* Answer */}
        <div
          className="flex justify-start transition-all duration-300"
          style={{
            opacity: answerVisible ? 1 : 0,
            transform: answerVisible ? 'translateY(0)' : 'translateY(8px)'
          }}
        >
          <div className="bg-gradient-to-br from-cyan-950/60 to-slate-800/50 backdrop-blur-sm border border-cyan-500/20 px-4 py-2.5 rounded-2xl rounded-bl-sm min-h-[60px]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-cyan-400/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              </div>
              <span className="text-[10px] text-cyan-400/80">Quasar AI</span>
            </div>
            <span className="text-[13px] text-slate-300">
              {answerText}
              {isTypingAnswer && answerText.length > 0 && (
                <span className="text-cyan-400 ml-[1px]" style={{ opacity: cursorOpacity }}>|</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <span className="text-cyan-400/60 text-xs font-mono tracking-wider">
          AI INSIGHTS
        </span>
      </div>
    </div>
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
          The divide is no longer information.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            It's intelligence.
          </span>
        </h2>

        {/* Split screen visualization */}
        <div
          className={`relative mt-16 h-80 rounded-sm overflow-hidden border border-slate-800/50 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: TradingView Mini Chart */}
          <div className="absolute left-0 top-0 w-1/2 h-full bg-slate-900/50 overflow-hidden">
            <iframe
              src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22NASDAQ%3AAAPL%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22dateRange%22%3A%2212M%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22autosize%22%3Atrue%2C%22largeChartUrl%22%3A%22%22%7D"
              className="absolute inset-0 w-full h-full border-0"
              style={{ pointerEvents: 'none' }}
            />
            <div className="absolute bottom-4 left-4 z-10">
              <span className="text-slate-500 text-sm font-mono">
                RAW DATA
              </span>
            </div>
          </div>

          {/* Right: Single Q&A Bubble Animation */}
          <AIChat />

          {/* Divider */}
          <DividerLine progress={progress} />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          {/* Left: explanation */}
          <div className="space-y-8">
            {[
              {
                title: 'The information overload',
                text: 'Markets move fast. News, charts, signals — everywhere you look. Most traders drown in data while missing the moves that matter.',
                icon: Layers,
              },
              {
                title: 'Guessing vs. knowing',
                text: 'Traditional trading relies on gut feelings and outdated analysis. Hours spent researching, still uncertain. The market doesn\'t wait for you to catch up.',
                icon: HelpCircle,
              },
              {
                title: 'The AI advantage',
                text: 'Quasar Markets cuts through the noise with AI-powered intelligence. Real-time insights, pattern recognition, and actionable signals — so you can spot the move and act fast.',
                icon: Sparkles,
              },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={i}
                  className={`space-y-4 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <h3 className="text-xl text-slate-200 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                      <ItemIcon className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                    </div>
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed pl-11">{item.text}</p>
                </div>
              );
            })}
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
            { value: '10K+', label: 'Active Traders', icon: Users },
            { value: 'Real-Time', label: 'Market Data', icon: Radio },
            { value: '95%', label: 'Signal Accuracy', icon: Target },
            { value: '24/7', label: 'AI Analysis', icon: Clock },
          ].map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={i}
                className={`text-center transition-all duration-700 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <div className="flex justify-center mb-2">
                  <StatIcon className="w-5 h-5 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="text-2xl md:text-3xl font-light text-white mb-2 font-mono">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
