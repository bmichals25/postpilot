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

  const getPlatformIcon = (platform: string, size = 24) => {
    switch (platform) {
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
    <div className="p-8 max-w-[1000px]">
      {/* Header */}
      <header className="text-center mb-10">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_8px_24px_rgba(99,102,241,0.3)]">
          <LightningIcon size={32} className="text-white" />
        </div>
        <h1 className="text-[28px] font-bold text-[#1F2937] mb-2">Let&apos;s create something great!</h1>
        <p className="text-base text-[#6B7280]">AI-powered content that sounds like you. Just pick your platforms and topic.</p>

        {/* Credits Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F3FF] rounded-full mt-4">
          <LightningIcon size={16} className="text-[#8B5CF6]" />
          <span className="text-sm font-medium text-[#7C3AED]">65 credits remaining</span>
        </div>
      </header>

      {/* Generator Card */}
      <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-6">
        {/* Platform Selection */}
        <div className="mb-7">
          <label className="text-sm font-semibold text-[#1F2937] mb-3 block">Where do you want to post?</label>
          <div className="flex gap-3">
            {[
              { id: 'twitter', bgClass: 'bg-[#F3F4F6]' },
              { id: 'linkedin', bgClass: 'bg-[#EFF6FF]' },
              { id: 'instagram', bgClass: 'bg-gradient-to-br from-[#FFECD2] via-[#FCB69F] to-[#FF8A80]' },
            ].map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`flex-1 flex flex-col items-center gap-2.5 py-5 px-4 rounded-xl border-2 transition-all ${
                  selectedPlatforms.includes(platform.id)
                    ? 'bg-[#EEF2FF] border-[#6366F1]'
                    : 'bg-[#F9FAFB] border-transparent hover:bg-[#F3F4F6]'
                }`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${platform.bgClass}`}>
                    {getPlatformIcon(platform.id)}
                  </div>
                  {selectedPlatforms.includes(platform.id) && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full flex items-center justify-center">
                      <CheckIcon size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-[#374151]">{getPlatformName(platform.id)}</span>
                <span className="text-xs text-[#9CA3AF]">{getPlatformHandle(platform.id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Topic Input */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-[#1F2937] mb-3 block">What would you like to post about?</label>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Tips for staying productive while working remotely"
              className="w-full px-5 py-4 pr-12 text-base border-2 border-[#E5E7EB] rounded-xl outline-none focus:border-[#6366F1] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] transition-all placeholder:text-[#9CA3AF]"
            />
            <EditIcon size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          </div>
        </div>

        {/* Tone Selection */}
        <div className="mb-7">
          <label className="text-sm font-semibold text-[#1F2937] mb-3 block">Pick a tone</label>
          <div className="flex flex-wrap gap-2.5">
            {toneOptions.map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${
                  selectedTone === tone
                    ? 'bg-[#EEF2FF] border-[#6366F1] text-[#6366F1]'
                    : 'bg-[#F9FAFB] border-transparent text-[#374151] hover:bg-[#F3F4F6]'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button className="w-full flex items-center justify-center gap-2.5 py-4 px-8 gradient-primary text-white rounded-xl text-base font-semibold hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)] transition-all shadow-[0_4px_16px_rgba(99,102,241,0.3)]">
          <SparklesIcon size={20} className="animate-sparkle" />
          Generate Posts (1 credit)
        </button>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        {/* Preview Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-semibold text-[#1F2937]">Generated Content</h3>
            <span className="px-2.5 py-1 bg-[#ECFDF5] rounded-xl text-xs font-medium text-[#10B981]">2 posts ready</span>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F9FAFB] rounded-lg text-[13px] font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">
            <RefreshIcon size={16} />
            Regenerate All
          </button>
        </div>

        {/* Generated Posts */}
        <div className="flex flex-col gap-4">
          {generatedPosts.map((post) => (
            <div key={post.id} className="p-5 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors">
              {/* Platform Row */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                  post.platform === 'twitter' ? 'bg-[#E5E7EB]' : 'bg-[#DBEAFE]'
                }`}>
                  {getPlatformIcon(post.platform, 16)}
                </div>
                <span className="text-[13px] font-semibold text-[#374151]">{getPlatformName(post.platform)}</span>
                <span className="ml-auto text-xs text-[#9CA3AF]">{post.charCount} / {post.maxChars} characters</span>
              </div>

              {/* Content */}
              <div className="text-[15px] leading-relaxed text-[#1F2937] mb-4 whitespace-pre-line">
                {post.content}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all">
                  <EditIcon size={14} />
                  Edit
                </button>
                <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all">
                  <RefreshIcon size={14} />
                  Regenerate
                </button>
                <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#6366F1] border border-[#6366F1] rounded-lg text-[13px] font-medium text-white hover:bg-[#5558E3] transition-all">
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
