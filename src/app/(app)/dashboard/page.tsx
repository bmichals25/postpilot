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
  LightningIcon,
  CalendarIcon,
  ImageIcon,
  ChartIcon,
  CheckIcon,
  XIcon,
  PlayIcon,
} from '@/components/icons';
import NewPostModal from '@/components/modals/NewPostModal';

interface MediaType {
  type: string;
  url: string;
  filename: string;
  dimensions: string;
  size: string;
  duration?: string;
}

export default function Dashboard() {
  const { currentWorkspace, connections, loading: workspaceLoading } = useWorkspaceContext();
  const { posts, loading: postsLoading } = usePosts(currentWorkspace?.id);
  const [selectedMedia, setSelectedMedia] = useState<MediaType | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  // Transform posts to upcoming posts format
  const upcomingPosts = useMemo(() => {
    return posts
      .filter(p => p.status === 'scheduled' || p.status === 'draft')
      .slice(0, 5)
      .map(post => {
        const scheduledDate = post.scheduled_at ? new Date(post.scheduled_at) : new Date();
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let day = scheduledDate.toLocaleDateString('en-US', { weekday: 'short' });
        if (scheduledDate.toDateString() === today.toDateString()) day = 'Today';
        else if (scheduledDate.toDateString() === tomorrow.toDateString()) day = 'Tomorrow';

        return {
          id: post.id,
          day,
          time: scheduledDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          platforms: post.platforms,
          content: post.content,
          status: post.status,
          isAiGenerated: post.ai_generated,
          media: post.media_url ? {
            type: 'image',
            url: post.media_url,
            filename: 'media',
            dimensions: '',
            size: '',
            duration: undefined,
          } : null,
        };
      });
  }, [posts]);

  // Transform connections to platform format
  const platformConnections = useMemo(() => {
    return connections.map(conn => ({
      id: conn.platform,
      name: conn.platform === 'twitter' ? 'Twitter/X' : conn.platform.charAt(0).toUpperCase() + conn.platform.slice(1),
      handle: conn.platform_username || conn.platform_user_id,
      connected: conn.status === 'active',
    }));
  }, [connections]);

  // Keep recent activity as mock for now (would need activity log table)
  const recentActivity = [
    { id: '1', type: 'success', message: 'Post published to Twitter', time: '2 hours ago' },
    { id: '2', type: 'info', message: 'AI generated 3 new posts', time: '5 hours ago' },
    { id: '3', type: 'success', message: 'LinkedIn account connected', time: 'Yesterday' },
  ];

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Get user name from workspace
  const userName = currentWorkspace?.name?.split(' ')[0] || 'there';

  // Calculate scheduled posts count
  const scheduledPostsCount = posts.filter(p => p.status === 'scheduled').length;

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

  const loading = workspaceLoading || postsLoading;

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="greeting">
          <h1>{getGreeting()}, {userName}!</h1>
          <p>
            {loading
              ? 'Loading your posts...'
              : scheduledPostsCount > 0
                ? `You have ${scheduledPostsCount} post${scheduledPostsCount === 1 ? '' : 's'} scheduled. Keep up the great work!`
                : 'No posts scheduled yet. Ready to create one?'}
          </p>
        </div>
        <button className="create-btn" onClick={() => setIsNewPostOpen(true)}>
          <PlusIcon size={20} />
          Create Post
        </button>
      </header>

      {/* Connected Platforms Bar */}
      <div className="platforms-bar">
        <span className="platforms-label">Connected:</span>
        {platformConnections.length === 0 ? (
          <span className="no-platforms">No platforms connected yet</span>
        ) : (
          platformConnections.map((platform) => (
            <div key={platform.id} className="platform-pill">
              {platform.id === 'twitter' && <TwitterIcon size={16} />}
              {platform.id === 'linkedin' && <LinkedInIcon size={16} />}
              {platform.id === 'instagram' && <InstagramIcon size={16} />}
              <span className="status-dot" />
              {platform.handle}
            </div>
          ))
        )}
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
            {loading ? (
              <div className="empty-state">
                <p>Loading posts...</p>
              </div>
            ) : upcomingPosts.length === 0 ? (
              <div className="empty-state">
                <p>No upcoming posts scheduled.</p>
                <button className="create-btn-small" onClick={() => setIsNewPostOpen(true)}>
                  <PlusIcon size={16} />
                  Create your first post
                </button>
              </div>
            ) : (
              upcomingPosts.map((post) => (
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
              ))
            )}
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
