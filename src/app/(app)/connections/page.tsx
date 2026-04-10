'use client';

import React, { useState } from 'react';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import {
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  CheckIcon,
  AlertTriangleIcon,
  PlusIcon,
  RefreshIcon,
  XIcon,
} from '@/components/icons';

// Available platforms that can be connected
const availablePlatforms = [
  { id: 'facebook', name: 'Facebook', icon: 'FB', comingSoon: true },
  { id: 'youtube', name: 'YouTube', icon: 'YT', comingSoon: true },
  { id: 'tiktok', name: 'TikTok', icon: 'TT', comingSoon: true },
];

export default function ConnectionsPage() {
  const { currentWorkspace, connections, refetchConnections } = useWorkspaceContext();
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  const getPlatformIcon = (platform: string, size = 20) => {
    switch (platform) {
      case 'twitter':
        return <TwitterIcon size={size} />;
      case 'linkedin':
        return <LinkedInIcon size={size} />;
      case 'instagram':
        return <InstagramIcon size={size} />;
      default:
        return null;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'Twitter / X';
      case 'linkedin': return 'LinkedIn';
      case 'instagram': return 'Instagram';
      default: return platform;
    }
  };

  const getConnectionStatus = (connection: typeof connections[0]) => {
    if (connection.status !== 'active') {
      return { status: 'error', label: 'Disconnected', color: 'red' };
    }
    if (connection.expires_at) {
      const expiresAt = new Date(connection.expires_at);
      const daysUntilExpiry = Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysUntilExpiry <= 7) {
        return { status: 'warning', label: `Expires in ${daysUntilExpiry}d`, color: 'yellow' };
      }
    }
    return { status: 'healthy', label: 'Connected', color: 'green' };
  };

  const handleDisconnect = async (connectionId: string) => {
    setDisconnecting(connectionId);
    // In production, this would call an API to revoke the connection
    await new Promise(resolve => setTimeout(resolve, 1000));
    await refetchConnections();
    setDisconnecting(null);
  };

  const handleConnect = (platform: string) => {
    // In production, this would initiate OAuth flow
    console.log('Connecting:', platform);
    alert(`OAuth flow for ${platform} would start here`);
  };

  const unconnectedPlatforms = ['twitter', 'linkedin', 'instagram'].filter(
    p => !connections.some(c => c.platform === p)
  );

  return (
    <div className="connections-page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1>Platform Connections</h1>
          <p>Manage social media accounts for {currentWorkspace?.name || 'your workspace'}</p>
        </div>
      </header>

      {/* Connected Platforms Section */}
      <div className="connections-section">
        <div className="connections-section-header">
          <h2>Connected Platforms ({connections.length})</h2>
          {unconnectedPlatforms.length > 0 && (
            <button className="btn-secondary btn-sm" onClick={() => handleConnect(unconnectedPlatforms[0])}>
              <PlusIcon size={16} />
              Add Platform
            </button>
          )}
        </div>

        {connections.length === 0 ? (
          <div className="connections-empty">
            <p>No platforms connected yet</p>
            <button className="btn-primary" onClick={() => handleConnect('twitter')}>
              Connect Your First Platform
            </button>
          </div>
        ) : (
          <div className="connections-list">
            {connections.map((connection) => {
              const status = getConnectionStatus(connection);
              return (
                <div key={connection.id} className="connection-row">
                  <div className="connection-row-left">
                    <div className={`connection-icon ${connection.platform}`}>
                      {getPlatformIcon(connection.platform, 24)}
                    </div>
                    <div className="connection-info">
                      <div className="connection-name">{getPlatformName(connection.platform)}</div>
                      <div className="connection-handle">{connection.platform_username || connection.platform_user_id}</div>
                    </div>
                  </div>
                  <div className="connection-row-right">
                    <div className={`connection-status ${status.color}`}>
                      {status.status === 'healthy' ? (
                        <CheckIcon size={14} />
                      ) : (
                        <AlertTriangleIcon size={14} />
                      )}
                      <span>{status.label}</span>
                    </div>
                    <div className="connection-actions">
                      {status.status === 'warning' && (
                        <button
                          className="btn-sm btn-warning"
                          onClick={() => handleConnect(connection.platform)}
                        >
                          Re-auth
                        </button>
                      )}
                      <button
                        className="btn-sm btn-icon"
                        onClick={() => refetchConnections()}
                        title="Refresh"
                      >
                        <RefreshIcon size={16} />
                      </button>
                      <button
                        className="btn-sm btn-icon btn-danger"
                        onClick={() => handleDisconnect(connection.id)}
                        disabled={disconnecting === connection.id}
                        title="Disconnect"
                      >
                        <XIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add More Platforms */}
      {unconnectedPlatforms.length > 0 && (
        <div className="connections-section">
          <div className="connections-section-header">
            <h2>Add Platform</h2>
          </div>
          <div className="platforms-grid-small">
            {unconnectedPlatforms.map((platform) => (
              <button
                key={platform}
                className="platform-add-card"
                onClick={() => handleConnect(platform)}
              >
                <div className={`platform-add-icon ${platform}`}>
                  {getPlatformIcon(platform, 28)}
                </div>
                <span>{getPlatformName(platform)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon */}
      <div className="connections-section">
        <div className="connections-section-header">
          <h2>Coming Soon</h2>
        </div>
        <div className="platforms-grid-small coming-soon">
          {availablePlatforms.map((platform) => (
            <div key={platform.id} className="platform-add-card disabled">
              <div className="platform-add-icon">
                <span className="platform-icon-text">{platform.icon}</span>
              </div>
              <span>{platform.name}</span>
              <span className="coming-soon-badge">Soon</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
