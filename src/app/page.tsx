'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  PlusIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  LightningIcon,
  CalendarIcon,
  ImageIcon,
  ChartIcon,
  CheckIcon,
  XIcon,
  PlayIcon,
} from '@/components/icons';

// Sample posts data
const upcomingPosts = [
  {
    id: '1',
    day: 'Today',
    time: '3:00 PM',
    platforms: ['twitter', 'linkedin'],
    content: 'Excited to share our latest feature update! The new dashboard makes tracking your social performance easier than ever...',
    status: 'scheduled',
    isAiGenerated: true,
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
      filename: 'dashboard-preview.jpg',
      dimensions: '1200 x 800 px',
      size: '245 KB',
    },
  },
  {
    id: '2',
    day: 'Tomorrow',
    time: '10:00 AM',
    platforms: ['instagram'],
    content: 'Monday motivation: Building something you believe in is the best feeling. What are you working on this week?',
    status: 'scheduled',
    isAiGenerated: false,
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop',
      filename: 'team-motivation.mp4',
      duration: '0:45',
      dimensions: '1920 x 1080',
      size: '12.4 MB',
    },
  },
  {
    id: '3',
    day: 'Wed',
    time: '2:30 PM',
    platforms: ['twitter'],
    content: 'Quick tip: Consistency beats perfection every time. Show up, share value, and watch your audience grow...',
    status: 'draft',
    isAiGenerated: false,
    media: null,
  },
];

const recentActivity = [
  { id: '1', type: 'success', message: 'Post published to Twitter', time: '2 hours ago' },
  { id: '2', type: 'info', message: 'AI generated 3 new posts', time: '5 hours ago' },
  { id: '3', type: 'success', message: 'LinkedIn account connected', time: 'Yesterday' },
];

const platformConnections = [
  { id: 'twitter', name: 'Twitter/X', handle: '@postpilot', connected: true },
  { id: 'linkedin', name: 'LinkedIn', handle: 'Ben M.', connected: true },
  { id: 'instagram', name: 'Instagram', handle: '@postpilot', connected: true },
];

interface MediaType {
  type: string;
  url: string;
  filename: string;
  dimensions: string;
  size: string;
  duration?: string;
}

export default function Dashboard() {
  const [selectedMedia, setSelectedMedia] = useState<MediaType | null>(null);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <TwitterIcon size={14} className="text-black" />;
      case 'linkedin':
        return <LinkedInIcon size={14} />;
      case 'instagram':
        return <InstagramIcon size={14} />;
      default:
        return null;
    }
  };

  const getPlatformBg = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'bg-[#F3F4F6]';
      case 'linkedin':
        return 'bg-[#EFF6FF]';
      case 'instagram':
        return 'bg-[#FDF2F8]';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="py-8 px-10 max-w-[1200px]">
      {/* Header */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1F2937] mb-1">Good afternoon, Ben!</h1>
          <p className="text-[15px] text-[#6B7280]">You have 3 posts scheduled for this week. Keep up the great work!</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-xl text-[15px] font-semibold hover:translate-y-[-2px] hover:shadow-lg transition-all shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
          <PlusIcon size={20} />
          Create Post
        </button>
      </header>

      {/* Connected Platforms Bar */}
      <div className="flex items-center gap-3 p-4 px-5 bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-8">
        <span className="text-[13px] font-medium text-[#6B7280]">Connected:</span>
        {platformConnections.map((platform) => (
          <div
            key={platform.id}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F9FAFB] rounded-full text-[13px] font-medium text-[#374151]"
          >
            {platform.id === 'twitter' && <TwitterIcon size={16} className="text-black" />}
            {platform.id === 'linkedin' && <LinkedInIcon size={16} />}
            {platform.id === 'instagram' && <InstagramIcon size={16} />}
            <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
            {platform.handle}
          </div>
        ))}
        <button className="flex items-center gap-1 px-3 py-1.5 bg-transparent border border-dashed border-[#D1D5DB] rounded-full text-[13px] font-medium text-[#6B7280] hover:border-[#6366F1] hover:text-[#6366F1] transition-colors">
          <PlusIcon size={14} />
          Add Platform
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Upcoming Posts */}
        <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
            <h2 className="text-base font-semibold text-[#1F2937]">Upcoming Posts</h2>
            <button className="text-[13px] font-medium text-[#6366F1] hover:underline">View All</button>
          </div>
          <div className="p-2">
            {upcomingPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-start gap-4 p-4 rounded-[10px] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
              >
                {/* Time */}
                <div className="text-center min-w-[50px]">
                  <div className="text-xs font-medium text-[#6B7280] mb-0.5">{post.day}</div>
                  <div className="text-sm font-semibold text-[#1F2937]">{post.time}</div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Platforms */}
                  <div className="flex gap-1.5 mb-2">
                    {post.platforms.map((platform) => (
                      <div
                        key={platform}
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${getPlatformBg(platform)}`}
                      >
                        {getPlatformIcon(platform)}
                      </div>
                    ))}
                  </div>

                  {/* Body */}
                  <div className="flex gap-3">
                    {/* Media Preview (on left) */}
                    {post.media && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedia(post.media as MediaType);
                        }}
                        className="relative w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0 bg-[#F3F4F6] cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all"
                      >
                        <Image
                          src={post.media.url}
                          alt="Media preview"
                          fill
                          className="object-cover"
                        />
                        {post.media.type === 'video' && (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-7 h-7 bg-black/60 rounded-full flex items-center justify-center">
                                <PlayIcon size={10} className="text-white ml-0.5" />
                              </div>
                            </div>
                            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1">
                              <PlayIcon size={8} />
                              {post.media.duration}
                            </div>
                          </>
                        )}
                        {post.media.type === 'image' && (
                          <div className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1">
                            <ImageIcon size={10} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#374151] leading-relaxed line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          post.status === 'scheduled' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#F3F4F6] text-[#6B7280]'
                        }`}>
                          {post.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                        </span>
                        {post.isAiGenerated && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EDE9FE] text-[#7C3AED] rounded-full text-xs font-medium">
                            AI Generated
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="p-5 px-6">
              <h3 className="text-sm font-semibold text-[#1F2937] mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: LightningIcon, label: 'AI Generate' },
                  { icon: CalendarIcon, label: 'Schedule' },
                  { icon: ImageIcon, label: 'Add Media' },
                  { icon: ChartIcon, label: 'Analytics' },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className="flex flex-col items-center gap-2 p-4 bg-[#F9FAFB] rounded-[10px] hover:bg-[#EEF2FF] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center">
                        <Icon size={18} className="text-[#6366F1]" />
                      </div>
                      <span className="text-[13px] font-medium text-[#374151]">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
              <h2 className="text-base font-semibold text-[#1F2937]">Recent Activity</h2>
            </div>
            <div className="p-2">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 px-4 py-3 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#EEF2FF] text-[#6366F1]'
                  }`}>
                    {activity.type === 'success' ? <CheckIcon size={16} /> : <LightningIcon size={16} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] text-[#374151]">{activity.message}</div>
                    <div className="text-xs text-[#9CA3AF]">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-10"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-w-[800px] max-h-[80vh] bg-white rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-10 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <XIcon size={18} className="text-[#374151]" />
            </button>
            <div className="relative w-full" style={{ maxHeight: '70vh' }}>
              <Image
                src={selectedMedia.url.replace('w=150&h=150', 'w=800&h=600')}
                alt="Media preview"
                width={800}
                height={600}
                className="object-contain w-full h-auto"
              />
            </div>
            <div className="p-4 px-5 bg-[#F9FAFB] border-t border-[#E5E7EB]">
              <div className="text-sm font-medium text-[#1F2937]">{selectedMedia.filename}</div>
              <div className="text-xs text-[#6B7280] mt-1">
                {selectedMedia.type === 'video' && `${selectedMedia.duration} - `}
                {selectedMedia.dimensions} - {selectedMedia.size}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
