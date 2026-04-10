'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LogoMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
    <path d="M2 17l10 5 10-5" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
    <path d="M2 12l10 5 10-5" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DashboardIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ComposeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SparklesIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" />
    <path d="M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5L5 3z" />
  </svg>
);

const CalendarIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const BarChartIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const LinkIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const SettingsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LogoutIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const navItems = [
  { href: '/', label: 'Dashboard', Icon: DashboardIcon },
  { href: '/compose', label: 'Compose', Icon: ComposeIcon },
  { href: '/ai-generate', label: 'AI Generate', Icon: SparklesIcon },
  { href: '/schedule', label: 'Schedule', Icon: CalendarIcon },
  { href: '/analytics', label: 'Analytics', Icon: BarChartIcon },
  { href: '/connections', label: 'Connections', Icon: LinkIcon },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <div style={{ position: 'relative', display: 'flex', flexShrink: 0 }}>
      <nav
        style={{
          width: collapsed ? 64 : 220,
          minWidth: collapsed ? 64 : 220,
          background: '#111118',
          borderRight: '1px solid #1E1E2E',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          padding: collapsed ? '20px 10px' : '20px 14px',
          transition: 'width 0.2s ease, min-width 0.2s ease, padding 0.2s ease',
          overflow: 'hidden',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 28,
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <LogoMark />
          </div>
          {!collapsed && (
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#F8F8FF',
                letterSpacing: '-0.3px',
                whiteSpace: 'nowrap',
              }}
            >
              PostPilot
            </span>
          )}
        </div>

        {/* Nav section label */}
        {!collapsed && (
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              padding: '0 4px',
              marginBottom: 6,
            }}
          >
            Menu
          </div>
        )}

        {/* Nav items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {navItems.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`sidebar-nav-item${active ? ' sidebar-nav-item--active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: collapsed ? '9px 0' : '9px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: active ? '#FFFFFF' : '#6B7280',
                  background: active ? '#7C3AED' : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={18} />
                {!collapsed && label}
              </Link>
            );
          })}
        </div>

        {/* Bottom user section */}
        <div
          style={{
            borderTop: '1px solid #1E1E2E',
            paddingTop: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 4px',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              B
            </div>
            {!collapsed && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F8F8FF', lineHeight: 1.3 }}>Ben</div>
                <div style={{ fontSize: 11, color: '#4B5563' }}>Pro Plan</div>
              </div>
            )}
          </div>

          <button
            title={collapsed ? 'Sign out' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: collapsed ? '7px 0' : '7px 10px',
              borderRadius: 7,
              background: 'transparent',
              border: 'none',
              color: '#4B5563',
              fontSize: 13,
              cursor: 'pointer',
              justifyContent: collapsed ? 'center' : 'flex-start',
              width: '100%',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
            className="sidebar-logout-btn"
          >
            <LogoutIcon size={16} />
            {!collapsed && 'Sign out'}
          </button>
        </div>
      </nav>

      {/* Collapse handle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{
          position: 'absolute',
          right: -11,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 22,
          height: 44,
          background: '#111118',
          border: '1px solid #1E1E2E',
          borderRadius: '0 6px 6px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#4B5563',
          zIndex: 50,
          transition: 'background 0.15s ease, color 0.15s ease',
        }}
        className="sidebar-collapse-handle"
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
    </div>
  );
}
