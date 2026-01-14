'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  PlusIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from '@/components/icons';

// Sample calendar data
const weekDays = [
  { day: 'Mon', date: 13, isToday: false },
  { day: 'Tue', date: 14, isToday: true },
  { day: 'Wed', date: 15, isToday: false },
  { day: 'Thu', date: 16, isToday: false },
  { day: 'Fri', date: 17, isToday: false },
  { day: 'Sat', date: 18, isToday: false },
  { day: 'Sun', date: 19, isToday: false },
];

const calendarPosts: Record<number, Array<{
  id: string;
  time: string;
  content: string;
  platforms: string[];
  media?: { type: string; url: string };
  isDraft?: boolean;
}>> = {
  13: [
    {
      id: '1',
      time: '9:00 AM',
      content: 'Excited to share our latest feature update! The new dashboard makes tracking easier...',
      platforms: ['twitter', 'linkedin'],
      media: { type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop' },
    },
  ],
  14: [
    {
      id: '2',
      time: '10:00 AM',
      content: 'Monday motivation: Building something you believe in is the best feeling...',
      platforms: ['instagram'],
      media: { type: 'video', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop' },
    },
    {
      id: '3',
      time: '3:00 PM',
      content: 'Quick tip: Consistency beats perfection every time. Show up and share value!',
      platforms: ['twitter'],
    },
  ],
  15: [
    {
      id: '4',
      time: '2:30 PM',
      content: 'Behind the scenes look at how we build our products. Thread incoming...',
      platforms: ['twitter'],
      media: { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop' },
      isDraft: true,
    },
  ],
  16: [
    {
      id: '5',
      time: '11:00 AM',
      content: "We're hiring! Looking for passionate engineers to join our team. DM for details.",
      platforms: ['linkedin'],
    },
  ],
  17: [
    {
      id: '6',
      time: '4:00 PM',
      content: 'Friday wins! What did you accomplish this week? Share below!',
      platforms: ['twitter', 'linkedin'],
      media: { type: 'image', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop' },
    },
  ],
  19: [
    {
      id: '7',
      time: '7:00 PM',
      content: 'Week ahead preview: Big announcements coming. Stay tuned!',
      platforms: ['twitter'],
    },
  ],
};

export default function SchedulePage() {
  const [activeView, setActiveView] = useState<'week' | 'month'>('week');
  const [activePlatforms, setActivePlatforms] = useState(['twitter', 'linkedin', 'instagram']);

  const togglePlatform = (platform: string) => {
    if (activePlatforms.includes(platform)) {
      setActivePlatforms(activePlatforms.filter((p) => p !== platform));
    } else {
      setActivePlatforms([...activePlatforms, platform]);
    }
  };

  const getPlatformIcon = (platform: string, size = 12) => {
    switch (platform) {
      case 'twitter':
        return <TwitterIcon size={size} className="text-black" />;
      case 'linkedin':
        return <LinkedInIcon size={size} />;
      case 'instagram':
        return <InstagramIcon size={size} />;
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
    <div className="p-6 px-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Schedule</h1>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-[#F3F4F6] rounded-lg p-1">
            <button
              onClick={() => setActiveView('week')}
              className={`px-4 py-2 text-[13px] font-medium rounded-md transition-all ${
                activeView === 'week'
                  ? 'bg-white text-[#1F2937] shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[#6B7280]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveView('month')}
              className={`px-4 py-2 text-[13px] font-medium rounded-md transition-all ${
                activeView === 'month'
                  ? 'bg-white text-[#1F2937] shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[#6B7280]'
              }`}
            >
              Month
            </button>
          </div>

          {/* Create Post Button */}
          <button className="flex items-center gap-2 px-5 py-2.5 gradient-primary text-white rounded-[10px] text-sm font-semibold hover:translate-y-[-1px] hover:shadow-lg transition-all shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
            <PlusIcon size={18} />
            Create Post
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          {/* Nav Arrows */}
          <div className="flex gap-1">
            <button className="w-9 h-9 border border-[#E5E7EB] bg-white rounded-lg flex items-center justify-center hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all">
              <ChevronLeftIcon size={18} className="text-[#6B7280]" />
            </button>
            <button className="w-9 h-9 border border-[#E5E7EB] bg-white rounded-lg flex items-center justify-center hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all">
              <ChevronRightIcon size={18} className="text-[#6B7280]" />
            </button>
          </div>

          {/* Today Button */}
          <button className="px-4 py-2 border border-[#E5E7EB] bg-white rounded-lg text-[13px] font-medium text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all">
            Today
          </button>

          {/* Current Range */}
          <span className="text-lg font-semibold text-[#1F2937]">January 13 - 19, 2026</span>
        </div>

        {/* Platform Filters */}
        <div className="flex gap-2">
          {['twitter', 'linkedin', 'instagram'].map((platform) => (
            <button
              key={platform}
              onClick={() => togglePlatform(platform)}
              className={`w-9 h-9 border rounded-lg flex items-center justify-center transition-all ${
                activePlatforms.includes(platform)
                  ? 'border-[#6366F1] bg-[#EEF2FF] opacity-100'
                  : 'border-[#E5E7EB] bg-white opacity-50 hover:opacity-100'
              }`}
            >
              {getPlatformIcon(platform, 18)}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-[#F3F4F6]">
          {weekDays.map((day) => (
            <div key={day.day} className="p-4 text-center border-r border-[#F3F4F6] last:border-r-0">
              <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">{day.day}</div>
              <div className={`text-2xl font-semibold mt-1 ${
                day.isToday
                  ? 'w-10 h-10 gradient-primary text-white rounded-full inline-flex items-center justify-center'
                  : 'text-[#1F2937]'
              }`}>
                {day.date}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7" style={{ minHeight: '500px' }}>
          {weekDays.map((day) => {
            const posts = calendarPosts[day.date] || [];
            const filteredPosts = posts.filter((post) =>
              post.platforms.some((p) => activePlatforms.includes(p))
            );

            return (
              <div
                key={day.day}
                className={`border-r border-[#F3F4F6] last:border-r-0 p-2 flex flex-col gap-2 ${
                  day.isToday ? 'bg-[#FAFAFA]' : ''
                }`}
                style={{ minHeight: '500px' }}
              >
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-2.5 rounded-lg cursor-pointer transition-all hover:bg-[#F3F4F6] hover:translate-y-[-1px] ${
                      post.isDraft ? 'bg-[#F9FAFB] border-l-[3px] border-l-[#F59E0B]' : 'bg-[#F9FAFB]'
                    }`}
                  >
                    {/* Time */}
                    <div className="text-[11px] font-semibold text-[#6B7280] mb-1.5">{post.time}</div>

                    {/* Content */}
                    <div className="flex gap-2">
                      {/* Media */}
                      {post.media && (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={post.media.url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                          {post.media.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-5 h-5 bg-black/60 rounded-full flex items-center justify-center">
                                <PlayIcon size={8} className="text-white ml-0.5" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#374151] leading-relaxed line-clamp-2">{post.content}</p>
                      </div>
                    </div>

                    {/* Platforms */}
                    <div className="flex gap-1 mt-2">
                      {post.platforms.map((platform) => (
                        <div
                          key={platform}
                          className={`w-5 h-5 rounded flex items-center justify-center ${getPlatformBg(platform)}`}
                        >
                          {getPlatformIcon(platform)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Add Post Slot */}
                <button className="flex items-center justify-center gap-1.5 p-2 border border-dashed border-[#D1D5DB] rounded-lg text-[#9CA3AF] text-xs hover:border-[#6366F1] hover:text-[#6366F1] hover:bg-[#EEF2FF] transition-all mt-auto">
                  <PlusIcon size={14} />
                  Add post
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
