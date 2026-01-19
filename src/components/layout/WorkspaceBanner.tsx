'use client';

import { useState } from 'react';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import { LogoIcon, TwitterIcon, LinkedInIcon, InstagramIcon, ChevronDownIcon, PlusIcon } from '@/components/icons';
import AddBusinessModal from '@/components/modals/AddBusinessModal';

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

// Check icon for selected workspace
const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function WorkspaceBanner() {
  const { workspaces, currentWorkspace, connections, loading, selectWorkspace } = useWorkspaceContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddBusinessOpen, setIsAddBusinessOpen] = useState(false);

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

  const getWorkspaceColors = (colorClass: string) => {
    return gradientMap[colorClass] || gradientMap['from-indigo-500 to-purple-500'];
  };

  // Get connected platforms from real connections
  const twitterConnection = connections.find(c => c.platform === 'twitter' && c.status === 'active');
  const linkedinConnection = connections.find(c => c.platform === 'linkedin' && c.status === 'active');
  const instagramConnection = connections.find(c => c.platform === 'instagram' && c.status === 'active');

  return (
    <>
      <header
        className="glass-header branded"
        style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
      >
        <div className="glass-header-inner">
          {/* Left side - PostPilot logo + Company dropdown */}
          <div className="glass-header-left">
            {/* PostPilot Logo */}
            <div className="header-app-logo">
              <LogoIcon size={20} />
            </div>

            <div className="header-divider" />

            {/* Company Dropdown Switcher */}
            <div className="header-workspace-switcher">
              <button
                className={`header-workspace-btn ${isDropdownOpen ? 'open' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="glass-avatar branded">
                  {initials}
                </div>
                <div className="glass-header-info">
                  <h1 className="glass-header-name">{currentWorkspace.name}</h1>
                  <div className="glass-header-status">
                    <span className="glass-status-dot" />
                    <span>Active</span>
                  </div>
                </div>
                <ChevronDownIcon size={18} className="header-chevron" />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <>
                  <div className="header-dropdown-backdrop" onClick={() => setIsDropdownOpen(false)} />
                  <div className="header-workspace-dropdown">
                    <div className="header-dropdown-label">Switch workspace</div>
                    {workspaces.map((workspace) => {
                      const wsColors = getWorkspaceColors(workspace.color);
                      const wsInitials = workspace.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                      const isSelected = workspace.id === currentWorkspace.id;

                      return (
                        <button
                          key={workspace.id}
                          className={`header-dropdown-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            selectWorkspace(workspace);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div
                            className="header-dropdown-avatar"
                            style={{ background: `linear-gradient(135deg, ${wsColors.from}, ${wsColors.to})` }}
                          >
                            {wsInitials}
                          </div>
                          <div className="header-dropdown-info">
                            <span className="header-dropdown-name">{workspace.name}</span>
                            <span className="header-dropdown-type">{workspace.type}</span>
                          </div>
                          {isSelected && (
                            <div className="header-dropdown-check">
                              <CheckIcon size={16} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                    <div className="header-dropdown-divider" />
                    <button
                      className="header-dropdown-add"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsAddBusinessOpen(true);
                      }}
                    >
                      <div className="header-dropdown-add-icon">
                        <PlusIcon size={14} />
                      </div>
                      Create New
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right side - Social links (from real connections) */}
          <div className="glass-header-right">
            {twitterConnection && (
              <a
                href={`https://twitter.com/${twitterConnection.platform_username?.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-social-btn branded"
                title={`Twitter: ${twitterConnection.platform_username}`}
              >
                <TwitterIcon size={20} />
              </a>
            )}
            {linkedinConnection && (
              <a
                href={`https://linkedin.com/in/${linkedinConnection.platform_user_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-social-btn branded"
                title={`LinkedIn: ${linkedinConnection.platform_username}`}
              >
                <LinkedInIcon size={20} />
              </a>
            )}
            {instagramConnection && (
              <a
                href={`https://instagram.com/${instagramConnection.platform_username?.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-social-btn branded"
                title={`Instagram: ${instagramConnection.platform_username}`}
              >
                <InstagramIcon size={20} />
              </a>
            )}
            {connections.length === 0 && (
              <span className="glass-header-no-connections">No platforms connected</span>
            )}
          </div>
        </div>
      </header>

      {/* Add Business Modal */}
      <AddBusinessModal
        isOpen={isAddBusinessOpen}
        onClose={() => setIsAddBusinessOpen(false)}
      />
    </>
  );
}
