'use client';

import { useEffect, useRef, useState } from 'react';

const tiers = [
  {
    name: 'Free',
    audience: 'New traders exploring the platform',
    description: 'Get started with basic features. Perfect for learning and trying out the platform risk-free.',
    features: [
      '7-day full access trial',
      'Basic market data',
      'Limited AI queries',
      'Community access',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    audience: 'Active traders and investors',
    description: 'Everything you need to trade smarter. Full access to AI research, real-time data, and learning content.',
    features: [
      'Unlimited AI research',
      'Real-time market data',
      'Advanced charting tools',
      'All courses & webinars',
      'Priority support',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    audience: 'Teams, educators, and institutions',
    description: 'Custom solutions for organizations. White-label options, API access, and dedicated account management.',
    features: [
      'Everything in Pro',
      'Team management',
      'API access',
      'White-label options',
      'Dedicated account manager',
    ],
    highlight: false,
  },
];

// 3D Tier card component
function TierCard({ tier, index, isVisible, totalCards }) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate 3D stacking position
  const zOffset = (totalCards - 1 - index) * 20;
  const yOffset = (totalCards - 1 - index) * 10;

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: isVisible
          ? `translateY(${isHovered ? -8 : 0}px) translateZ(${isHovered ? 20 : 0}px)`
          : 'translateY(40px)',
        zIndex: isHovered ? 10 : totalCards - index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative p-8 border transition-all duration-500 ${
          tier.highlight
            ? 'bg-gradient-to-b from-cyan-400/5 to-transparent border-cyan-400/30'
            : 'bg-slate-900/30 border-slate-800/50'
        } ${isHovered ? (tier.highlight ? 'border-cyan-400/50' : 'border-slate-700') : ''}`}
        style={{
          boxShadow: isHovered
            ? tier.highlight
              ? '0 20px 60px rgba(0, 255, 255, 0.15), 0 0 40px rgba(0, 255, 255, 0.1)'
              : '0 20px 60px rgba(0, 0, 0, 0.4)'
            : 'none',
        }}
      >
        {/* Highlight glow line */}
        {tier.highlight && (
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0.6 }}
          />
        )}

        {/* Tier badge for highlighted */}
        {tier.highlight && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#07090c] border border-cyan-400/40 text-cyan-400 text-xs font-mono">
            RECOMMENDED
          </div>
        )}

        {/* Tier name */}
        <h3
          className={`text-2xl font-medium mb-2 transition-colors duration-300 ${
            tier.highlight ? 'text-cyan-400' : isHovered ? 'text-white' : 'text-slate-200'
          }`}
        >
          {tier.name}
        </h3>

        {/* Audience */}
        <p className="text-sm text-slate-500 mb-6">{tier.audience}</p>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          {tier.description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {tier.features.map((feature, j) => (
            <li
              key={j}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                isHovered ? 'translate-x-1' : 'translate-x-0'
              }`}
              style={{ transitionDelay: `${j * 50}ms` }}
            >
              <div
                className={`w-1.5 h-1.5 transition-colors duration-300 ${
                  tier.highlight ? 'bg-cyan-400' : isHovered ? 'bg-cyan-400/60' : 'bg-slate-600'
                }`}
              />
              <span className={`transition-colors duration-300 ${isHovered ? 'text-slate-300' : 'text-slate-400'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Decorative corner */}
        <div
          className={`absolute bottom-0 right-0 w-12 h-12 border-b border-r transition-all duration-300 ${
            tier.highlight
              ? 'border-cyan-400/30'
              : isHovered
              ? 'border-slate-700'
              : 'border-slate-800/50'
          }`}
        />
      </div>
    </div>
  );
}

export default function AccessTiersFold() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#07090c] to-[#0b0f14]" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 60%, rgba(0, 255, 255, 0.03) 0%, transparent 60%)',
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
          <span className="text-cyan-400/70 text-sm font-mono tracking-wider">08 / PRICING</span>
        </div>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 max-w-4xl transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Simple, transparent
          <br />
          <span className="text-slate-500">pricing.</span>
        </h2>

        <p
          className={`text-slate-500 text-lg max-w-2xl mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Start free and upgrade when you're ready. No hidden fees. Cancel anytime.
        </p>

        {/* Tiers grid with 3D perspective */}
        <div className="perspective-container">
          <div className="grid md:grid-cols-3 gap-6 preserve-3d">
            {tiers.map((tier, i) => (
              <TierCard
                key={i}
                tier={tier}
                index={i}
                isVisible={isVisible}
                totalCards={tiers.length}
              />
            ))}
          </div>
        </div>

        {/* Note */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-slate-600 text-sm">
            All plans include access to our community and basic educational resources.
          </p>
          <p className="text-slate-700 text-xs mt-2">
            Need a custom plan? Contact us for enterprise solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
