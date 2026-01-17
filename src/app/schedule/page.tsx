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

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Schedule</h1>
        <div className="header-actions">
          {/* View Toggle */}
          <div className="view-toggle">
            <button
              onClick={() => setActiveView('week')}
              className={`view-btn ${activeView === 'week' ? 'active' : ''}`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveView('month')}
              className={`view-btn ${activeView === 'month' ? 'active' : ''}`}
            >
              Month
            </button>
          </div>

          {/* Create Post Button */}
          <button className="create-btn">
            <PlusIcon size={18} />
            Create Post
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="calendar-nav">
        <div className="calendar-nav-left">
          {/* Nav Arrows */}
          <div className="nav-arrows">
            <button className="nav-arrow">
              <ChevronLeftIcon size={18} />
            </button>
            <button className="nav-arrow">
              <ChevronRightIcon size={18} />
            </button>
          </div>

          {/* Today Button */}
          <button className="today-btn">Today</button>

          {/* Current Range */}
          <span className="current-range">January 13 - 19, 2026</span>
        </div>

        {/* Platform Filters */}
        <div className="platform-filters">
          {['twitter', 'linkedin', 'instagram'].map((platform) => (
            <button
              key={platform}
              onClick={() => togglePlatform(platform)}
              className={`platform-filter ${activePlatforms.includes(platform) ? 'active' : ''}`}
            >
              {platform === 'twitter' && <TwitterIcon size={18} className="text-black" />}
              {platform === 'linkedin' && <LinkedInIcon size={18} />}
              {platform === 'instagram' && <InstagramIcon size={18} />}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-container">
        {/* Calendar Header */}
        <div className="calendar-header">
          {weekDays.map((day) => (
            <div key={day.day} className={`calendar-header-cell ${day.isToday ? 'today' : ''}`}>
              <div className="day-name">{day.day}</div>
              <div className="day-number">{day.date}</div>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="calendar-body">
          {weekDays.map((day) => {
            const posts = calendarPosts[day.date] || [];
            const filteredPosts = posts.filter((post) =>
              post.platforms.some((p) => activePlatforms.includes(p))
            );

            return (
              <div
                key={day.day}
                className={`calendar-day ${day.isToday ? 'today' : ''}`}
              >
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`post-card ${post.isDraft ? 'draft' : ''}`}
                  >
                    {/* Time */}
                    <div className="post-time">{post.time}</div>

                    {/* Content */}
                    <div className="post-content">
                      {/* Media */}
                      {post.media && (
                        <div className={`post-media ${post.media.type === 'video' ? 'video' : ''}`}>
                          <Image
                            src={post.media.url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Text */}
                      <div className="post-text">{post.content}</div>
                    </div>

                    {/* Platforms */}
                    <div className="post-platforms">
                      {post.platforms.map((platform) => (
                        <div key={platform} className={`post-platform ${platform}`}>
                          {platform === 'twitter' && <TwitterIcon size={12} className="text-black" />}
                          {platform === 'linkedin' && <LinkedInIcon size={12} />}
                          {platform === 'instagram' && <InstagramIcon size={12} />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Add Post Slot */}
                <button className="add-post-slot">
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
