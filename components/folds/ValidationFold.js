'use client';

import { useEffect, useRef, useState } from 'react';
import { Compass, TrendingUp, PiggyBank, Presentation, BookOpen, Users } from 'lucide-react';

const roles = [
  {
    title: 'Beginner Traders',
    description: 'Learn the fundamentals with AI guidance. Ask questions, get explanations, and build confidence before you invest.',
    useCase: 'Educational resources and guided learning paths',
    icon: Compass,
  },
  {
    title: 'Active Traders',
    description: 'Real-time signals and AI-powered research to identify opportunities faster. Stay ahead of the market.',
    useCase: 'Advanced analytics and custom alerts',
    icon: TrendingUp,
  },
  {
    title: 'Long-Term Investors',
    description: 'Deep fundamental analysis and portfolio insights. Make informed decisions for your financial future.',
    useCase: 'Portfolio tracking and performance analytics',
    icon: PiggyBank,
  },
  {
    title: 'Educators',
    description: 'Create and share courses, host webinars, and build your following. Monetize your trading expertise.',
    useCase: 'Content creation tools and community features',
    icon: Presentation,
  },
  {
    title: 'Students',
    description: 'Access world-class trading education from proven experts. Learn strategies that work in real markets.',
    useCase: 'On-demand courses and live learning sessions',
    icon: BookOpen,
  },
  {
    title: 'Community Members',
    description: 'Connect with like-minded traders. Share ideas, discuss strategies, and grow together.',
    useCase: 'Discussion forums and social trading features',
    icon: Users,
  },
];

// Awards and recognition
const awards = [
  'Best AI Research Platform 2024', 'Fintech Startup of the Year', 'AI Startup of the Year', 'NASDAQ Compliant', 'OPRA Licensed'
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
        {/* Double the awards for seamless loop */}
        {[...awards, ...awards].map((award, i) => (
          <div
            key={i}
            className="group flex items-center justify-center px-8 py-4 transition-all duration-500"
          >
            <span className="text-slate-700 text-sm font-mono tracking-widest group-hover:text-cyan-400 transition-colors duration-500">
              {award}
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
  const Icon = role.icon;

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

      {/* Icon */}
      <div
        className={`w-10 h-10 mb-4 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'bg-cyan-400/20' : 'bg-slate-800/50'
        }`}
      >
        <Icon className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-cyan-400' : 'text-slate-500'}`} strokeWidth={1.5} />
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
    <section id="who-its-for" ref={sectionRef} className="relative py-32 overflow-hidden noise-overlay">
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
          <span className="text-cyan-400/70 text-sm font-mono tracking-wider">06 / WHO IT'S FOR</span>
        </div>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 max-w-4xl transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Learn. Trade.
          <br />
          <span className="text-slate-500">Empower.</span>
        </h2>

        <p
          className={`text-slate-500 text-lg max-w-2xl mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Whether you're just starting or you're a seasoned pro, Quasar Markets has the tools
          and community to help you succeed.
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
            Join thousands of traders who are investing <span className="text-cyan-400">smarter, not harder</span>.
          </p>
          <p className="text-slate-700 text-sm mt-2">
            Start your free trial today and see the difference AI makes.
          </p>
        </div>
      </div>
    </section>
  );
}
