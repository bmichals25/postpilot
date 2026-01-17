'use client';

import { useAuth } from '@/hooks/useAuth';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import { TwitterIcon, LinkedInIcon, InstagramIcon } from '@/components/icons';

// Map Tailwind gradient classes to actual CSS gradients
const gradientMap: Record<string, string> = {
  'from-emerald-500 to-emerald-600': 'linear-gradient(135deg, #10B981, #059669)',
  'from-green-500 to-green-600': 'linear-gradient(135deg, #22C55E, #16A34A)',
  'from-indigo-500 to-purple-500': 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  'from-amber-500 to-orange-500': 'linear-gradient(135deg, #F59E0B, #F97316)',
  'from-blue-500 to-blue-600': 'linear-gradient(135deg, #3B82F6, #2563EB)',
  'from-rose-500 to-pink-500': 'linear-gradient(135deg, #F43F5E, #EC4899)',
  'from-cyan-500 to-teal-500': 'linear-gradient(135deg, #06B6D4, #14B8A6)',
};

// Map workspace types to display labels
const typeLabels: Record<string, { label: string; emoji: string }> = {
  business: { label: 'Business', emoji: '🏢' },
  personal: { label: 'Personal Brand', emoji: '✨' },
  startup: { label: 'Startup', emoji: '🚀' },
  agency: { label: 'Agency', emoji: '🎯' },
  creator: { label: 'Creator', emoji: '🎨' },
};

// Mock social connections - in real app, this would come from useWorkspaces or a connections hook
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
      <header className="workspace-header workspace-header-loading">
        <div className="workspace-header-inner">
          <div className="workspace-header-content">
            <div className="workspace-header-avatar-skeleton" />
            <div className="workspace-header-text-skeleton">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-subtitle" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (!currentWorkspace) return null;

  const gradient = gradientMap[currentWorkspace.color] || gradientMap['from-indigo-500 to-purple-500'];
  const typeInfo = typeLabels[currentWorkspace.type] || { label: currentWorkspace.type, emoji: '📁' };
  const initials = currentWorkspace.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="workspace-header" style={{ background: gradient }}>
      <div className="workspace-header-pattern" />
      <div className="workspace-header-inner">
        <div className="workspace-header-content">
          <div className="workspace-header-avatar">
            {initials}
          </div>
          <div className="workspace-header-info">
            <h1 className="workspace-header-name">{currentWorkspace.name}</h1>
            <div className="workspace-header-meta">
              <span className="workspace-header-type">
                {typeInfo.emoji} {typeInfo.label}
              </span>
              <span className="workspace-header-separator">•</span>
              <span className="workspace-header-status">
                <span className="workspace-header-status-dot" />
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="workspace-header-socials">
          <span className="workspace-header-socials-label">Connected Accounts</span>
          <div className="workspace-header-social-links">
            {mockSocialConnections.twitter.connected && (
              <a
                href={mockSocialConnections.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="workspace-social-link twitter"
                title={`Twitter: ${mockSocialConnections.twitter.handle}`}
              >
                <TwitterIcon size={18} />
                <span className="workspace-social-handle">{mockSocialConnections.twitter.handle}</span>
              </a>
            )}
            {mockSocialConnections.linkedin.connected && (
              <a
                href={mockSocialConnections.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="workspace-social-link linkedin"
                title={`LinkedIn: ${mockSocialConnections.linkedin.handle}`}
              >
                <LinkedInIcon size={18} />
                <span className="workspace-social-handle">{mockSocialConnections.linkedin.handle}</span>
              </a>
            )}
            {mockSocialConnections.instagram.connected && (
              <a
                href={mockSocialConnections.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="workspace-social-link instagram"
                title={`Instagram: ${mockSocialConnections.instagram.handle}`}
              >
                <InstagramIcon size={18} />
                <span className="workspace-social-handle">{mockSocialConnections.instagram.handle}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
