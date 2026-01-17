'use client';

import React, { useState } from 'react';
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
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin']);
  const [topic, setTopic] = useState('Building in public and sharing our journey');
  const [selectedTone, setSelectedTone] = useState('Professional');

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
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
        return '';
    }
  };

  const getPlatformHandle = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return '@postpilot';
      case 'linkedin':
        return 'Ben M.';
      case 'instagram':
        return '@postpilot';
      default:
        return '';
    }
  };

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
          <span>65 credits remaining</span>
        </div>
      </header>

      {/* Generator Card */}
      <div className="generator-card">
        {/* Platform Selection */}
        <div className="section-label">Where do you want to post?</div>
        <div className="platform-grid">
          {[
            { id: 'twitter', bgClass: 'twitter' },
            { id: 'linkedin', bgClass: 'linkedin' },
            { id: 'instagram', bgClass: 'instagram' },
          ].map((platform) => (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`platform-option ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
            >
              <div className={`platform-icon-wrapper ${platform.bgClass}`}>
                {platform.id === 'twitter' && <TwitterIcon size={24} className="text-black" />}
                {platform.id === 'linkedin' && <LinkedInIcon size={24} />}
                {platform.id === 'instagram' && <InstagramIcon size={24} gradient={false} className="text-white" />}
                {selectedPlatforms.includes(platform.id) && (
                  <div className="platform-check">
                    <CheckIcon size={12} className="text-white" />
                  </div>
                )}
              </div>
              <span className="platform-name">{getPlatformName(platform.id)}</span>
              <span className="platform-handle">{getPlatformHandle(platform.id)}</span>
            </button>
          ))}
        </div>

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
        <button className="generate-btn">
          <SparklesIcon size={20} className="animate-sparkle" />
          Generate Posts (1 credit)
        </button>
      </div>

      {/* Preview Section */}
      <div className="preview-section">
        {/* Preview Header */}
        <div className="preview-header">
          <div className="preview-title">
            <h3>Generated Content</h3>
            <span className="preview-badge">2 posts ready</span>
          </div>
          <button className="preview-action-btn">
            <RefreshIcon size={16} />
            Regenerate All
          </button>
        </div>

        {/* Generated Posts */}
        <div className="generated-posts">
          {generatedPosts.map((post) => (
            <div key={post.id} className="generated-post">
              {/* Platform Row */}
              <div className="post-platform-row">
                <div className={`post-platform-icon ${post.platform}`}>
                  {post.platform === 'twitter' && <TwitterIcon size={16} className="text-black" />}
                  {post.platform === 'linkedin' && <LinkedInIcon size={16} />}
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
    </div>
  );
}
