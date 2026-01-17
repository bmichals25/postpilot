'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  HomeIcon,
  LightningIcon,
  CalendarIcon,
  ChartIcon,
  LinkIcon,
  SettingsIcon,
} from '@/components/icons';

// Brand Guide icon
const BrandGuideIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="10.5" r="2.5" />
    <circle cx="8.5" cy="7.5" r="2.5" />
    <circle cx="6.5" cy="12.5" r="2.5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const mainNavItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/ai-generate', label: 'AI Generate', icon: LightningIcon },
  { href: '/schedule', label: 'Schedule', icon: CalendarIcon },
  { href: '/analytics', label: 'Analytics', icon: ChartIcon },
  { href: '/brand-guide', label: 'Brand Guide', icon: BrandGuideIcon },
];

const settingsNavItems = [
  { href: '/connections', label: 'Connections', icon: LinkIcon },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

// Handle icon - chevron for collapse/expand
const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Use auth hook for user data
  const { user, profile, credits, loading: authLoading } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Calculate credits display
  const creditsUsed = credits?.used ?? 153;
  const creditsTotal = credits?.total ?? 1000;
  const creditsRemaining = creditsTotal - creditsUsed;
  const creditsPercentage = ((creditsRemaining / creditsTotal) * 100).toFixed(1);

  // User display info
  const userName = profile?.name ?? user?.email?.split('@')[0] ?? 'Ben';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className={`sidebar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar */}
      <nav className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Main Navigation */}
        <div className="nav-section nav-section-first">
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

      {/* Collapse Handle - Outside the sidebar */}
      <button
        className="sidebar-handle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRightIcon size={14} /> : <ChevronLeftIcon size={14} />}
      </button>
    </div>
  );
}
