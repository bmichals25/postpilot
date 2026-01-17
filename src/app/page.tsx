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
import NewPostModal from '@/components/modals/NewPostModal';

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
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <TwitterIcon size={14} />;
      case 'linkedin':
        return <LinkedInIcon size={14} />;
      case 'instagram':
        return <InstagramIcon size={14} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="greeting">
          <h1>Good afternoon, Ben!</h1>
          <p>You have 3 posts scheduled for this week. Keep up the great work!</p>
        </div>
        <button className="create-btn" onClick={() => setIsNewPostOpen(true)}>
          <PlusIcon size={20} />
          Create Post
        </button>
      </header>

      {/* Connected Platforms Bar */}
      <div className="platforms-bar">
        <span className="platforms-label">Connected:</span>
        {platformConnections.map((platform) => (
          <div key={platform.id} className="platform-pill">
            {platform.id === 'twitter' && <TwitterIcon size={16} />}
            {platform.id === 'linkedin' && <LinkedInIcon size={16} />}
            {platform.id === 'instagram' && <InstagramIcon size={16} />}
            <span className="status-dot" />
            {platform.handle}
          </div>
        ))}
        <button className="add-platform">
          <PlusIcon size={14} />
          Add Platform
        </button>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Upcoming Posts */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Upcoming Posts</h2>
            <button className="card-action">View All</button>
          </div>
          <div className="schedule-list">
            {upcomingPosts.map((post) => (
              <div key={post.id} className="schedule-item">
                {/* Time */}
                <div className="schedule-time">
                  <div className="schedule-day">{post.day}</div>
                  <div className="schedule-hour">{post.time}</div>
                </div>

                {/* Content */}
                <div className="schedule-content">
                  {/* Platforms */}
                  <div className="schedule-platforms">
                    {post.platforms.map((platform) => (
                      <div
                        key={platform}
                        className={`schedule-platform-icon ${platform}`}
                      >
                        {getPlatformIcon(platform)}
                      </div>
                    ))}
                  </div>

                  {/* Body */}
                  <div className="schedule-body">
                    {/* Media Preview (on left) */}
                    {post.media && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedia(post.media as MediaType);
                        }}
                        className="media-preview"
                      >
                        <Image
                          src={post.media.url}
                          alt="Media preview"
                          fill
                          className="object-cover"
                        />
                        {post.media.type === 'video' && (
                          <div className="video-overlay">
                            <PlayIcon size={10} />
                          </div>
                        )}
                        <div className="media-badge">
                          {post.media.type === 'video' ? (
                            <>
                              <PlayIcon size={8} />
                              {post.media.duration}
                            </>
                          ) : (
                            <ImageIcon size={10} />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Text */}
                    <div className="schedule-text-wrap">
                      <p className="schedule-text">{post.content}</p>
                      <div className="schedule-status">
                        <span className={`status-badge ${post.status}`}>
                          {post.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                        </span>
                        {post.isAiGenerated && (
                          <span className="status-badge ai">AI Generated</span>
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
        <div className="right-column">
          {/* Quick Actions */}
          <div className="card">
            <div className="quick-actions">
              <h3 className="quick-actions-title">Quick Actions</h3>
              <div className="quick-actions-grid">
                {[
                  { icon: LightningIcon, label: 'AI Generate' },
                  { icon: CalendarIcon, label: 'Schedule' },
                  { icon: ImageIcon, label: 'Add Media' },
                  { icon: ChartIcon, label: 'Analytics' },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button key={action.label} className="quick-action-btn">
                      <div className="quick-action-icon">
                        <Icon size={18} />
                      </div>
                      <span className="quick-action-label">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Recent Activity</h2>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'success' ? (
                      <CheckIcon size={16} />
                    ) : (
                      <LightningIcon size={16} />
                    )}
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">{activity.message}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div className="media-modal" onClick={() => setSelectedMedia(null)}>
          <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedMedia(null)}
              className="media-modal-close"
            >
              <XIcon size={18} />
            </button>
            <Image
              src={selectedMedia.url.replace('w=150&h=150', 'w=800&h=600')}
              alt="Media preview"
              width={800}
              height={600}
            />
            <div className="media-modal-info">
              <div className="media-modal-filename">{selectedMedia.filename}</div>
              <div className="media-modal-meta">
                {selectedMedia.type === 'video' && `${selectedMedia.duration} - `}
                {selectedMedia.dimensions} - {selectedMedia.size}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSubmit={(post) => {
          console.log('New post submitted:', post);
          // In production, this would call an API to create/schedule the post
          setIsNewPostOpen(false);
        }}
      />
    </>
  );
}
