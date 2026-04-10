'use client';

import React, { useState, useMemo } from 'react';

// ---- Static posts (assigned to day-of-week offsets from Monday) ----
// dayOffset: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
const STATIC_POSTS = [
  {
    id: '1',
    dayOffset: 0,
    time: '9:00 AM',
    platforms: ['twitter'],
    content: 'Monday motivation: The best time to post is now. Consistency beats perfection every time.',
    status: 'scheduled',
  },
  {
    id: '2',
    dayOffset: 0,
    time: '5:00 PM',
    platforms: ['linkedin'],
    content: 'Thought leadership: How AI is transforming content creation without replacing the human voice.',
    status: 'scheduled',
  },
  {
    id: '3',
    dayOffset: 1,
    time: '12:00 PM',
    platforms: ['twitter', 'linkedin'],
    content: 'New feature alert 🚀 Our AI content generator now supports multi-platform formatting. Try it free.',
    status: 'scheduled',
  },
  {
    id: '4',
    dayOffset: 2,
    time: '10:00 AM',
    platforms: ['instagram'],
    content: 'Behind the scenes: Building in public means showing the messy middle, not just the shiny results.',
    status: 'draft',
  },
  {
    id: '5',
    dayOffset: 3,
    time: '2:00 PM',
    platforms: ['twitter'],
    content: 'Quick tip: Schedule your posts during peak hours (9am, 12pm, 5pm) to maximize reach.',
    status: 'scheduled',
  },
  {
    id: '6',
    dayOffset: 4,
    time: '11:00 AM',
    platforms: ['linkedin'],
    content: 'Weekly roundup: 5 content trends every creator should know heading into next week.',
    status: 'scheduled',
  },
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ---- Platform icons ----
const TwitterIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="ig-sched" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#833AB4" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-sched)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const PlatformDot = ({ platform }: { platform: string }) => {
  const bg = platform === 'twitter' ? 'rgba(14,165,233,0.15)' : platform === 'linkedin' ? 'rgba(10,102,194,0.15)' : 'rgba(225,48,108,0.15)';
  const color = platform === 'twitter' ? '#38BDF8' : platform === 'linkedin' ? '#60A5FA' : '#F472B6';
  return (
    <div style={{ width: 20, height: 20, borderRadius: 5, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
      {platform === 'twitter' && <TwitterIcon size={11} />}
      {platform === 'linkedin' && <LinkedInIcon size={11} />}
      {platform === 'instagram' && <InstagramIcon size={11} />}
    </div>
  );
};

export default function SchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeView, setActiveView] = useState<'week' | 'month'>('week');
  const [activePlatforms, setActivePlatforms] = useState(['twitter', 'linkedin', 'instagram']);

  // Build week dates from Monday
  const weekDates = useMemo(() => {
    const today = new Date();
    const dow = today.getDay(); // 0=Sun, 1=Mon...
    const diffToMon = dow === 0 ? -6 : 1 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMon + weekOffset * 7);
    monday.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [weekOffset]);

  const isToday = (d: Date) => {
    const t = new Date();
    return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  };

  const formatRange = () => {
    const s = weekDates[0];
    const e = weekDates[6];
    const sm = s.toLocaleString('en-US', { month: 'long' });
    const em = e.toLocaleString('en-US', { month: 'long' });
    const y = e.getFullYear();
    if (sm === em) return `${sm} ${s.getDate()} – ${e.getDate()}, ${y}`;
    return `${sm} ${s.getDate()} – ${em} ${e.getDate()}, ${y}`;
  };

  const togglePlatform = (p: string) =>
    setActivePlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const filteredPosts = STATIC_POSTS.filter(p => p.platforms.some(pl => activePlatforms.includes(pl)));

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 className="page-title">Schedule</h1>
          <p className="page-subtitle">Plan and manage your content calendar</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {/* View toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 8, overflow: 'hidden' }}>
            {(['week', 'month'] as const).map(v => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                style={{
                  padding: '6px 14px',
                  fontSize: 13,
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeView === v ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: activeView === v ? '#A78BFA' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                  textTransform: 'capitalize',
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="btn-primary" style={{ gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="4" x2="12" y2="20" /><line x1="4" y1="12" x2="20" y2="12" />
            </svg>
            Create Post
          </button>
        </div>
      </div>

      {/* Calendar Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[{ dir: -1, path: 'M15 19l-7-7 7-7' }, { dir: 1, path: 'M9 5l7 7-7 7' }].map(({ dir, path }) => (
              <button
                key={dir}
                onClick={() => setWeekOffset(w => w + dir)}
                style={{
                  width: 30, height: 30, borderRadius: 7, border: '1px solid var(--bg-border)',
                  background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--text-muted)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={path} />
                </svg>
              </button>
            ))}
          </div>
          <button
            onClick={() => setWeekOffset(0)}
            style={{
              padding: '4px 10px', borderRadius: 7, border: '1px solid var(--bg-border)',
              background: 'transparent', cursor: 'pointer', fontSize: 12, fontWeight: 500,
              color: 'var(--text-muted)', fontFamily: 'inherit',
            }}
          >
            Today
          </button>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{formatRange()}</span>
        </div>

        {/* Platform filters */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'twitter', color: '#38BDF8', bg: 'rgba(14,165,233,0.1)' },
            { id: 'linkedin', color: '#60A5FA', bg: 'rgba(10,102,194,0.1)' },
            { id: 'instagram', color: '#F472B6', bg: 'rgba(225,48,108,0.1)' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => togglePlatform(p.id)}
              style={{
                width: 32, height: 32, borderRadius: 8, border: '1px solid',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: activePlatforms.includes(p.id) ? p.bg : 'transparent',
                borderColor: activePlatforms.includes(p.id) ? p.color + '60' : 'var(--bg-border)',
                color: activePlatforms.includes(p.id) ? p.color : 'var(--text-muted)',
                opacity: activePlatforms.includes(p.id) ? 1 : 0.5,
                transition: 'all 0.15s',
              }}
            >
              {p.id === 'twitter' && <TwitterIcon size={13} />}
              {p.id === 'linkedin' && <LinkedInIcon size={13} />}
              {p.id === 'instagram' && <InstagramIcon size={13} />}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 12, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--bg-border)' }}>
          {weekDates.map((date, i) => (
            <div
              key={i}
              style={{
                padding: '12px 8px',
                textAlign: 'center',
                borderRight: i < 6 ? '1px solid var(--bg-border)' : 'none',
                background: isToday(date) ? 'rgba(124,58,237,0.06)' : 'transparent',
              }}
            >
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {DAY_NAMES[i]}
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', margin: '0 auto',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: isToday(date) ? 700 : 500,
                background: isToday(date) ? '#7C3AED' : 'transparent',
                color: isToday(date) ? 'white' : 'var(--text-primary)',
              }}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', minHeight: 400 }}>
          {weekDates.map((date, dayIdx) => {
            const dayPosts = filteredPosts.filter(p => p.dayOffset === dayIdx);
            const today = isToday(date);
            return (
              <div
                key={dayIdx}
                style={{
                  borderRight: dayIdx < 6 ? '1px solid var(--bg-border)' : 'none',
                  padding: '10px 8px',
                  minHeight: 400,
                  background: today ? 'rgba(124,58,237,0.02)' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {dayPosts.map(post => (
                    <div
                      key={post.id}
                      style={{
                        background: post.status === 'scheduled' ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${post.status === 'scheduled' ? 'rgba(124,58,237,0.2)' : 'var(--bg-border)'}`,
                        borderRadius: 7,
                        padding: '7px 8px',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s',
                      }}
                    >
                      <div style={{ fontSize: 11, color: '#A78BFA', fontWeight: 600, marginBottom: 4 }}>
                        {post.time}
                      </div>
                      <p style={{
                        fontSize: 11.5,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: 6,
                      }}>
                        {post.content}
                      </p>
                      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        {post.platforms.map(p => (
                          <PlatformDot key={p} platform={p} />
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Add post slot */}
                  <button style={{
                    width: '100%',
                    padding: '6px 0',
                    border: '1px dashed var(--bg-border)',
                    borderRadius: 7,
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 11,
                    color: 'var(--text-faint)',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="4" x2="12" y2="20" /><line x1="4" y1="12" x2="20" y2="12" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
