'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import {
  LogoIcon,
  HomeIcon,
  LightningIcon,
  CalendarIcon,
  ChartIcon,
  LinkIcon,
  SettingsIcon,
  ChevronDownIcon,
  PlusIcon,
} from '@/components/icons';

const mainNavItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/ai-generate', label: 'AI Generate', icon: LightningIcon },
  { href: '/schedule', label: 'Schedule', icon: CalendarIcon },
  { href: '/analytics', label: 'Analytics', icon: ChartIcon },
];

const settingsNavItems = [
  { href: '/connections', label: 'Connections', icon: LinkIcon },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

// Collapse icon component
const CollapseIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);

const ExpandIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <polyline points="14 9 17 12 14 15" />
  </svg>
);

export default function Sidebar() {
  const pathname = usePathname();
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Use auth hook for user data
  const { user, profile, credits, loading: authLoading } = useAuth();

  // Use workspaces hook for workspace data
  const {
    workspaces,
    currentWorkspace,
    loading: workspacesLoading,
    selectWorkspace,
  } = useWorkspaces(user?.id);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Display loading state
  const isLoading = authLoading || workspacesLoading;

  // Calculate credits display
  const creditsUsed = credits?.used ?? 153;
  const creditsTotal = credits?.total ?? 1000;
  const creditsRemaining = creditsTotal - creditsUsed;
  const creditsPercentage = ((creditsRemaining / creditsTotal) * 100).toFixed(1);

  // User display info
  const userName = profile?.name ?? user?.email?.split('@')[0] ?? 'Ben';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <nav className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Logo & Collapse Toggle */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <LogoIcon size={20} />
          </div>
          {!isCollapsed && <span className="logo-text">PostPilot</span>}
        </div>
        <button
          className="sidebar-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ExpandIcon size={18} /> : <CollapseIcon size={18} />}
        </button>
      </div>

      {/* Workspace Switcher */}
      {!isCollapsed && (
        <>
          <button
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className={`workspace-switcher ${isWorkspaceOpen ? 'open' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="workspace-current">
                <div className="workspace-avatar" style={{ background: '#E5E7EB' }} />
                <div className="workspace-info">
                  <div className="workspace-name" style={{ background: '#E5E7EB', height: '14px', borderRadius: '4px' }} />
                </div>
              </div>
            ) : currentWorkspace ? (
              <div className="workspace-current">
                <div className="workspace-avatar" style={{ background: `linear-gradient(135deg, ${currentWorkspace.color === 'from-green-500 to-green-600' ? '#10B981, #059669' : currentWorkspace.color === 'from-indigo-500 to-purple-500' ? '#6366F1, #8B5CF6' : '#F59E0B, #D97706'})` }}>
                  {currentWorkspace.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div className="workspace-info">
                  <div className="workspace-name">{currentWorkspace.name}</div>
                  <div className="workspace-type">{currentWorkspace.type}</div>
                </div>
                <ChevronDownIcon className="workspace-chevron" />
              </div>
            ) : null}
          </button>

          {/* Dropdown */}
          {isWorkspaceOpen && !isLoading && (
            <div className="workspace-dropdown">
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => {
                    selectWorkspace(workspace);
                    setIsWorkspaceOpen(false);
                  }}
                  className={`workspace-option ${workspace.id === currentWorkspace?.id ? 'active' : ''}`}
                >
                  <div className="workspace-avatar" style={{ background: `linear-gradient(135deg, ${workspace.color === 'from-green-500 to-green-600' ? '#10B981, #059669' : workspace.color === 'from-indigo-500 to-purple-500' ? '#6366F1, #8B5CF6' : '#F59E0B, #D97706'})` }}>
                    {workspace.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div className="workspace-info">
                    <div className="workspace-name">{workspace.name}</div>
                    <div className="workspace-type">{workspace.type}</div>
                  </div>
                </button>
              ))}
              <button className="workspace-add">
                <div className="workspace-add-icon">
                  <PlusIcon size={14} />
                </div>
                Add Business
              </button>
            </div>
          )}
        </>
      )}

      {/* Main Navigation */}
      <div className="nav-section">
        {!isCollapsed && <div className="nav-label">Main</div>}
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${active ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} />
              {!isCollapsed && item.label}
            </Link>
          );
        })}
      </div>

      {/* Settings Navigation */}
      <div className="nav-section">
        {!isCollapsed && <div className="nav-label">Settings</div>}
        {settingsNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${active ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} />
              {!isCollapsed && item.label}
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="nav-spacer" />

      {/* User Section with AI Credits */}
      <div className="user-section">
        <div className="user-row">
          <div className="user-avatar">
            {userInitial}
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <div className="user-name">{userName}</div>
              <div className="user-plan">Pro Plan</div>
            </div>
          )}
        </div>

        {/* AI Credits */}
        {!isCollapsed && (
          <div className="credits-section">
            <div className="credits-header">
              <span className="credits-label">AI Credits</span>
              <span className="credits-count">
                {creditsRemaining.toLocaleString()} / {creditsTotal.toLocaleString()}
              </span>
            </div>
            <div className="credits-bar">
              <div
                className="credits-fill"
                style={{ width: `${creditsPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
