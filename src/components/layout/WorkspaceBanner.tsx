'use client';

import { useAuth } from '@/hooks/useAuth';
import { useWorkspaces } from '@/hooks/useWorkspaces';

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

// Map workspace types to display labels and icons
const typeLabels: Record<string, { label: string; emoji: string }> = {
  business: { label: 'Business', emoji: '🏢' },
  personal: { label: 'Personal Brand', emoji: '✨' },
  startup: { label: 'Startup', emoji: '🚀' },
  agency: { label: 'Agency', emoji: '🎯' },
  creator: { label: 'Creator', emoji: '🎨' },
};

export default function WorkspaceBanner() {
  const { user } = useAuth();
  const { currentWorkspace, loading } = useWorkspaces(user?.id);

  if (loading) {
    return (
      <div className="workspace-banner workspace-banner-loading">
        <div className="workspace-banner-content">
          <div className="workspace-banner-avatar-skeleton" />
          <div className="workspace-banner-text-skeleton">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-subtitle" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentWorkspace) return null;

  const gradient = gradientMap[currentWorkspace.color] || gradientMap['from-indigo-500 to-purple-500'];
  const typeInfo = typeLabels[currentWorkspace.type] || { label: currentWorkspace.type, emoji: '📁' };
  const initials = currentWorkspace.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="workspace-banner" style={{ background: gradient }}>
      <div className="workspace-banner-pattern" />
      <div className="workspace-banner-content">
        <div className="workspace-banner-avatar">
          {initials}
        </div>
        <div className="workspace-banner-info">
          <h2 className="workspace-banner-name">{currentWorkspace.name}</h2>
          <div className="workspace-banner-meta">
            <span className="workspace-banner-type">
              {typeInfo.emoji} {typeInfo.label}
            </span>
            <span className="workspace-banner-separator">•</span>
            <span className="workspace-banner-status">
              <span className="workspace-banner-status-dot" />
              Active
            </span>
          </div>
        </div>
      </div>
      <div className="workspace-banner-actions">
        <button className="workspace-banner-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </button>
      </div>
    </div>
  );
}
