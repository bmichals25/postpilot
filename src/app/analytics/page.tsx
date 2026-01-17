'use client';

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

// Mock data for analytics
const overviewStats = {
  totalFollowers: 12847,
  followerGrowth: 3.2,
  totalEngagement: 4521,
  engagementGrowth: 12.4,
  engagementRate: 4.8,
  rateGrowth: 0.3,
  postsPublished: 24,
  postsChange: -2,
};

const platformStats = {
  twitter: {
    name: 'Twitter',
    handle: '@acmeinc',
    followers: 5234,
    growth: 2.1,
    impressions: 45600,
    likes: 1234,
    retweets: 456,
    replies: 189,
  },
  linkedin: {
    name: 'LinkedIn',
    handle: 'ACME Inc.',
    followers: 3128,
    growth: 4.5,
    impressions: 28400,
    likes: 890,
    comments: 234,
    shares: 156,
  },
  instagram: {
    name: 'Instagram',
    handle: '@acme.inc',
    followers: 4485,
    growth: 3.8,
    impressions: 62300,
    likes: 2397,
    comments: 312,
    saves: 567,
  },
};

const topPosts = [
  {
    id: '1',
    platform: 'twitter',
    content: "🚀 Building in public update: Just shipped our new analytics dashboard! Can't wait to hear what you think. Thread below 👇",
    likes: 342,
    comments: 45,
    shares: 89,
    impressions: 12400,
  },
  {
    id: '2',
    platform: 'instagram',
    content: "Behind the scenes at ACME HQ ✨ Sneak peek at what we're working on next. The team is crushing it!",
    likes: 567,
    comments: 89,
    shares: 123,
    impressions: 18200,
  },
  {
    id: '3',
    platform: 'linkedin',
    content: "We're hiring! Looking for passionate developers to join our growing team. Remote-friendly, great benefits, and an amazing culture.",
    likes: 234,
    comments: 67,
    shares: 45,
    impressions: 9800,
  },
  {
    id: '4',
    platform: 'twitter',
    content: "Hot take: The best marketing strategy is building a great product. Everything else is just noise. Agree or disagree?",
    likes: 289,
    comments: 78,
    shares: 56,
    impressions: 11200,
  },
  {
    id: '5',
    platform: 'instagram',
    content: "Product launch day! 🎉 After months of hard work, we're finally ready to show you what we've been building.",
    likes: 445,
    comments: 56,
    shares: 98,
    impressions: 15600,
  },
];

const engagementByDay = [
  { day: 'Mon', twitter: 234, linkedin: 156, instagram: 312 },
  { day: 'Tue', twitter: 312, linkedin: 189, instagram: 456 },
  { day: 'Wed', twitter: 278, linkedin: 167, instagram: 389 },
  { day: 'Thu', twitter: 456, linkedin: 234, instagram: 523 },
  { day: 'Fri', twitter: 389, linkedin: 198, instagram: 467 },
  { day: 'Sat', twitter: 234, linkedin: 145, instagram: 378 },
  { day: 'Sun', twitter: 189, linkedin: 123, instagram: 289 },
];

// Generate posting times heatmap data
const generatePostingTimes = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const times = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
  const levels = ['low', 'medium', 'high', 'best'];

  const data: { time: string; days: { day: string; level: string }[] }[] = [];

  times.forEach(time => {
    const row = {
      time,
      days: days.map(day => ({
        day,
        level: levels[Math.floor(Math.random() * 4)],
      })),
    };
    data.push(row);
  });

  // Set some specific "best" times
  data[2].days[1].level = 'best'; // 12 PM Tuesday
  data[2].days[3].level = 'best'; // 12 PM Thursday
  data[3].days[2].level = 'best'; // 3 PM Wednesday

  return data;
};

const postingTimes = generatePostingTimes();

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

export default function AnalyticsPage() {
  const maxEngagement = Math.max(
    ...engagementByDay.flatMap(d => [d.twitter, d.linkedin, d.instagram])
  );

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
          <div className={`trend-indicator ${overviewStats.rateGrowth >= 0 ? 'up' : 'down'}`}>
            {overviewStats.rateGrowth >= 0 ? <TrendUpIcon size={14} /> : <TrendDownIcon size={14} />}
            {Math.abs(overviewStats.rateGrowth)}%
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
        <div className="platform-perf-card">
          <div className="platform-perf-header">
            <div className="platform-perf-logo twitter">
              <TwitterIcon size={24} />
            </div>
            <div className="platform-perf-info">
              <h3>{platformStats.twitter.name}</h3>
              <div className="platform-perf-followers">
                <span>{formatNumber(platformStats.twitter.followers)} followers</span>
                <span className="follower-growth">+{platformStats.twitter.growth}%</span>
              </div>
            </div>
          </div>
          <div className="platform-metrics">
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <HeartIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{formatNumber(platformStats.twitter.likes)}</div>
                <div className="platform-metric-label">Likes</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <ShareIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{platformStats.twitter.retweets}</div>
                <div className="platform-metric-label">Retweets</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <CommentIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{platformStats.twitter.replies}</div>
                <div className="platform-metric-label">Replies</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <EyeIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{formatNumber(platformStats.twitter.impressions)}</div>
                <div className="platform-metric-label">Impressions</div>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="platform-perf-card">
          <div className="platform-perf-header">
            <div className="platform-perf-logo linkedin">
              <LinkedInIcon size={24} />
            </div>
            <div className="platform-perf-info">
              <h3>{platformStats.linkedin.name}</h3>
              <div className="platform-perf-followers">
                <span>{formatNumber(platformStats.linkedin.followers)} followers</span>
                <span className="follower-growth">+{platformStats.linkedin.growth}%</span>
              </div>
            </div>
          </div>
          <div className="platform-metrics">
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <HeartIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{platformStats.linkedin.likes}</div>
                <div className="platform-metric-label">Likes</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <ShareIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{platformStats.linkedin.shares}</div>
                <div className="platform-metric-label">Shares</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <CommentIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{platformStats.linkedin.comments}</div>
                <div className="platform-metric-label">Comments</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <EyeIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{formatNumber(platformStats.linkedin.impressions)}</div>
                <div className="platform-metric-label">Impressions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram */}
        <div className="platform-perf-card">
          <div className="platform-perf-header">
            <div className="platform-perf-logo instagram">
              <InstagramIcon size={24} />
            </div>
            <div className="platform-perf-info">
              <h3>{platformStats.instagram.name}</h3>
              <div className="platform-perf-followers">
                <span>{formatNumber(platformStats.instagram.followers)} followers</span>
                <span className="follower-growth">+{platformStats.instagram.growth}%</span>
              </div>
            </div>
          </div>
          <div className="platform-metrics">
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <HeartIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{formatNumber(platformStats.instagram.likes)}</div>
                <div className="platform-metric-label">Likes</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <ShareIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{platformStats.instagram.saves}</div>
                <div className="platform-metric-label">Saves</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <CommentIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{platformStats.instagram.comments}</div>
                <div className="platform-metric-label">Comments</div>
              </div>
            </div>
            <div className="platform-metric">
              <div className="platform-metric-icon">
                <EyeIcon size={16} />
              </div>
              <div>
                <div className="platform-metric-value">{formatNumber(platformStats.instagram.impressions)}</div>
                <div className="platform-metric-label">Impressions</div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="posting-times-grid">
          {/* Header row */}
          <div className="time-slot-header"></div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="time-slot-header">{day}</div>
          ))}

          {/* Time rows */}
          {postingTimes.map((row) => (
            <>
              <div key={`label-${row.time}`} className="time-slot-label">{row.time}</div>
              {row.days.map((slot, i) => (
                <div
                  key={`${row.time}-${slot.day}-${i}`}
                  className={`time-slot ${slot.level}`}
                  title={`${slot.day} ${row.time}: ${slot.level} engagement`}
                />
              ))}
            </>
          ))}
        </div>
        <div className="posting-times-legend">
          <div className="legend-level">
            <div className="time-slot low"></div>
            Low
          </div>
          <div className="legend-level">
            <div className="time-slot medium"></div>
            Medium
          </div>
          <div className="legend-level">
            <div className="time-slot high"></div>
            High
          </div>
          <div className="legend-level">
            <div className="time-slot best"></div>
            Best
          </div>
        </div>
      </div>
    </div>
  );
}
