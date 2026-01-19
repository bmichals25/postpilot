'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import { usePosts } from '@/hooks/useWorkspaces';
import {
  PlusIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/icons';

// Day names
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Format time from ISO string
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// Format date range string
function formatDateRange(startDate: Date, endDate: Date): string {
  const startMonth = startDate.toLocaleString('en-US', { month: 'long' });
  const endMonth = endDate.toLocaleString('en-US', { month: 'long' });
  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDate.getDate()} - ${endDate.getDate()}, ${year}`;
  }
  return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${year}`;
}

export default function SchedulePage() {
  const { currentWorkspace, connections } = useWorkspaceContext();
  const { posts, loading } = usePosts(currentWorkspace?.id);

  const [activeView, setActiveView] = useState<'week' | 'month'>('week');
  const [activePlatforms, setActivePlatforms] = useState(['twitter', 'linkedin', 'instagram']);
  const [weekOffset, setWeekOffset] = useState(0);

  // Get the week dates based on offset
  const weekDates = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    // Get Monday of current week
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Sunday
    startOfWeek.setDate(today.getDate() + diff + (weekOffset * 7));
    startOfWeek.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }, [weekOffset]);

  // Check if a date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Transform posts to calendar format grouped by date key
  const calendarPosts = useMemo(() => {
    const grouped: Record<string, typeof posts> = {};

    for (const post of posts) {
      if (!post.scheduled_at) continue;
      const postDate = new Date(post.scheduled_at);
      // Create a date key like "2026-01-15" for consistent grouping
      const dateKey = `${postDate.getFullYear()}-${String(postDate.getMonth() + 1).padStart(2, '0')}-${String(postDate.getDate()).padStart(2, '0')}`;

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(post);
    }

    return grouped;
  }, [posts]);

  // Get the available platforms from connections
  const availablePlatforms = useMemo(() => {
    const platforms = connections.map(c => c.platform.toLowerCase());
    // Default to standard platforms if no connections
    if (platforms.length === 0) {
      return ['twitter', 'linkedin', 'instagram'];
    }
    return [...new Set(platforms)];
  }, [connections]);

  const togglePlatform = (platform: string) => {
    if (activePlatforms.includes(platform)) {
      setActivePlatforms(activePlatforms.filter((p) => p !== platform));
    } else {
      setActivePlatforms([...activePlatforms, platform]);
    }
  };

  const goToPreviousWeek = () => setWeekOffset(prev => prev - 1);
  const goToNextWeek = () => setWeekOffset(prev => prev + 1);
  const goToToday = () => setWeekOffset(0);

  // Date range display
  const dateRange = formatDateRange(weekDates[0], weekDates[6]);

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
            <button className="nav-arrow" onClick={goToPreviousWeek}>
              <ChevronLeftIcon size={18} />
            </button>
            <button className="nav-arrow" onClick={goToNextWeek}>
              <ChevronRightIcon size={18} />
            </button>
          </div>

          {/* Today Button */}
          <button className="today-btn" onClick={goToToday}>Today</button>

          {/* Current Range */}
          <span className="current-range">{dateRange}</span>
        </div>

        {/* Platform Filters */}
        <div className="platform-filters">
          {availablePlatforms.map((platform) => (
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

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Calendar Grid */}
      {!loading && (
        <div className="calendar-container">
          {/* Calendar Header */}
          <div className="calendar-header">
            {weekDates.map((date, index) => (
              <div key={index} className={`calendar-header-cell ${isToday(date) ? 'today' : ''}`}>
                <div className="day-name">{dayNames[date.getDay()]}</div>
                <div className="day-number">{date.getDate()}</div>
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="calendar-body">
            {weekDates.map((date, index) => {
              const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              const dayPosts = calendarPosts[dateKey] || [];
              const filteredPosts = dayPosts.filter((post) =>
                post.platforms.some((p) => activePlatforms.includes(p.toLowerCase()))
              );

              return (
                <div
                  key={index}
                  className={`calendar-day ${isToday(date) ? 'today' : ''}`}
                >
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`post-card ${post.status === 'draft' ? 'draft' : ''}`}
                    >
                      {/* Time */}
                      <div className="post-time">
                        {post.scheduled_at ? formatTime(post.scheduled_at) : 'No time'}
                      </div>

                      {/* Content */}
                      <div className="post-content">
                        {/* Media */}
                        {post.media_url && (
                          <div className="post-media">
                            <Image
                              src={post.media_url}
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
                          <div key={platform} className={`post-platform ${platform.toLowerCase()}`}>
                            {platform.toLowerCase() === 'twitter' && <TwitterIcon size={12} className="text-black" />}
                            {platform.toLowerCase() === 'linkedin' && <LinkedInIcon size={12} />}
                            {platform.toLowerCase() === 'instagram' && <InstagramIcon size={12} />}
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
      )}
    </div>
  );
}
