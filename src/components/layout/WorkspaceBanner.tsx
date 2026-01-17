'use client';

import { useAuth } from '@/hooks/useAuth';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import { TwitterIcon, LinkedInIcon, InstagramIcon } from '@/components/icons';

// Map Tailwind gradient classes to actual CSS gradients
const gradientMap: Record<string, { from: string; to: string }> = {
  'from-emerald-500 to-emerald-600': { from: '#10B981', to: '#059669' },
  'from-green-500 to-green-600': { from: '#22C55E', to: '#16A34A' },
  'from-indigo-500 to-purple-500': { from: '#6366F1', to: '#8B5CF6' },
  'from-amber-500 to-orange-500': { from: '#F59E0B', to: '#F97316' },
  'from-blue-500 to-blue-600': { from: '#3B82F6', to: '#2563EB' },
  'from-rose-500 to-pink-500': { from: '#F43F5E', to: '#EC4899' },
  'from-cyan-500 to-teal-500': { from: '#06B6D4', to: '#14B8A6' },
};

// Mock social connections
const mockSocialConnections = {
  twitter: { connected: true, handle: '@acmeinc', url: 'https://twitter.com/acmeinc' },
  linkedin: { connected: true, handle: 'ACME Inc.', url: 'https://linkedin.com/company/acme' },
  instagram: { connected: true, handle: '@acme.inc', url: 'https://instagram.com/acme.inc' },
};

export default function WorkspaceBanner() {
  const { user } = useAuth();
  const { currentWorkspace, loading } = useWorkspaces(user?.id);

  if (loading) {
    return (
      <header className="glass-header glass-header-loading">
        <div className="glass-header-inner">
          <div className="glass-header-left">
            <div className="glass-avatar-skeleton" />
            <div className="glass-text-skeleton">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-subtitle" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (!currentWorkspace) return null;

  const colors = gradientMap[currentWorkspace.color] || gradientMap['from-indigo-500 to-purple-500'];
  const initials = currentWorkspace.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="glass-header">
      <div className="glass-header-inner">
        {/* Left side - Company info */}
        <div className="glass-header-left">
          <div
            className="glass-avatar"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          >
            {initials}
          </div>
          <div className="glass-header-info">
            <h1 className="glass-header-name">{currentWorkspace.name}</h1>
            <div className="glass-header-status">
              <span className="glass-status-dot" />
              <span>Active</span>
            </div>
          </div>
        </div>

        {/* Right side - Social links */}
        <div className="glass-header-right">
          {mockSocialConnections.twitter.connected && (
            <a
              href={mockSocialConnections.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-social-btn"
              title={`Twitter: ${mockSocialConnections.twitter.handle}`}
            >
              <TwitterIcon size={20} />
            </a>
          )}
          {mockSocialConnections.linkedin.connected && (
            <a
              href={mockSocialConnections.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-social-btn"
              title={`LinkedIn: ${mockSocialConnections.linkedin.handle}`}
            >
              <LinkedInIcon size={20} />
            </a>
          )}
          {mockSocialConnections.instagram.connected && (
            <a
              href={mockSocialConnections.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-social-btn"
              title={`Instagram: ${mockSocialConnections.instagram.handle}`}
            >
              <InstagramIcon size={20} />
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
