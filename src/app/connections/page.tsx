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
  const getPlatformIcon = (platformId: string, size = 28) => {
    switch (platformId) {
      case 'twitter':
        return <TwitterIcon size={size} className="text-black" />;
      case 'linkedin':
        return <LinkedInIcon size={size} />;
      case 'instagram':
        return <InstagramIcon size={size} gradient={false} className="text-white" />;
      default:
        return null;
    }
  };

  const getPlatformLogoBg = (platformId: string) => {
    switch (platformId) {
      case 'twitter':
        return 'bg-[#F3F4F6]';
      case 'linkedin':
        return 'bg-[#EFF6FF]';
      case 'instagram':
        return 'bg-gradient-to-br from-[#FFECD2] via-[#FCB69F] via-[#FF8A80] to-[#C13584]';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="max-w-[1000px]">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-[28px] font-bold text-[#1F2937] mb-2">Platform Connections</h1>
        <p className="text-[15px] text-[#6B7280]">Manage your connected social media accounts and monitor their health status.</p>
      </header>

      {/* Overall Status Banner */}
      <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-2xl mb-8">
        <div className="w-14 h-14 bg-[#10B981] rounded-[14px] flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
          <CheckCircleIcon size={28} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-lg font-bold text-[#065F46] mb-1">All Systems Operational</div>
          <div className="text-sm text-[#047857]">Your connected platforms are working perfectly. You&apos;re all set to post!</div>
        </div>
        <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse-soft" />
          <span className="text-sm font-semibold text-[#047857]">3 platforms connected</span>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="flex flex-col gap-5">
        {platforms.map((platform) => (
          <div key={platform.id} className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow">
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${getPlatformLogoBg(platform.id)}`}>
                {getPlatformIcon(platform.id)}
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-[#1F2937] mb-0.5">{platform.name}</div>
                <div className="text-sm text-[#6B7280]">{platform.handle}</div>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                platform.status === 'healthy'
                  ? 'bg-[#ECFDF5] text-[#047857]'
                  : 'bg-[#FFFBEB] text-[#D97706]'
              }`}>
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
              <div className="flex items-start gap-3 p-4 bg-[#FFFBEB] rounded-xl mb-5">
                <AlertTriangleIcon size={24} className="text-[#F59E0B] flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[#92400E] mb-1">{platform.warning.title}</div>
                  <div className="text-[13px] text-[#A16207] leading-relaxed">{platform.warning.message}</div>
                </div>
                <button className="px-4 py-2 bg-[#F59E0B] text-white rounded-lg text-[13px] font-semibold hover:bg-[#D97706] transition-colors flex-shrink-0">
                  Re-authenticate
                </button>
              </div>
            )}

            {/* Health Details */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[#F3F4F6]">
              <div className="flex items-center gap-3 px-4 py-3 bg-[#F9FAFB] rounded-[10px]">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  platform.auth === 'Valid' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FFFBEB] text-[#F59E0B]'
                }`}>
                  <ShieldIcon size={18} />
                </div>
                <div>
                  <div className="text-xs text-[#6B7280] mb-0.5">Authentication</div>
                  <div className="text-sm font-semibold text-[#1F2937]">{platform.auth}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-[#F9FAFB] rounded-[10px]">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#EEF2FF] text-[#6366F1]">
                  <ClockIcon size={18} />
                </div>
                <div>
                  <div className="text-xs text-[#6B7280] mb-0.5">Last Activity</div>
                  <div className="text-sm font-semibold text-[#1F2937]">{platform.lastActivity}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-[#F9FAFB] rounded-[10px]">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#ECFDF5] text-[#10B981]">
                  <LightningIcon size={18} />
                </div>
                <div>
                  <div className="text-xs text-[#6B7280] mb-0.5">API Status</div>
                  <div className="text-sm font-semibold text-[#1F2937]">{platform.apiStatus}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 mt-5 pt-5 border-t border-[#F3F4F6]">
              {platform.status === 'warning' ? (
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#6366F1] text-white rounded-[10px] text-sm font-medium hover:bg-[#5558E3] transition-colors">
                  <RefreshIcon size={16} />
                  Re-authenticate Now
                </button>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F9FAFB] rounded-[10px] text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">
                  <RefreshIcon size={16} />
                  Refresh Connection
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F9FAFB] rounded-[10px] text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">
                <SettingsIcon size={16} />
                Configure
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F9FAFB] rounded-[10px] text-sm font-medium text-[#DC2626] hover:bg-[#FEF2F2] transition-colors">
                <LogoutIcon size={16} />
                Disconnect
              </button>
            </div>
          </div>
        ))}

        {/* Add New Platform Card */}
        <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 bg-white border-2 border-dashed border-[#E5E7EB] rounded-2xl cursor-pointer hover:border-[#6366F1] hover:bg-[#FAFAFF] transition-all">
          <div className="w-16 h-16 bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] rounded-2xl flex items-center justify-center">
            <PlusIcon size={28} className="text-[#6366F1]" />
          </div>
          <div className="text-center">
            <div className="text-base font-semibold text-[#1F2937] mb-1">Connect Another Platform</div>
            <div className="text-sm text-[#6B7280]">Add more social accounts to expand your reach</div>
          </div>
        </div>
      </div>
    </div>
  );
}
