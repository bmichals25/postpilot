'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { SettingsIcon, ChevronDownIcon, LogoutIcon, CreditCardIcon } from '@/components/icons';

// Inline icon components (clean, minimal stroke style)
const HomeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const LightningIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CalendarIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ChartIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const LinkIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const BrandIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125A1.64 1.64 0 0 1 14.44 16.5h1.996C19.498 16.5 22 13.996 22 10.944 21.966 6.012 17.461 2 12 2z" />
  </svg>
);

const ChevronLeftIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const LogoMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', Icon: HomeIcon },
  { href: '/ai-generate', label: 'AI Generate', Icon: LightningIcon },
  { href: '/schedule', label: 'Schedule', Icon: CalendarIcon },
  { href: '/analytics', label: 'Analytics', Icon: ChartIcon },
  { href: '/brand-guide', label: 'Brand Guide', Icon: BrandIcon },
];

const settingsNavItems = [
  { href: '/connections', label: 'Connections', Icon: LinkIcon },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, profile, credits, signOut } = useAuth();

  const isActive = (href: string) => pathname.startsWith(href);

  const creditsUsed = credits?.used ?? 153;
  const creditsTotal = credits?.total ?? 1000;
  const creditsRemaining = creditsTotal - creditsUsed;
  const creditsPercent = Math.round((creditsRemaining / creditsTotal) * 100);

  const userName = profile?.name ?? user?.email?.split('@')[0] ?? 'You';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    await signOut();
  };

  return (
    <div className={`sidebar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
      <nav className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <LogoMark />
          </div>
          {!isCollapsed && <span className="sidebar-logo-text">PostPilot</span>}
        </div>

        {/* Main Nav */}
        <div className="nav-section nav-section-first">
          {!isCollapsed && <div className="nav-label">Main</div>}
          {mainNavItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-item ${isActive(href) ? 'active' : ''}`}
              title={isCollapsed ? label : undefined}
            >
              <Icon size={18} />
              {!isCollapsed && label}
            </Link>
          ))}
        </div>

        {/* Settings Nav */}
        <div className="nav-section">
          {!isCollapsed && <div className="nav-label">Settings</div>}
          {settingsNavItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-item ${isActive(href) ? 'active' : ''}`}
              title={isCollapsed ? label : undefined}
            >
              <Icon size={18} />
              {!isCollapsed && label}
            </Link>
          ))}
        </div>

        <div className="nav-spacer" />

        {/* User Section */}
        <div className="user-section" style={{ position: 'relative' }}>
          <button
            className={`user-row-btn ${isUserMenuOpen ? 'open' : ''}`}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="user-avatar">{userInitial}</div>
            {!isCollapsed && (
              <>
                <div className="user-info">
                  <div className="user-name">{userName}</div>
                  <div className="user-plan">Pro Plan</div>
                </div>
                <ChevronDownIcon size={14} />
              </>
            )}
          </button>

          {isUserMenuOpen && !isCollapsed && (
            <>
              <div className="user-menu-backdrop" onClick={() => setIsUserMenuOpen(false)} />
              <div className="user-menu">
                <button className="user-menu-item">
                  <SettingsIcon size={15} />
                  My Account
                </button>
                <button className="user-menu-item">
                  <CreditCardIcon size={15} />
                  Billing
                </button>
                <div className="user-menu-divider" />
                <button className="user-menu-item danger" onClick={handleSignOut}>
                  <LogoutIcon size={15} />
                  Sign Out
                </button>
              </div>
            </>
          )}

          {!isCollapsed && (
            <div className="credits-section">
              <div className="credits-header">
                <span className="credits-label">AI Credits</span>
                <span className="credits-count">
                  {creditsRemaining.toLocaleString()} / {creditsTotal.toLocaleString()}
                </span>
              </div>
              <div className="credits-bar">
                <div className="credits-fill" style={{ width: `${creditsPercent}%` }} />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Collapse handle */}
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
