'use client';

import React, { useState } from 'react';

// ---- Static mock data ----
type ConnectionStatus = 'connected' | 'warning' | 'disconnected';

interface Connection {
  id: string;
  platform: string;
  name: string;
  handle: string;
  status: ConnectionStatus;
  statusLabel: string;
}

const INITIAL_CONNECTIONS: Connection[] = [
  { id: '1', platform: 'twitter', name: 'Twitter / X', handle: '@techcorp', status: 'connected', statusLabel: 'Connected' },
  { id: '2', platform: 'linkedin', name: 'LinkedIn', handle: 'TechCorp Inc.', status: 'warning', statusLabel: 'Expires in 5d' },
];

const ADDABLE_PLATFORMS = [
  { id: 'instagram', name: 'Instagram' },
];

const COMING_SOON = [
  { id: 'facebook', name: 'Facebook', label: 'FB' },
  { id: 'tiktok', name: 'TikTok', label: 'TT' },
  { id: 'youtube', name: 'YouTube', label: 'YT' },
  { id: 'threads', name: 'Threads', label: 'TH' },
];

// ---- Platform icons ----
const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="ig-conn" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#833AB4" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-conn)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const PlatformIcon = ({ platform, size = 20 }: { platform: string; size?: number }) => {
  if (platform === 'twitter') return <TwitterIcon size={size} />;
  if (platform === 'linkedin') return <LinkedInIcon size={size} />;
  if (platform === 'instagram') return <InstagramIcon size={size} />;
  return <span style={{ fontSize: size * 0.6, fontWeight: 700, color: 'var(--text-muted)' }}>{platform.slice(0, 2).toUpperCase()}</span>;
};

const platformBg = (p: string) =>
  p === 'twitter' ? 'rgba(14,165,233,0.1)' : p === 'linkedin' ? 'rgba(10,102,194,0.1)' : p === 'instagram' ? 'rgba(225,48,108,0.1)' : 'rgba(255,255,255,0.05)';

const platformColor = (p: string) =>
  p === 'twitter' ? '#38BDF8' : p === 'linkedin' ? '#60A5FA' : p === 'instagram' ? '#F472B6' : 'var(--text-muted)';

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleDisconnect = async (id: string) => {
    setDisconnecting(id);
    await new Promise(r => setTimeout(r, 800));
    setConnections(prev => prev.filter(c => c.id !== id));
    setDisconnecting(null);
  };

  const handleConnect = async (platform: string) => {
    setConnecting(platform);
    await new Promise(r => setTimeout(r, 1000));
    const newConn: Connection = {
      id: Date.now().toString(),
      platform,
      name: platform === 'instagram' ? 'Instagram' : platform,
      handle: `@techcorp_${platform}`,
      status: 'connected',
      statusLabel: 'Connected',
    };
    setConnections(prev => [...prev, newConn]);
    setConnecting(null);
  };

  const connectedPlatforms = connections.map(c => c.platform);
  const availablePlatforms = ADDABLE_PLATFORMS.filter(p => !connectedPlatforms.includes(p.id));

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 className="page-title">Connections</h1>
          <p className="page-subtitle">Manage your connected social media accounts</p>
        </div>
        {availablePlatforms.length > 0 && (
          <button className="btn-primary" onClick={() => handleConnect(availablePlatforms[0].id)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="4" x2="12" y2="20" /><line x1="4" y1="12" x2="20" y2="12" />
            </svg>
            Add Platform
          </button>
        )}
      </div>

      {/* Connected Platforms */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Connected ({connections.length})
        </div>

        {connections.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
            <div className="empty-state-icon" style={{ margin: '0 auto 16px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <p className="empty-state-title">No platforms connected</p>
            <p className="empty-state-desc">Connect your social accounts to start scheduling posts.</p>
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => handleConnect('twitter')}>
              Connect Twitter/X
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {connections.map(conn => (
              <div key={conn.id} className="connection-card">
                {/* Platform icon */}
                <div className="connection-icon" style={{ background: platformBg(conn.platform), color: platformColor(conn.platform) }}>
                  <PlatformIcon platform={conn.platform} size={22} />
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{conn.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{conn.handle}</div>
                </div>

                {/* Status badge */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                  background: conn.status === 'connected' ? 'rgba(52,211,153,0.1)' : conn.status === 'warning' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)',
                  color: conn.status === 'connected' ? '#34D399' : conn.status === 'warning' ? '#FBBF24' : '#F87171',
                  border: `1px solid ${conn.status === 'connected' ? 'rgba(52,211,153,0.2)' : conn.status === 'warning' ? 'rgba(251,191,36,0.2)' : 'rgba(248,113,113,0.2)'}`,
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: conn.status === 'connected' ? '#34D399' : conn.status === 'warning' ? '#FBBF24' : '#F87171',
                  }} />
                  {conn.statusLabel}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {conn.status === 'warning' && (
                    <button style={{
                      padding: '5px 10px', borderRadius: 7, fontSize: 12, fontWeight: 500,
                      background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)',
                      color: '#FBBF24', cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                      Re-auth
                    </button>
                  )}
                  <button
                    title="Refresh"
                    style={{
                      width: 32, height: 32, borderRadius: 7, border: '1px solid var(--bg-border)',
                      background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'var(--text-muted)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDisconnect(conn.id)}
                    disabled={disconnecting === conn.id}
                    title="Disconnect"
                    style={{
                      width: 32, height: 32, borderRadius: 7,
                      border: '1px solid rgba(248,113,113,0.2)',
                      background: 'rgba(248,113,113,0.06)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#F87171', opacity: disconnecting === conn.id ? 0.6 : 1,
                    }}
                  >
                    {disconnecting === conn.id ? (
                      <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #F87171', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Platform */}
      {availablePlatforms.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Add Platform
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {availablePlatforms.map(p => (
              <button
                key={p.id}
                onClick={() => handleConnect(p.id)}
                disabled={connecting === p.id}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  padding: '20px 24px', borderRadius: 12,
                  background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
                  cursor: 'pointer', transition: 'border-color 0.15s', fontFamily: 'inherit',
                  opacity: connecting === p.id ? 0.7 : 1,
                  minWidth: 120,
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 11, background: platformBg(p.id), display: 'flex', alignItems: 'center', justifyContent: 'center', color: platformColor(p.id) }}>
                  {connecting === p.id
                    ? <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid currentColor', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                    : <PlatformIcon platform={p.id} size={22} />
                  }
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Coming Soon
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {COMING_SOON.map(p => (
            <div
              key={p.id}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                padding: '20px 24px', borderRadius: 12,
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--bg-border)',
                opacity: 0.5, minWidth: 120,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 11, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)' }}>{p.label}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>{p.name}</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: 'var(--text-faint)' }}>
                  Soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
