'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Free Trial',
    price: '$0',
    period: '7 days',
    audience: 'New traders exploring the platform',
    description: 'Get started with full access. No credit card required.',
    features: [
      'Full platform access for 7 days',
      'No credit card required',
      'No hidden fees or obligations',
      'Cancel anytime',
    ],
    highlight: false,
    cta: 'Start Free Trial',
  },
  {
    name: 'Monthly',
    price: '$14.99',
    period: 'per month',
    audience: 'Active traders who want flexibility',
    description: 'Full access to all AI tools and features. Cancel anytime.',
    features: [
      'Unlimited AI research',
      'Real-time market data',
      'Advanced charting tools',
      'Priority support',
    ],
    highlight: true,
    cta: 'Get Started',
  },
  {
    name: 'Annual',
    price: '$149.99',
    period: 'per year',
    audience: 'Committed traders saving $30/year',
    description: 'Everything in Monthly, billed annually. Best value.',
    features: [
      'Everything in Monthly',
      'Save $30 per year',
      'Lock in current pricing',
      'Priority support',
    ],
    highlight: false,
    cta: 'Get Started',
    badge: 'SAVE $30',
  },
];

// Tier card component with 3D hover effect
function TierCard({ tier, index, isVisible, totalCards }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: isVisible
          ? `translateY(${isHovered ? -8 : 0}px)`
          : 'translateY(40px)',
        zIndex: isHovered ? 10 : totalCards - index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative p-8 border transition-all duration-500 h-full flex flex-col ${
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

        {/* Badge */}
        {tier.highlight && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#07090c] border border-cyan-400/40 text-cyan-400 text-xs font-mono">
            RECOMMENDED
          </div>
        )}
        {tier.badge && !tier.highlight && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#07090c] border border-teal-400/40 text-teal-400 text-xs font-mono">
            {tier.badge}
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <h3
            className={`text-3xl font-medium mb-1 transition-colors duration-300 ${
              tier.highlight ? 'text-cyan-400' : isHovered ? 'text-white' : 'text-slate-200'
            }`}
          >
            {tier.price}
            <span className="text-base font-normal text-slate-500 ml-2">/ {tier.period}</span>
          </h3>
          <p className="text-lg text-white font-medium">{tier.name}</p>
        </div>

        {/* Audience */}
        <p className="text-sm text-slate-500 mb-4">{tier.audience}</p>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {tier.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {tier.features.map((feature, j) => (
            <li
              key={j}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                isHovered ? 'translate-x-1' : 'translate-x-0'
              }`}
              style={{ transitionDelay: `${j * 50}ms` }}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  tier.highlight ? 'bg-cyan-400/20' : isHovered ? 'bg-cyan-400/10' : 'bg-slate-800/50'
                }`}
              >
                <Check
                  className={`w-3 h-3 transition-colors duration-300 ${
                    tier.highlight ? 'text-cyan-400' : isHovered ? 'text-cyan-400/80' : 'text-slate-500'
                  }`}
                  strokeWidth={2}
                />
              </div>
              <span className={`transition-colors duration-300 ${isHovered ? 'text-slate-300' : 'text-slate-400'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          className={`w-full py-3 px-6 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-6 ${
            tier.highlight
              ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]'
              : 'border border-slate-600/50 text-white hover:border-cyan-400/50 hover:bg-cyan-400/5'
          }`}
        >
          {tier.cta}
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={2} />
        </button>

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
    <section id="pricing" ref={sectionRef} className="relative py-32 overflow-hidden noise-overlay">
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

        {/* Tiers grid */}
        <div className="grid md:grid-cols-3 gap-6">
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
