'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';

// Analytics data types
export interface OverviewStats {
  totalFollowers: number;
  followerGrowth: number;
  totalEngagement: number;
  engagementGrowth: number;
  engagementRate: number;
  engagementRateChange: number;
  postsPublished: number;
  postsChange: number;
}

export interface PlatformStats {
  platform: 'twitter' | 'linkedin' | 'instagram';
  followers: number;
  growth: number;
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface TopPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'instagram';
  content: string;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  publishedAt: string;
}

export interface DailyEngagement {
  day: string;
  date: string;
  twitter: number;
  linkedin: number;
  instagram: number;
}

export interface PostingTime {
  hour: string;
  engagement: number;
}

// Mock analytics data generator based on workspace
function generateMockAnalytics(workspaceId: string) {
  // Use workspace ID to generate consistent but different data
  const seed = workspaceId.charCodeAt(0);
  const multiplier = 1 + (seed % 3) * 0.5;

  const overviewStats: OverviewStats = {
    totalFollowers: Math.round(12847 * multiplier),
    followerGrowth: 3.2 + (seed % 5) * 0.5,
    totalEngagement: Math.round(4521 * multiplier),
    engagementGrowth: 12 + (seed % 10),
    engagementRate: 4.8 + (seed % 3) * 0.3,
    engagementRateChange: 0.3 + (seed % 5) * 0.1,
    postsPublished: 24 + (seed % 10),
    postsChange: seed % 2 === 0 ? 3 : -2,
  };

  const platformStats: PlatformStats[] = [
    {
      platform: 'twitter',
      followers: Math.round(5234 * multiplier),
      growth: 2.1 + (seed % 3),
      impressions: Math.round(45600 * multiplier),
      likes: Math.round(1234 * multiplier),
      comments: Math.round(189 * multiplier),
      shares: Math.round(456 * multiplier),
    },
    {
      platform: 'linkedin',
      followers: Math.round(3156 * multiplier),
      growth: 4.5 + (seed % 4),
      impressions: Math.round(23400 * multiplier),
      likes: Math.round(890 * multiplier),
      comments: Math.round(234 * multiplier),
      shares: Math.round(123 * multiplier),
    },
    {
      platform: 'instagram',
      followers: Math.round(4457 * multiplier),
      growth: 3.2 + (seed % 3),
      impressions: Math.round(67800 * multiplier),
      likes: Math.round(2397 * multiplier),
      comments: Math.round(567 * multiplier),
      shares: Math.round(234 * multiplier),
    },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const engagementByDay: DailyEngagement[] = days.map((day, i) => ({
    day,
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    twitter: Math.round((234 + (seed + i) * 50) * multiplier),
    linkedin: Math.round((156 + (seed + i) * 30) * multiplier),
    instagram: Math.round((312 + (seed + i) * 60) * multiplier),
  }));

  const topPosts: TopPost[] = [
    {
      id: '1',
      platform: 'twitter',
      content: 'Excited to announce our new product launch! After months of hard work, we\'re finally ready to share...',
      likes: Math.round(342 * multiplier),
      comments: Math.round(45 * multiplier),
      shares: Math.round(89 * multiplier),
      impressions: Math.round(12400 * multiplier),
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      platform: 'linkedin',
      content: 'We\'re hiring! Looking for talented engineers to join our growing team. If you\'re passionate about...',
      likes: Math.round(234 * multiplier),
      comments: Math.round(67 * multiplier),
      shares: Math.round(45 * multiplier),
      impressions: Math.round(8900 * multiplier),
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      platform: 'instagram',
      content: 'Behind the scenes at our team retreat! Great conversations and even better connections...',
      likes: Math.round(567 * multiplier),
      comments: Math.round(89 * multiplier),
      shares: Math.round(123 * multiplier),
      impressions: Math.round(15600 * multiplier),
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      platform: 'twitter',
      content: 'Quick tip: Consistency beats perfection every time. Show up, share value, and watch your audience grow.',
      likes: Math.round(189 * multiplier),
      comments: Math.round(34 * multiplier),
      shares: Math.round(67 * multiplier),
      impressions: Math.round(7800 * multiplier),
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '5',
      platform: 'linkedin',
      content: 'Reflecting on our journey so far. From a small team of 3 to now 50+ employees across 5 countries...',
      likes: Math.round(456 * multiplier),
      comments: Math.round(78 * multiplier),
      shares: Math.round(56 * multiplier),
      impressions: Math.round(11200 * multiplier),
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const postingTimes: PostingTime[] = [
    { hour: '6am', engagement: 45 + (seed % 20) },
    { hour: '9am', engagement: 78 + (seed % 15) },
    { hour: '12pm', engagement: 92 + (seed % 10) },
    { hour: '3pm', engagement: 85 + (seed % 12) },
    { hour: '6pm', engagement: 95 + (seed % 8) },
    { hour: '9pm', engagement: 67 + (seed % 18) },
  ];

  return {
    overviewStats,
    platformStats,
    engagementByDay,
    topPosts,
    postingTimes,
  };
}

export function useAnalytics(workspaceId: string | undefined) {
  const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([]);
  const [engagementByDay, setEngagementByDay] = useState<DailyEngagement[]>([]);
  const [topPosts, setTopPosts] = useState<TopPost[]>([]);
  const [postingTimes, setPostingTimes] = useState<PostingTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnalytics = useCallback(async () => {
    if (!workspaceId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // For now, use mock data. In the future, this would fetch from social APIs
      const data = generateMockAnalytics(workspaceId);

      setOverviewStats(data.overviewStats);
      setPlatformStats(data.platformStats);
      setEngagementByDay(data.engagementByDay);
      setTopPosts(data.topPosts);
      setPostingTimes(data.postingTimes);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    overviewStats,
    platformStats,
    engagementByDay,
    topPosts,
    postingTimes,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}
