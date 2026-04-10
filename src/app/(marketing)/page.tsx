'use client';

import Link from 'next/link';

// ---- Icon components ----
const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TwitterXIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const BotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <line x1="12" y1="3" x2="12" y2="7" />
    <circle cx="9" cy="16" r="1" fill="currentColor" />
    <circle cx="15" cy="16" r="1" fill="currentColor" />
  </svg>
);

const GridIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

// ---- Inline bar chart SVG ----
const BarChartSVG = () => (
  <svg width="100%" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[
      { x: 10, h: 30, opacity: 0.4 },
      { x: 35, h: 50, opacity: 0.5 },
      { x: 60, h: 40, opacity: 0.4 },
      { x: 85, h: 65, opacity: 0.7 },
      { x: 110, h: 45, opacity: 0.5 },
      { x: 135, h: 70, opacity: 0.8 },
      { x: 160, h: 55, opacity: 0.6 },
    ].map((bar, i) => (
      <rect
        key={i}
        x={bar.x}
        y={80 - bar.h}
        width="20"
        height={bar.h}
        rx="4"
        fill="#7C3AED"
        opacity={bar.opacity}
      />
    ))}
    <line x1="0" y1="79" x2="200" y2="79" stroke="#1E1E2E" strokeWidth="1" />
  </svg>
);

// ---- Mini calendar grid ----
const CalendarPreview = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const cells = [
    null, null, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
  ];
  const scheduled = [3, 8, 10, 15, 17, 22];
  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d, i) => (
          <div key={i} className="text-center text-xs text-gray-600 font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center text-xs rounded-md
              ${!day ? '' : scheduled.includes(day) ? 'bg-violet-500/20 text-violet-400 font-semibold' : 'text-gray-500 hover:bg-white/5'}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Compose card mockup ----
const ComposeMockup = () => (
  <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[340px] rounded-2xl bg-[#111118] border border-[#1E1E2E] p-4 shadow-2xl shadow-violet-900/20">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2 rounded-full bg-violet-500" />
      <span className="text-xs text-gray-400 font-medium">Compose Post</span>
      <div className="ml-auto flex gap-1.5">
        <div className="px-2 py-0.5 bg-violet-500/10 text-violet-400 text-xs rounded-md border border-violet-500/20">AI Draft</div>
      </div>
    </div>
    <div className="bg-[#0D0D14] rounded-xl p-3 mb-3 min-h-[60px]">
      <div className="h-2 bg-gray-700/50 rounded w-4/5 mb-2 animate-pulse" />
      <div className="h-2 bg-gray-700/50 rounded w-3/5 mb-2" />
      <div className="h-2 bg-gray-700/50 rounded w-2/3" />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {[
          { icon: <TwitterXIcon />, color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
          { icon: <InstagramIcon />, color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
          { icon: <LinkedInIcon />, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        ].map((p, i) => (
          <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center border ${p.color}`}>
            {p.icon}
          </div>
        ))}
      </div>
      <div className="px-3 py-1.5 bg-violet-600 rounded-lg text-white text-xs font-medium">Schedule →</div>
    </div>
  </div>
);

export default function LandingPage() {
  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/mo',
      description: 'Perfect for getting started',
      features: ['3 scheduled posts/mo', '1 social account', 'Basic analytics', 'Manual scheduling'],
      cta: 'Get started free',
      ctaStyle: 'border border-[#1E1E2E] text-gray-300 hover:border-violet-500/50 hover:text-white',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/mo',
      description: 'For serious creators',
      features: ['Unlimited posts', '5 social accounts', 'AI content generation', 'Advanced analytics', 'Priority support'],
      cta: 'Start Pro free',
      ctaStyle: 'bg-violet-600 hover:bg-violet-500 text-white',
      highlighted: true,
      badge: 'Most popular',
    },
    {
      name: 'Agency',
      price: '$49',
      period: '/mo',
      description: 'For teams and agencies',
      features: ['Everything in Pro', 'Unlimited accounts', 'Team collaboration', 'White-label reports', 'Dedicated support'],
      cta: 'Contact sales',
      ctaStyle: 'border border-[#1E1E2E] text-gray-300 hover:border-violet-500/50 hover:text-white',
      highlighted: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0F] text-white font-sans overflow-y-auto">

      {/* ---- NAVBAR ---- */}
      <nav className="fixed top-0 left-0 right-0 z-[110] border-b border-[#1E1E2E] backdrop-blur-xl bg-[#0A0A0F]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="font-semibold text-white tracking-tight text-lg">PostPilot</span>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors shadow-lg shadow-violet-900/30"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- HERO ---- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,58,237,0.10) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(90deg, #7C3AED 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-400 text-sm mb-8">
            <SparkleIcon />
            <span>Now with AI generation</span>
          </div>

          {/* H1 */}
          <h1 className="text-[64px] leading-[1.1] font-bold tracking-tight mb-6 md:text-[72px]">
            Schedule smarter.<br />
            <span className="text-violet-400">Grow faster.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            PostPilot automates your social media — plan, generate, and publish content across all platforms from one dashboard.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-base transition-all shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 hover:scale-[1.02]"
            >
              Start for free
              <ArrowRightIcon />
            </Link>
            <button className="px-6 py-3 rounded-xl border border-[#1E1E2E] text-gray-300 hover:border-violet-500/40 hover:text-white text-base transition-all">
              See how it works
            </button>
          </div>

          {/* Social proof */}
          <p className="text-sm text-gray-600">
            <span className="text-gray-400 font-medium">2,400+</span> creators growing with PostPilot
          </p>

          {/* Floating compose card */}
          <div className="relative mt-24 mb-16">
            <ComposeMockup />
          </div>
        </div>
      </section>

      {/* ---- FEATURES GRID ---- */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Everything you need to stay consistent</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">One platform that handles your entire content workflow, from idea to publish.</p>
          </div>

          {/* Asymmetric 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* LARGE CARD: AI Writing — spans 2 cols */}
            <div className="md:col-span-2 bg-[#111118] border border-[#1E1E2E] rounded-2xl p-8 hover:border-violet-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5">
                <BotIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Writing</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Generate scroll-stopping captions, hooks, and threads in seconds. Our AI learns your brand voice and style.
              </p>
              {/* Fake chat bubbles */}
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-violet-600/20 border border-violet-500/20 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                    <p className="text-sm text-violet-200">Write a LinkedIn post about our new product launch targeting founders</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#1A1A28] border border-[#2A2A3E] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[85%]">
                    <p className="text-sm text-gray-300">
                      🚀 We&apos;ve been building in silence for 6 months. Today, that changes.
                      <br /><br />
                      Introducing PostPilot — the AI that writes, schedules, and grows your audience while you focus on what matters most.
                    </p>
                    <div className="mt-2 flex gap-1.5">
                      <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">#SaaS</span>
                      <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">#Founders</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Platform Scheduling */}
            <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5">
                <CalendarIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Platform</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Publish once, reach everywhere. Schedule across all major platforms simultaneously.
              </p>
              <div className="space-y-2.5">
                {[
                  { icon: <TwitterXIcon />, name: 'Twitter / X', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
                  { icon: <InstagramIcon />, name: 'Instagram', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
                  { icon: <LinkedInIcon />, name: 'LinkedIn', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                  { icon: <TikTokIcon />, name: 'TikTok', color: 'text-gray-300 bg-white/5 border-white/10' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${p.color}`}>
                      {p.icon}
                    </div>
                    <span className="text-sm text-gray-400">{p.name}</span>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <BarChartIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Track engagement, reach, and follower growth with real-time insights.
              </p>
              <BarChartSVG />
              <div className="flex gap-4 mt-3">
                <div>
                  <div className="text-lg font-semibold text-white">+142%</div>
                  <div className="text-xs text-gray-500">Reach this mo</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-emerald-400">4.7%</div>
                  <div className="text-xs text-gray-500">Avg engagement</div>
                </div>
              </div>
            </div>

            {/* Content Calendar */}
            <div className="md:col-span-2 bg-[#111118] border border-[#1E1E2E] rounded-2xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                <GridIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Content Calendar</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-2">
                Visualize your entire content pipeline. Drag, drop, and reschedule with ease.
              </p>
              <CalendarPreview />
            </div>

          </div>
        </div>
      </section>

      {/* ---- PRICING ---- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple pricing</h2>
            <p className="text-gray-400 text-lg">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-[#111118] rounded-2xl p-8 flex flex-col transition-all
                  ${plan.highlighted
                    ? 'border-2 border-violet-500 shadow-xl shadow-violet-900/20 scale-[1.02]'
                    : 'border border-[#1E1E2E]'
                  }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <span className="text-violet-400 flex-shrink-0"><CheckIcon /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`w-full py-3 rounded-xl text-sm font-medium text-center transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="border-t border-[#1E1E2E] bg-[#0A0A0F]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-white">PostPilot</span>
            </div>
            {/* Nav links */}
            <nav className="flex flex-wrap gap-6 text-sm text-gray-500">
              {['Product', 'Pricing', 'About', 'Blog'].map((link) => (
                <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
              ))}
            </nav>
          </div>
          {/* Bottom bar */}
          <div className="mt-8 pt-8 border-t border-[#1E1E2E] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">© 2026 PostPilot. All rights reserved.</p>
            <div className="flex gap-4">
              {/* Twitter/X */}
              <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
                <TwitterXIcon />
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
                <InstagramIcon />
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
