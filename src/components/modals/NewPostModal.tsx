'use client';

import { useState } from 'react';
import { TwitterIcon, LinkedInIcon, InstagramIcon, LightningIcon, CalendarIcon } from '@/components/icons';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: PostData) => void;
}

interface PostData {
  content: string;
  platforms: string[];
  mediaUrls: string[];
  scheduledAt: Date | null;
  status: 'draft' | 'scheduled' | 'posted';
}

// Close icon
const CloseIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Image icon
const ImageIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// Clock icon
const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// Send icon
const SendIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// Character limits per platform
const charLimits: Record<string, number> = {
  twitter: 280,
  linkedin: 3000,
  instagram: 2200,
};

const platforms = [
  { id: 'twitter', name: 'Twitter / X', icon: TwitterIcon, color: '#1DA1F2' },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIcon, color: '#0A66C2' },
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: '#E4405F' },
];

export default function NewPostModal({ isOpen, onClose, onSubmit }: NewPostModalProps) {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<'now' | 'schedule'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  // Get the lowest character limit from selected platforms
  const getActiveCharLimit = () => {
    if (selectedPlatforms.length === 0) return 280;
    return Math.min(...selectedPlatforms.map(p => charLimits[p]));
  };

  const charLimit = getActiveCharLimit();
  const charCount = content.length;
  const isOverLimit = charCount > charLimit;

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const samplePosts = [
      "🚀 Excited to announce our latest feature! We've been working hard to bring you the best experience possible. What do you think? #innovation #tech",
      "Building in public is one of the best decisions I've made. The feedback from this community has been incredible. Thank you all! 🙏 #buildinpublic",
      "Hot take: The future of social media is AI-assisted content creation. It's not about replacing creativity, it's about amplifying it. Thoughts? 💭",
    ];

    setContent(samplePosts[Math.floor(Math.random() * samplePosts.length)]);
    setIsGenerating(false);
  };

  const handleMediaUpload = () => {
    // Simulate media upload - in production this would open file picker
    setMediaPreview('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop');
  };

  const removeMedia = () => {
    setMediaPreview(null);
  };

  const handleSubmit = () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;

    let scheduledAt: Date | null = null;
    if (scheduleMode === 'schedule' && scheduledDate && scheduledTime) {
      scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`);
    }

    const post: PostData = {
      content,
      platforms: selectedPlatforms,
      mediaUrls: mediaPreview ? [mediaPreview] : [],
      scheduledAt,
      status: scheduleMode === 'now' ? 'posted' : 'scheduled',
    };

    onSubmit(post);

    // Reset form
    setContent('');
    setSelectedPlatforms(['twitter']);
    setMediaPreview(null);
    setScheduleMode('now');
    setScheduledDate('');
    setScheduledTime('');

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-lg" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Create Post</h2>
            <p className="modal-subtitle">Share content across your social platforms</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Platform Selection */}
          <div className="form-group">
            <label className="form-label">Post to</label>
            <div className="platform-toggle-group">
              {platforms.map(platform => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    className={`platform-toggle ${isSelected ? 'selected' : ''}`}
                    onClick={() => togglePlatform(platform.id)}
                    style={isSelected ? { borderColor: platform.color, background: `${platform.color}10` } : {}}
                  >
                    <Icon size={20} />
                    <span>{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Editor */}
          <div className="form-group">
            <div className="content-editor-header">
              <label className="form-label">Content</label>
              <button
                className="ai-generate-btn"
                onClick={handleAIGenerate}
                disabled={isGenerating}
              >
                <LightningIcon size={16} />
                {isGenerating ? 'Generating...' : 'AI Generate'}
              </button>
            </div>
            <div className={`content-editor ${isOverLimit ? 'over-limit' : ''}`}>
              <textarea
                className="content-textarea"
                placeholder="What's on your mind?"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={5}
              />
              <div className="content-editor-footer">
                <button className="media-upload-btn" onClick={handleMediaUpload}>
                  <ImageIcon size={18} />
                  Add Media
                </button>
                <span className={`char-counter ${isOverLimit ? 'over' : charCount > charLimit * 0.9 ? 'warning' : ''}`}>
                  {charCount} / {charLimit}
                </span>
              </div>
            </div>
          </div>

          {/* Media Preview */}
          {mediaPreview && (
            <div className="media-preview">
              <img src={mediaPreview} alt="Upload preview" />
              <button className="media-remove-btn" onClick={removeMedia}>
                <CloseIcon size={16} />
              </button>
            </div>
          )}

          {/* Schedule Options */}
          <div className="form-group">
            <label className="form-label">When to post</label>
            <div className="schedule-toggle">
              <button
                className={`schedule-option ${scheduleMode === 'now' ? 'active' : ''}`}
                onClick={() => setScheduleMode('now')}
              >
                <SendIcon size={16} />
                Post Now
              </button>
              <button
                className={`schedule-option ${scheduleMode === 'schedule' ? 'active' : ''}`}
                onClick={() => setScheduleMode('schedule')}
              >
                <ClockIcon size={16} />
                Schedule
              </button>
            </div>

            {scheduleMode === 'schedule' && (
              <div className="schedule-picker">
                <input
                  type="date"
                  className="form-input"
                  value={scheduledDate}
                  onChange={e => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <input
                  type="time"
                  className="form-input"
                  value={scheduledTime}
                  onChange={e => setScheduledTime(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Post Preview */}
          {content && selectedPlatforms.length > 0 && (
            <div className="post-preview-section">
              <label className="form-label">Preview</label>
              <div className="post-preview-cards">
                {selectedPlatforms.map(platformId => {
                  const platform = platforms.find(p => p.id === platformId)!;
                  const Icon = platform.icon;
                  const limit = charLimits[platformId];
                  const isOver = content.length > limit;

                  return (
                    <div key={platformId} className="post-preview-card">
                      <div className="preview-card-header">
                        <Icon size={16} />
                        <span>{platform.name}</span>
                        {isOver && <span className="preview-warning">Over limit</span>}
                      </div>
                      <div className="preview-card-content">
                        <p>{content.slice(0, limit)}{content.length > limit ? '...' : ''}</p>
                        {mediaPreview && (
                          <img src={mediaPreview} alt="" className="preview-media" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!content.trim() || selectedPlatforms.length === 0 || isOverLimit}
            onClick={handleSubmit}
          >
            {scheduleMode === 'now' ? (
              <>
                <SendIcon size={16} />
                Post Now
              </>
            ) : (
              <>
                <CalendarIcon size={16} />
                Schedule Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
