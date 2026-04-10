'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// ---- Static mock data ----
const STATS = [
  { label: 'Scheduled', value: '5', sub: '2 today' },
  { label: 'Published', value: '28', sub: 'this month' },
  { label: 'Engagement', value: '1.2K', sub: '+12% vs last week', positive: true },
  { label: 'AI Credits', value: '847', sub: '153 used this month' },
];

const UPCOMING_POSTS = [
  {
    id: '1',
    day: 'Today',
    time: '2:00 PM',
    platforms: ['twitter'],
    content: 'Excited to announce our new feature that makes social media scheduling 10x faster. Built with AI at the core.',
    status: 'scheduled',
    isAi: true,
  },
  {
    id: '2',
    day: 'Today',
    time: '5:30 PM',
    platforms: ['linkedin'],
    content: 'Thought leadership post: The future of content creation is AI-assisted, not AI-replaced. Here\'s why human creativity still wins.',
    status: 'scheduled',
    isAi: false,
  },
  {
    id: '3',
    day: 'Tomorrow',
    time: '9:00 AM',
    platforms: ['twitter', 'linkedin'],
    content: 'Weekly tips thread: 5 ways to increase engagement on your posts without spending more time online.',
    status: 'scheduled',
    isAi: true,
  },
  {
    id: '4',
    day: 'Wed',
    time: '11:00 AM',
    platforms: ['instagram'],
    content: 'Behind the scenes of how our team builds in public and why radical transparency drives growth.',
    status: 'draft',
    isAi: false,
  },
];

const ACTIVITY = [
  { id: '1', type: 'success', message: 'Post published to Twitter', time: '2 hours ago' },
  { id: '2', type: 'info', message: 'AI generated 3 new posts', time: '5 hours ago' },
  { id: '3', type: 'success', message: 'LinkedIn account connected', time: 'Yesterday' },
  { id: '4', type: 'info', message: 'Analytics report ready', time: 'Yesterday' },
];

const PLATFORMS = [
  { id: 'twitter', label: 'Twitter/X', limit: 280, color: '#0EA5E9' },
  { id: 'linkedin', label: 'LinkedIn', limit: 3000, color: '#0A66C2' },
  { id: 'instagram', label: 'Instagram', limit: 2200, color: '#E1306C' },
];

// ---- Platform icon components ----
const TwitterIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="ig-dash" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#833AB4" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-dash)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const PlatformIcon = ({ platform, size = 14 }: { platform: string; size?: number }) => {
  if (platform === 'twitter') return <TwitterIcon size={size} />;
  if (platform === 'linkedin') return <LinkedInIcon size={size} />;
  if (platform === 'instagram') return <InstagramIcon size={size} />;
  return null;
};

export default function Dashboard() {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter']);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [publishMode, setPublishMode] = useState<'schedule' | 'now'>('schedule');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const activeLimit = Math.min(...selectedPlatforms.map(p => PLATFORMS.find(pl => pl.id === p)?.limit ?? 280));
  const remaining = activeLimit - content.length;
  const overLimit = remaining < 0;
  const nearLimit = remaining < 30 && !overLimit;

  const togglePlatform = (pid: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(pid) ? prev.filter(p => p !== pid) : [...prev, pid]
    );
  };

  const handleSubmit = () => {
    if (!content.trim() || overLimit) return;
    setSubmitted(true);
    setContent('');
    setScheduleDate('');
    setScheduleTime('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 className="page-title">{greeting}, TechCorp!</h1>
          <p className="page-subtitle">You have 5 posts scheduled. Keep up the great work!</p>
        </div>
        <button className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="4" x2="12" y2="20" /><line x1="4" y1="12" x2="20" y2="12" />
          </svg>
          New Post
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.positive ? 'positive' : ''}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>

        {/* Left: Compose + Upcoming */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Compose Card */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 className="section-title" style={{ margin: 0 }}>Compose Post</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => setPublishMode('now')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 500,
                    border: '1px solid',
                    cursor: 'pointer',
                    background: publishMode === 'now' ? 'rgba(124,58,237,0.15)' : 'transparent',
                    borderColor: publishMode === 'now' ? 'rgba(124,58,237,0.4)' : 'var(--bg-border)',
                    color: publishMode === 'now' ? '#A78BFA' : 'var(--text-muted)',
                  }}
                >
                  Publish Now
                </button>
                <button
                  onClick={() => setPublishMode('schedule')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 500,
                    border: '1px solid',
                    cursor: 'pointer',
                    background: publishMode === 'schedule' ? 'rgba(124,58,237,0.15)' : 'transparent',
                    borderColor: publishMode === 'schedule' ? 'rgba(124,58,237,0.4)' : 'var(--bg-border)',
                    color: publishMode === 'schedule' ? '#A78BFA' : 'var(--text-muted)',
                  }}
                >
                  Schedule
                </button>
              </div>
            </div>

            {/* Platform toggles */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 10px',
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 500,
                    border: '1px solid',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    background: selectedPlatforms.includes(p.id) ? 'rgba(124,58,237,0.12)' : 'transparent',
                    borderColor: selectedPlatforms.includes(p.id) ? 'rgba(124,58,237,0.35)' : 'var(--bg-border)',
                    color: selectedPlatforms.includes(p.id) ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}
                >
                  <PlatformIcon platform={p.id} size={13} />
                  {p.label}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <textarea
                className="input"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="What do you want to share today?"
                rows={4}
                style={{
                  resize: 'none',
                  lineHeight: 1.6,
                  paddingBottom: 32,
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 10,
                right: 12,
                fontSize: 12,
                fontWeight: 500,
                color: overLimit ? '#F87171' : nearLimit ? '#FBBF24' : 'var(--text-faint)',
              }}>
                {remaining}
              </div>
            </div>

            {/* Date/Time (only in schedule mode) */}
            {publishMode === 'schedule' && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <input
                  type="date"
                  className="input"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                  style={{ flex: 1 }}
                />
                <input
                  type="time"
                  className="input"
                  value={scheduleTime}
                  onChange={e => setScheduleTime(e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={!content.trim() || overLimit || selectedPlatforms.length === 0}
                style={{ opacity: (!content.trim() || overLimit || selectedPlatforms.length === 0) ? 0.5 : 1 }}
              >
                {submitted
                  ? '✓ Scheduled!'
                  : publishMode === 'now'
                  ? 'Publish Now'
                  : 'Schedule Post'}
              </button>
              <button
                className="btn-secondary"
                onClick={() => { setContent(''); setScheduleDate(''); setScheduleTime(''); }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Upcoming Posts */}
          <div className="card" style={{ padding: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--bg-border)' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Upcoming Posts</h2>
              <Link href="/schedule" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>
                View All →
              </Link>
            </div>
            <div>
              {UPCOMING_POSTS.map((post, i) => (
                <div key={post.id} style={{
                  display: 'flex',
                  gap: 16,
                  padding: '14px 20px',
                  borderBottom: i < UPCOMING_POSTS.length - 1 ? '1px solid var(--bg-border-subtle)' : 'none',
                  transition: 'background 0.1s',
                }}>
                  {/* Time */}
                  <div style={{ flexShrink: 0, width: 56, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: post.day === 'Today' ? '#A78BFA' : 'var(--text-muted)', marginBottom: 2 }}>
                      {post.day}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{post.time}</div>
                  </div>
                  {/* Platform icons */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                    {post.platforms.map(p => (
                      <div key={p} style={{
                        width: 24, height: 24, borderRadius: 6,
                        background: p === 'twitter' ? 'rgba(14,165,233,0.1)' : p === 'linkedin' ? 'rgba(10,102,194,0.1)' : 'rgba(225,48,108,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: p === 'twitter' ? '#38BDF8' : p === 'linkedin' ? '#60A5FA' : '#F472B6',
                      }}>
                        <PlatformIcon platform={p} size={13} />
                      </div>
                    ))}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 13,
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: 6,
                    }}>
                      {post.content}
                    </p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 500,
                        padding: '2px 7px',
                        borderRadius: 4,
                        background: post.status === 'scheduled' ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.05)',
                        color: post.status === 'scheduled' ? '#A78BFA' : 'var(--text-muted)',
                        border: `1px solid ${post.status === 'scheduled' ? 'rgba(124,58,237,0.2)' : 'var(--bg-border)'}`,
                      }}>
                        {post.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                      </span>
                      {post.isAi && (
                        <span style={{
                          fontSize: 11,
                          fontWeight: 500,
                          padding: '2px 7px',
                          borderRadius: 4,
                          background: 'rgba(124,58,237,0.08)',
                          color: '#A78BFA',
                          border: '1px solid rgba(124,58,237,0.15)',
                        }}>
                          AI
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Quick Actions + Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="section-title">Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'AI Generate', href: '/ai-generate', color: '#7C3AED', icon: '⚡' },
                { label: 'Schedule', href: '/schedule', color: '#0EA5E9', icon: '📅' },
                { label: 'Analytics', href: '/analytics', color: '#10B981', icon: '📊' },
                { label: 'Connections', href: '/connections', color: '#F59E0B', icon: '🔗' },
              ].map(a => (
                <Link
                  key={a.label}
                  href={a.href}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '16px 8px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--bg-border)',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="section-title">Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ACTIVITY.map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: a.type === 'success' ? 'rgba(52,211,153,0.12)' : 'rgba(124,58,237,0.12)',
                    color: a.type === 'success' ? '#34D399' : '#A78BFA',
                    fontSize: 13,
                  }}>
                    {a.type === 'success' ? '✓' : '•'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>{a.message}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Platforms */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 className="section-title" style={{ margin: 0 }}>Connected</h3>
              <Link href="/connections" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>Manage</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { platform: 'twitter', handle: '@techcorp', status: 'active' },
                { platform: 'linkedin', handle: 'TechCorp Inc.', status: 'warning' },
              ].map(c => (
                <div key={c.platform} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: c.platform === 'twitter' ? 'rgba(14,165,233,0.1)' : 'rgba(10,102,194,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.platform === 'twitter' ? '#38BDF8' : '#60A5FA',
                  }}>
                    <PlatformIcon platform={c.platform} size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{c.handle}</div>
                  </div>
                  <div style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: c.status === 'active' ? '#34D399' : '#FBBF24',
                  }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
