'use client';

import React, { useState } from 'react';

// ---- Static data ----
const OVERVIEW = [
  { label: 'Total Followers', value: '12.4K', change: '+8.2%', positive: true },
  { label: 'Total Engagement', value: '3,891', change: '+14.5%', positive: true },
  { label: 'Engagement Rate', value: '4.7%', change: '+0.3%', positive: true },
  { label: 'Posts Published', value: '28', change: '+4', positive: true },
];

const PLATFORM_STATS = [
  {
    platform: 'twitter',
    name: 'Twitter / X',
    followers: '5.2K',
    growth: '+6.1%',
    metrics: [
      { label: 'Likes', value: '1,204' },
      { label: 'Retweets', value: '312' },
      { label: 'Replies', value: '89' },
      { label: 'Impressions', value: '42.1K' },
    ],
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.2)',
  },
  {
    platform: 'linkedin',
    name: 'LinkedIn',
    followers: '4.8K',
    growth: '+9.4%',
    metrics: [
      { label: 'Likes', value: '891' },
      { label: 'Shares', value: '147' },
      { label: 'Comments', value: '203' },
      { label: 'Impressions', value: '31.7K' },
    ],
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.08)',
    border: 'rgba(10,102,194,0.2)',
  },
  {
    platform: 'instagram',
    name: 'Instagram',
    followers: '2.4K',
    growth: '+12.3%',
    metrics: [
      { label: 'Likes', value: '2,187' },
      { label: 'Saves', value: '412' },
      { label: 'Comments', value: '156' },
      { label: 'Impressions', value: '18.4K' },
    ],
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.08)',
    border: 'rgba(225,48,108,0.2)',
  },
];

const CHART_DATA = [
  { day: 'Mon', twitter: 120, linkedin: 80, instagram: 60 },
  { day: 'Tue', twitter: 200, linkedin: 140, instagram: 90 },
  { day: 'Wed', twitter: 150, linkedin: 100, instagram: 110 },
  { day: 'Thu', twitter: 310, linkedin: 220, instagram: 180 },
  { day: 'Fri', twitter: 280, linkedin: 180, instagram: 140 },
  { day: 'Sat', twitter: 190, linkedin: 120, instagram: 200 },
  { day: 'Sun', twitter: 240, linkedin: 160, instagram: 170 },
];

const TOP_POSTS = [
  {
    platform: 'twitter',
    content: 'Excited to announce our new feature that makes social media scheduling 10x faster. Built with AI at the core. 🚀',
    likes: 847,
    comments: 132,
    shares: 214,
    impressions: '12.4K',
  },
  {
    platform: 'linkedin',
    content: 'The future of content creation is AI-assisted, not AI-replaced. Here\'s why human creativity still wins in the age of automation.',
    likes: 612,
    comments: 89,
    shares: 147,
    impressions: '8.7K',
  },
  {
    platform: 'instagram',
    content: 'Behind the scenes of how our team builds in public and why radical transparency drives growth 👀',
    likes: 1204,
    comments: 67,
    shares: 89,
    impressions: '6.2K',
  },
];

const BEST_TIMES = [
  { hour: '9 AM', value: 82 },
  { hour: '12 PM', value: 91 },
  { hour: '3 PM', value: 74 },
  { hour: '6 PM', value: 88 },
  { hour: '9 PM', value: 65 },
];

// ---- Platform icons ----
const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="ig-analytics" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#833AB4" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-analytics)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const PlatformIcon = ({ platform, size = 16 }: { platform: string; size?: number }) => {
  if (platform === 'twitter') return <TwitterIcon size={size} />;
  if (platform === 'linkedin') return <LinkedInIcon size={size} />;
  if (platform === 'instagram') return <InstagramIcon size={size} />;
  return null;
};

const platformColor = (p: string) =>
  p === 'twitter' ? '#38BDF8' : p === 'linkedin' ? '#60A5FA' : '#F472B6';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('Last 30 days');

  const maxVal = Math.max(...CHART_DATA.flatMap(d => [d.twitter, d.linkedin, d.instagram]));

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Track your social media performance across all platforms</p>
        </div>
        <select
          className="input"
          value={dateRange}
          onChange={e => setDateRange(e.target.value)}
          style={{ width: 'auto', padding: '7px 12px' }}
        >
          {['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'].map(r => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {OVERVIEW.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.positive ? 'positive' : 'negative'}`}>
              {s.positive ? '↑' : '↓'} {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Platform Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {PLATFORM_STATS.map(p => (
          <div key={p.platform} className="card">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: p.bg,
                border: `1px solid ${p.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.color,
              }}>
                <PlatformIcon platform={p.platform} size={20} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {p.followers} followers{' '}
                  <span style={{ color: '#34D399' }}>{p.growth}</span>
                </div>
              </div>
            </div>
            {/* Metrics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {p.metrics.map(m => (
                <div key={m.label} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Best Times */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 24 }}>
        {/* Bar Chart */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 className="section-title" style={{ margin: 0 }}>Engagement This Week</h2>
            <div style={{ display: 'flex', gap: 16 }}>
              {[
                { label: 'Twitter', color: '#38BDF8' },
                { label: 'LinkedIn', color: '#60A5FA' },
                { label: 'Instagram', color: '#F472B6' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180, paddingBottom: 28, position: 'relative' }}>
            {/* Y-axis line */}
            <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, height: 1, background: 'var(--bg-border)' }} />
            {CHART_DATA.map(d => (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 152 }}>
                  {[
                    { val: d.twitter, color: '#38BDF8' },
                    { val: d.linkedin, color: '#60A5FA' },
                    { val: d.instagram, color: '#F472B6' },
                  ].map((b, i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: Math.max(4, (b.val / maxVal) * 152),
                        background: b.color,
                        borderRadius: '2px 2px 0 0',
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Times */}
        <div className="card">
          <h2 className="section-title">Best Times to Post</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Based on your audience engagement patterns</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BEST_TIMES.map(t => (
              <div key={t.hour}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 5 }}>
                  <span>{t.hour}</span>
                  <span style={{ color: 'var(--text-primary)' }}>{t.value}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-border)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${t.value}%`,
                    background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
                    borderRadius: 3,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="card">
        <h2 className="section-title" style={{ marginBottom: 16 }}>Top Performing Posts</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {TOP_POSTS.map((post, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 0',
              borderBottom: i < TOP_POSTS.length - 1 ? '1px solid var(--bg-border-subtle)' : 'none',
            }}>
              {/* Rank */}
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--text-faint)', flexShrink: 0 }}>
                {i + 1}
              </div>
              {/* Platform */}
              <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                background: post.platform === 'twitter' ? 'rgba(14,165,233,0.1)' : post.platform === 'linkedin' ? 'rgba(10,102,194,0.1)' : 'rgba(225,48,108,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: platformColor(post.platform),
              }}>
                <PlatformIcon platform={post.platform} size={17} />
              </div>
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginBottom: 6,
                }}>
                  {post.content}
                </p>
                <div style={{ display: 'flex', gap: 16 }}>
                  {[
                    { icon: '♥', val: post.likes },
                    { icon: '💬', val: post.comments },
                    { icon: '↗', val: post.shares },
                    { icon: '👁', val: post.impressions },
                  ].map((m, j) => (
                    <span key={j} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {m.icon} {m.val}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
