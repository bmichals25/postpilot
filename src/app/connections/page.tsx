'use client';

import React from 'react';
import {
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  CheckIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ShieldIcon,
  ClockIcon,
  LightningIcon,
  RefreshIcon,
  SettingsIcon,
  LogoutIcon,
  PlusIcon,
} from '@/components/icons';

const platforms = [
  {
    id: 'twitter',
    name: 'Twitter / X',
    handle: '@postpilot',
    status: 'healthy',
    auth: 'Valid',
    lastActivity: '2 hours ago',
    apiStatus: 'Operational',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Ben M.',
    status: 'warning',
    auth: 'Expiring Soon',
    lastActivity: 'Yesterday',
    apiStatus: 'Operational',
    warning: {
      title: 'Token expiring soon',
      message: 'Your LinkedIn access token expires in 5 days. Re-authenticate to maintain uninterrupted posting.',
    },
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@postpilot',
    status: 'healthy',
    auth: 'Valid',
    lastActivity: '3 days ago',
    apiStatus: 'Operational',
  },
];

export default function ConnectionsPage() {
  return (
    <div style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <header className="connections-header">
        <h1>Platform Connections</h1>
        <p>Manage your connected social media accounts and monitor their health status.</p>
      </header>

      {/* Overall Status Banner */}
      <div className="status-banner">
        <div className="status-banner-icon">
          <CheckCircleIcon size={28} className="text-white" />
        </div>
        <div className="status-banner-content">
          <div className="status-banner-title">All Systems Operational</div>
          <div className="status-banner-subtitle">Your connected platforms are working perfectly. You&apos;re all set to post!</div>
        </div>
        <div className="status-banner-badge">
          <div className="status-banner-badge-dot" />
          <span>3 platforms connected</span>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="platforms-grid">
        {platforms.map((platform) => (
          <div key={platform.id} className="platform-card">
            {/* Card Header */}
            <div className="platform-card-header">
              <div className={`platform-logo ${platform.id}`}>
                {platform.id === 'twitter' && <TwitterIcon size={28} className="text-black" />}
                {platform.id === 'linkedin' && <LinkedInIcon size={28} />}
                {platform.id === 'instagram' && <InstagramIcon size={28} gradient={false} className="text-white" />}
              </div>
              <div className="platform-info">
                <div className="platform-card-name">{platform.name}</div>
                <div className="platform-card-handle">{platform.handle}</div>
              </div>
              <div className={`platform-status-badge ${platform.status}`}>
                {platform.status === 'healthy' ? (
                  <CheckIcon size={18} />
                ) : (
                  <AlertTriangleIcon size={18} />
                )}
                {platform.status === 'healthy' ? 'Connected' : 'Attention Needed'}
              </div>
            </div>

            {/* Warning Message (for LinkedIn) */}
            {platform.warning && (
              <div className="warning-message">
                <AlertTriangleIcon size={24} className="warning-message-icon" />
                <div className="warning-message-content">
                  <div className="warning-message-title">{platform.warning.title}</div>
                  <div className="warning-message-text">{platform.warning.message}</div>
                </div>
                <button className="warning-message-action">Re-authenticate</button>
              </div>
            )}

            {/* Health Details */}
            <div className="health-details">
              <div className="health-item">
                <div className={`health-item-icon ${platform.auth === 'Valid' ? 'green' : 'yellow'}`}>
                  <ShieldIcon size={18} />
                </div>
                <div className="health-item-content">
                  <div className="health-item-label">Authentication</div>
                  <div className="health-item-value">{platform.auth}</div>
                </div>
              </div>

              <div className="health-item">
                <div className="health-item-icon blue">
                  <ClockIcon size={18} />
                </div>
                <div className="health-item-content">
                  <div className="health-item-label">Last Activity</div>
                  <div className="health-item-value">{platform.lastActivity}</div>
                </div>
              </div>

              <div className="health-item">
                <div className="health-item-icon green">
                  <LightningIcon size={18} />
                </div>
                <div className="health-item-content">
                  <div className="health-item-label">API Status</div>
                  <div className="health-item-value">{platform.apiStatus}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="platform-actions">
              {platform.status === 'warning' ? (
                <button className="platform-action-btn primary">
                  <RefreshIcon size={16} />
                  Re-authenticate Now
                </button>
              ) : (
                <button className="platform-action-btn">
                  <RefreshIcon size={16} />
                  Refresh Connection
                </button>
              )}
              <button className="platform-action-btn">
                <SettingsIcon size={16} />
                Configure
              </button>
              <button className="platform-action-btn danger">
                <LogoutIcon size={16} />
                Disconnect
              </button>
            </div>
          </div>
        ))}

        {/* Add New Platform Card */}
        <div className="add-platform-card">
          <div className="add-platform-icon">
            <PlusIcon size={28} />
          </div>
          <div className="add-platform-text">
            <div className="add-platform-title">Connect Another Platform</div>
            <div className="add-platform-subtitle">Add more social accounts to expand your reach</div>
          </div>
        </div>
      </div>
    </div>
  );
}
