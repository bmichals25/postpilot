'use client';

import React, { useState, useMemo } from 'react';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import { useBrandGuide } from '@/hooks/useBrandGuide';
import { useAuth } from '@/hooks/useAuth';
import {
  LightningIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  CheckIcon,
  SparklesIcon,
  RefreshIcon,
  EditIcon,
  CalendarIcon,
  LinkIcon,
} from '@/components/icons';

const toneOptions = ['Professional', 'Casual', 'Inspirational', 'Humorous', 'Educational', 'Conversational'];

const generatedPosts = [
  {
    id: '1',
    platform: 'twitter',
    content: `Building in public has been one of the best decisions for PostPilot. Every win, every setback - we share it all. Why? Because transparency builds trust and connection.

What are you building? Drop a comment!`,
    charCount: 247,
    maxChars: 280,
  },
  {
    id: '2',
    platform: 'linkedin',
    content: `The best lesson I've learned building PostPilot? Build in public.

Here's what sharing our journey has taught us:

1. Vulnerability creates connection
When we share our struggles alongside our wins, people relate. They root for us.

2. Feedback comes faster
Our community helps us spot issues before they become problems.

3. Accountability drives progress
Knowing people are watching keeps us shipping consistently.

The startup journey can feel lonely. Building in public turns it into a shared adventure.

What's one thing you're working on that you could share more openly?

#BuildInPublic #StartupLife #Entrepreneurship`,
    charCount: 892,
    maxChars: 3000,
  },
];

export default function AIGeneratePage() {
  const { currentWorkspace, connections } = useWorkspaceContext();
  const { user, credits } = useAuth();
  const { brandGuide, loading: brandGuideLoading } = useBrandGuide(currentWorkspace?.id, !!user);

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [topic, setTopic] = useState('Building in public and sharing our journey');
  const [selectedTone, setSelectedTone] = useState('Professional');

  // Get available platforms from connections
  const availablePlatforms = useMemo(() => {
    return connections
      .filter(c => c.status === 'active')
      .map(c => ({
        id: c.platform,
        name: c.platform === 'twitter' ? 'Twitter / X' : c.platform.charAt(0).toUpperCase() + c.platform.slice(1),
        username: c.platform_username,
      }));
  }, [connections]);

  // Use brand guide for generation context
  const brandContext = useMemo(() => {
    if (!brandGuide) return '';
    return `
Brand voice: ${brandGuide.voice_description || 'Professional and friendly'}
Tone: ${brandGuide.voice_tones?.join(', ') || 'professional'}
Keywords: ${brandGuide.voice_keywords?.join(', ') || ''}
Tagline: ${brandGuide.tagline || ''}
    `.trim();
  }, [brandGuide]);

  // Calculate credits display
  const creditsRemaining = credits ? (credits.total - credits.used) : 65;

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const getPlatformIcon = (platformId: string, size: number = 24) => {
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

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'Twitter / X';
      case 'linkedin':
        return 'LinkedIn';
      case 'instagram':
        return 'Instagram';
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  // Filter generated posts to only show selected platforms
  const filteredPosts = generatedPosts.filter(post =>
    selectedPlatforms.includes(post.platform)
  );

  // No platforms connected state
  if (availablePlatforms.length === 0) {
    return (
      <div style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <header className="ai-header">
          <div className="ai-header-icon">
            <LightningIcon size={32} className="text-white" />
          </div>
          <h1>Let&apos;s create something great!</h1>
          <p>AI-powered content that sounds like you. Just pick your platforms and topic.</p>
        </header>

        {/* No Platforms Connected */}
        <div className="generator-card">
          <div className="empty-state" style={{ padding: '48px 24px' }}>
            <div className="empty-state-icon">
              <LinkIcon size={48} />
            </div>
            <h2>Connect Your Platforms First</h2>
            <p style={{ marginBottom: '24px' }}>
              To generate AI content, you need to connect at least one social media platform.
            </p>
            <a href="/settings" className="generate-btn" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              Go to Settings
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <header className="ai-header">
        <div className="ai-header-icon">
          <LightningIcon size={32} className="text-white" />
        </div>
        <h1>Let&apos;s create something great!</h1>
        <p>AI-powered content that sounds like you. Just pick your platforms and topic.</p>

        {/* Credits Badge */}
        <div className="credits-badge">
          <LightningIcon size={16} />
          <span>{creditsRemaining} credits remaining</span>
        </div>
      </header>

      {/* Generator Card */}
      <div className="generator-card">
        {/* Platform Selection */}
        <div className="section-label">Where do you want to post?</div>
        <div className="platform-grid">
          {availablePlatforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`platform-option ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
            >
              <div className={`platform-icon-wrapper ${platform.id}`}>
                {getPlatformIcon(platform.id)}
                {selectedPlatforms.includes(platform.id) && (
                  <div className="platform-check">
                    <CheckIcon size={12} className="text-white" />
                  </div>
                )}
              </div>
              <span className="platform-name">{platform.name}</span>
              <span className="platform-handle">{platform.username}</span>
            </button>
          ))}
        </div>

        {/* Brand Context Info */}
        {brandGuide && !brandGuideLoading && (
          <div className="brand-context-info" style={{
            background: 'var(--color-surface-secondary)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginTop: '16px',
            fontSize: '13px',
            color: 'var(--color-text-secondary)'
          }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>Brand context active:</strong>{' '}
            {brandGuide.voice_description || 'Using your brand voice settings'}
            {brandGuide.tagline && ` - "${brandGuide.tagline}"`}
          </div>
        )}

        {/* Topic Input */}
        <div className="input-group">
          <div className="section-label">What would you like to post about?</div>
          <div className="input-wrapper">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Tips for staying productive while working remotely"
              className="topic-input"
            />
            <EditIcon size={24} className="input-icon" />
          </div>
        </div>

        {/* Tone Selection */}
        <div className="section-label">Pick a tone</div>
        <div className="tone-grid">
          {toneOptions.map((tone) => (
            <button
              key={tone}
              onClick={() => setSelectedTone(tone)}
              className={`tone-chip ${selectedTone === tone ? 'selected' : ''}`}
            >
              {tone}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          className="generate-btn"
          disabled={selectedPlatforms.length === 0 || !topic.trim()}
        >
          <SparklesIcon size={20} className="animate-sparkle" />
          Generate Posts (1 credit)
        </button>

        {selectedPlatforms.length === 0 && (
          <p style={{
            textAlign: 'center',
            color: 'var(--color-text-tertiary)',
            fontSize: '13px',
            marginTop: '8px'
          }}>
            Select at least one platform to generate content
          </p>
        )}
      </div>

      {/* Preview Section - Only show if there are filtered posts */}
      {filteredPosts.length > 0 && (
        <div className="preview-section">
          {/* Preview Header */}
          <div className="preview-header">
            <div className="preview-title">
              <h3>Generated Content</h3>
              <span className="preview-badge">{filteredPosts.length} posts ready</span>
            </div>
            <button className="preview-action-btn">
              <RefreshIcon size={16} />
              Regenerate All
            </button>
          </div>

          {/* Generated Posts */}
          <div className="generated-posts">
            {filteredPosts.map((post) => (
              <div key={post.id} className="generated-post">
                {/* Platform Row */}
                <div className="post-platform-row">
                  <div className={`post-platform-icon ${post.platform}`}>
                    {post.platform === 'twitter' && <TwitterIcon size={16} className="text-black" />}
                    {post.platform === 'linkedin' && <LinkedInIcon size={16} />}
                    {post.platform === 'instagram' && <InstagramIcon size={16} gradient={false} className="text-white" />}
                  </div>
                  <span className="post-platform-name">{getPlatformName(post.platform)}</span>
                  <span className="post-char-count">{post.charCount} / {post.maxChars} characters</span>
                </div>

                {/* Content */}
                <div className="post-content-text">
                  {post.content}
                </div>

                {/* Actions */}
                <div className="post-actions">
                  <button className="post-action-btn">
                    <EditIcon size={14} />
                    Edit
                  </button>
                  <button className="post-action-btn">
                    <RefreshIcon size={14} />
                    Regenerate
                  </button>
                  <button className="post-action-btn primary">
                    <CalendarIcon size={14} />
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
