'use client';

import React from 'react';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import {
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  TrendUpIcon,
  TrendDownIcon,
  HeartIcon,
  CommentIcon,
  ShareIcon,
  EyeIcon,
  UsersIcon,
  CalendarIcon,
  ChevronDownIcon
} from '@/components/icons';

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

export default function AnalyticsPage() {
  const { currentWorkspace } = useWorkspaceContext();
  const {
    overviewStats,
    platformStats,
    engagementByDay,
    topPosts,
    postingTimes,
    loading
  } = useAnalytics(currentWorkspace?.id);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  // No workspace selected
  if (!currentWorkspace) {
    return (
      <div className="empty-state">
        <h2>No Workspace Selected</h2>
        <p>Please select a workspace to view analytics.</p>
      </div>
    );
  }

  // No data available
  if (!overviewStats) {
    return (
      <div className="empty-state">
        <h2>No Analytics Data</h2>
        <p>Start posting to see your analytics here.</p>
      </div>
    );
  }

  const maxEngagement = Math.max(
    ...engagementByDay.flatMap(d => [d.twitter, d.linkedin, d.instagram])
  );

  // Helper to get platform stats by platform name
  const getPlatformStat = (platform: 'twitter' | 'linkedin' | 'instagram') => {
    return platformStats.find(p => p.platform === platform);
  };

  const twitterStats = getPlatformStat('twitter');
  const linkedinStats = getPlatformStat('linkedin');
  const instagramStats = getPlatformStat('instagram');

  return (
    <div>
      {/* Header */}
      <div className="analytics-header">
        <div className="analytics-header-row">
          <div>
            <h1>Analytics</h1>
            <p>Track your social media performance across all platforms</p>
          </div>
          <button className="date-range-selector">
            <CalendarIcon size={18} />
            <span>Last 7 days</span>
            <ChevronDownIcon size={16} />
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon purple">
              <UsersIcon size={22} />
            </div>
          </div>
          <div className="stat-value">{formatNumber(overviewStats.totalFollowers)}</div>
          <div className="stat-label">Total Followers</div>
          <div className={`trend-indicator ${overviewStats.followerGrowth >= 0 ? 'up' : 'down'}`}>
            {overviewStats.followerGrowth >= 0 ? <TrendUpIcon size={14} /> : <TrendDownIcon size={14} />}
            {Math.abs(overviewStats.followerGrowth)}%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon green">
              <HeartIcon size={22} />
            </div>
          </div>
          <div className="stat-value">{formatNumber(overviewStats.totalEngagement)}</div>
          <div className="stat-label">Total Engagement</div>
          <div className={`trend-indicator ${overviewStats.engagementGrowth >= 0 ? 'up' : 'down'}`}>
            {overviewStats.engagementGrowth >= 0 ? <TrendUpIcon size={14} /> : <TrendDownIcon size={14} />}
            {Math.abs(overviewStats.engagementGrowth)}%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon blue">
              <EyeIcon size={22} />
            </div>
          </div>
          <div className="stat-value">{overviewStats.engagementRate}%</div>
          <div className="stat-label">Engagement Rate</div>
          <div className={`trend-indicator ${overviewStats.engagementRateChange >= 0 ? 'up' : 'down'}`}>
            {overviewStats.engagementRateChange >= 0 ? <TrendUpIcon size={14} /> : <TrendDownIcon size={14} />}
            {Math.abs(overviewStats.engagementRateChange)}%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon yellow">
              <CalendarIcon size={22} />
            </div>
          </div>
          <div className="stat-value">{overviewStats.postsPublished}</div>
          <div className="stat-label">Posts Published</div>
          <div className={`trend-indicator ${overviewStats.postsChange >= 0 ? 'up' : 'down'}`}>
            {overviewStats.postsChange >= 0 ? <TrendUpIcon size={14} /> : <TrendDownIcon size={14} />}
            {Math.abs(overviewStats.postsChange)}
          </div>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="platform-performance-grid">
        {/* Twitter */}
        {twitterStats && (
          <div className="platform-perf-card">
            <div className="platform-perf-header">
              <div className="platform-perf-logo twitter">
                <TwitterIcon size={24} />
              </div>
              <div className="platform-perf-info">
                <h3>Twitter</h3>
                <div className="platform-perf-followers">
                  <span>{formatNumber(twitterStats.followers)} followers</span>
                  <span className="follower-growth">+{twitterStats.growth}%</span>
                </div>
              </div>
            </div>
            <div className="platform-metrics">
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <HeartIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{formatNumber(twitterStats.likes)}</div>
                  <div className="platform-metric-label">Likes</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <ShareIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{twitterStats.shares}</div>
                  <div className="platform-metric-label">Retweets</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <CommentIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{twitterStats.comments}</div>
                  <div className="platform-metric-label">Replies</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <EyeIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{formatNumber(twitterStats.impressions)}</div>
                  <div className="platform-metric-label">Impressions</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LinkedIn */}
        {linkedinStats && (
          <div className="platform-perf-card">
            <div className="platform-perf-header">
              <div className="platform-perf-logo linkedin">
                <LinkedInIcon size={24} />
              </div>
              <div className="platform-perf-info">
                <h3>LinkedIn</h3>
                <div className="platform-perf-followers">
                  <span>{formatNumber(linkedinStats.followers)} followers</span>
                  <span className="follower-growth">+{linkedinStats.growth}%</span>
                </div>
              </div>
            </div>
            <div className="platform-metrics">
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <HeartIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{linkedinStats.likes}</div>
                  <div className="platform-metric-label">Likes</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <ShareIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{linkedinStats.shares}</div>
                  <div className="platform-metric-label">Shares</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <CommentIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{linkedinStats.comments}</div>
                  <div className="platform-metric-label">Comments</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <EyeIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{formatNumber(linkedinStats.impressions)}</div>
                  <div className="platform-metric-label">Impressions</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instagram */}
        {instagramStats && (
          <div className="platform-perf-card">
            <div className="platform-perf-header">
              <div className="platform-perf-logo instagram">
                <InstagramIcon size={24} />
              </div>
              <div className="platform-perf-info">
                <h3>Instagram</h3>
                <div className="platform-perf-followers">
                  <span>{formatNumber(instagramStats.followers)} followers</span>
                  <span className="follower-growth">+{instagramStats.growth}%</span>
                </div>
              </div>
            </div>
            <div className="platform-metrics">
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <HeartIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{formatNumber(instagramStats.likes)}</div>
                  <div className="platform-metric-label">Likes</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <ShareIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{instagramStats.shares}</div>
                  <div className="platform-metric-label">Saves</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <CommentIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{instagramStats.comments}</div>
                  <div className="platform-metric-label">Comments</div>
                </div>
              </div>
              <div className="platform-metric">
                <div className="platform-metric-icon">
                  <EyeIcon size={16} />
                </div>
                <div>
                  <div className="platform-metric-value">{formatNumber(instagramStats.impressions)}</div>
                  <div className="platform-metric-label">Impressions</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Engagement Chart */}
      <div className="chart-section">
        <div className="chart-header">
          <h2>Engagement This Week</h2>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot twitter"></div>
              Twitter
            </div>
            <div className="legend-item">
              <div className="legend-dot linkedin"></div>
              LinkedIn
            </div>
            <div className="legend-item">
              <div className="legend-dot instagram"></div>
              Instagram
            </div>
          </div>
        </div>
        <div className="chart-container">
          {engagementByDay.map((day) => (
            <div key={day.day} className="chart-bar-group">
              <div className="chart-bars">
                <div
                  className="chart-bar twitter"
                  style={{ height: `${(day.twitter / maxEngagement) * 160}px` }}
                  title={`Twitter: ${day.twitter}`}
                />
                <div
                  className="chart-bar linkedin"
                  style={{ height: `${(day.linkedin / maxEngagement) * 160}px` }}
                  title={`LinkedIn: ${day.linkedin}`}
                />
                <div
                  className="chart-bar instagram"
                  style={{ height: `${(day.instagram / maxEngagement) * 160}px` }}
                  title={`Instagram: ${day.instagram}`}
                />
              </div>
              <div className="chart-label">{day.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="top-posts-section">
        <div className="top-posts-header">
          <h2>Top Performing Posts</h2>
        </div>
        <div className="top-posts-list">
          {topPosts.map((post, index) => (
            <div key={post.id} className="top-post-item">
              <div className="top-post-rank">{index + 1}</div>
              <div className={`top-post-platform ${post.platform}`}>
                {post.platform === 'twitter' && <TwitterIcon size={18} />}
                {post.platform === 'linkedin' && <LinkedInIcon size={18} />}
                {post.platform === 'instagram' && <InstagramIcon size={18} />}
              </div>
              <div className="top-post-content">
                <p className="top-post-text">{post.content}</p>
                <div className="top-post-metrics">
                  <div className="top-post-metric">
                    <HeartIcon size={16} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="top-post-metric">
                    <CommentIcon size={16} />
                    <span>{post.comments}</span>
                  </div>
                  <div className="top-post-metric">
                    <ShareIcon size={16} />
                    <span>{post.shares}</span>
                  </div>
                  <div className="top-post-metric">
                    <EyeIcon size={16} />
                    <span>{formatNumber(post.impressions)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimal Posting Times */}
      <div className="posting-times-section">
        <div className="posting-times-header">
          <h2>Best Times to Post</h2>
          <p>Based on your audience engagement patterns</p>
        </div>
        <div className="posting-times-chart">
          {postingTimes.map((time) => (
            <div key={time.hour} className="posting-time-bar">
              <div className="posting-time-label">{time.hour}</div>
              <div className="posting-time-bar-container">
                <div
                  className="posting-time-bar-fill"
                  style={{ width: `${time.engagement}%` }}
                />
              </div>
              <div className="posting-time-value">{time.engagement}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
