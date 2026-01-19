'use client';

import { useState, useEffect } from 'react';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import { useBrandGuide } from '@/hooks/useBrandGuide';
import { useAuth } from '@/hooks/useAuth';
import { LightningIcon, PlusIcon } from '@/components/icons';
import type { BrandColors } from '@/types/database';

// Icons
const PaletteIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="10.5" r="2.5" />
    <circle cx="8.5" cy="7.5" r="2.5" />
    <circle cx="6.5" cy="12.5" r="2.5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const TypeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

const VoiceIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const TargetIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const MessageIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const EditIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SaveIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const LoaderIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <circle cx="12" cy="12" r="10" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

// Color presets
const colorPresets = [
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Slate', value: '#64748B' },
  { name: 'Zinc', value: '#71717A' },
];

// Voice tone options
const voiceTones = [
  { id: 'professional', label: 'Professional', description: 'Formal, authoritative, trustworthy' },
  { id: 'friendly', label: 'Friendly', description: 'Warm, approachable, conversational' },
  { id: 'playful', label: 'Playful', description: 'Fun, witty, energetic' },
  { id: 'inspirational', label: 'Inspirational', description: 'Motivating, uplifting, empowering' },
  { id: 'educational', label: 'Educational', description: 'Informative, helpful, clear' },
  { id: 'bold', label: 'Bold', description: 'Confident, direct, impactful' },
];

// Font options
const fontOptions = [
  { id: 'inter', label: 'Inter', style: 'font-family: Inter, sans-serif' },
  { id: 'roboto', label: 'Roboto', style: 'font-family: Roboto, sans-serif' },
  { id: 'poppins', label: 'Poppins', style: 'font-family: Poppins, sans-serif' },
  { id: 'playfair', label: 'Playfair Display', style: 'font-family: Playfair Display, serif' },
  { id: 'montserrat', label: 'Montserrat', style: 'font-family: Montserrat, sans-serif' },
  { id: 'opensans', label: 'Open Sans', style: 'font-family: Open Sans, sans-serif' },
];

// Local state interface that mirrors the UI structure
interface LocalBrandGuide {
  colors: BrandColors;
  heading_font: string;
  body_font: string;
  voice_tones: string[];
  voice_keywords: string[];
  voice_description: string | null;
  audience_demographics: string | null;
  audience_interests: string | null;
  audience_pain_points: string | null;
  tagline: string | null;
  value_props: string[];
  do_list: string[];
  dont_list: string[];
}

// Default local brand guide
const defaultLocalGuide: LocalBrandGuide = {
  colors: { primary: '#6366F1', secondary: '#8B5CF6', accent: '#10B981', background: '#FAFAF9' },
  heading_font: 'inter',
  body_font: 'inter',
  voice_tones: ['professional', 'friendly'],
  voice_keywords: [],
  voice_description: null,
  audience_demographics: null,
  audience_interests: null,
  audience_pain_points: null,
  tagline: null,
  value_props: [],
  do_list: [],
  dont_list: [],
};

export default function BrandGuidePage() {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspaceContext();
  const { brandGuide, loading, saving, updateBrandGuide } = useBrandGuide(
    currentWorkspace?.id,
    !!user
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [localGuide, setLocalGuide] = useState<LocalBrandGuide>(defaultLocalGuide);
  const [newKeyword, setNewKeyword] = useState('');
  const [newValueProp, setNewValueProp] = useState('');
  const [newDo, setNewDo] = useState('');
  const [newDont, setNewDont] = useState('');

  // Sync local state with fetched data
  useEffect(() => {
    if (brandGuide) {
      setLocalGuide({
        colors: (brandGuide.colors as unknown as BrandColors) || defaultLocalGuide.colors,
        heading_font: brandGuide.heading_font || 'inter',
        body_font: brandGuide.body_font || 'inter',
        voice_tones: brandGuide.voice_tones || [],
        voice_keywords: brandGuide.voice_keywords || [],
        voice_description: brandGuide.voice_description,
        audience_demographics: brandGuide.audience_demographics,
        audience_interests: brandGuide.audience_interests,
        audience_pain_points: brandGuide.audience_pain_points,
        tagline: brandGuide.tagline,
        value_props: brandGuide.value_props || [],
        do_list: brandGuide.do_list || [],
        dont_list: brandGuide.dont_list || [],
      });
    }
  }, [brandGuide]);

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateBrandGuide({
        colors: localGuide.colors as unknown as Record<string, string>,
        heading_font: localGuide.heading_font,
        body_font: localGuide.body_font,
        voice_tones: localGuide.voice_tones,
        voice_keywords: localGuide.voice_keywords,
        voice_description: localGuide.voice_description,
        audience_demographics: localGuide.audience_demographics,
        audience_interests: localGuide.audience_interests,
        audience_pain_points: localGuide.audience_pain_points,
        tagline: localGuide.tagline,
        value_props: localGuide.value_props,
        do_list: localGuide.do_list,
        dont_list: localGuide.dont_list,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save brand guide:', error);
    }
  };

  const handleCancel = () => {
    // Reset to fetched data
    if (brandGuide) {
      setLocalGuide({
        colors: (brandGuide.colors as unknown as BrandColors) || defaultLocalGuide.colors,
        heading_font: brandGuide.heading_font || 'inter',
        body_font: brandGuide.body_font || 'inter',
        voice_tones: brandGuide.voice_tones || [],
        voice_keywords: brandGuide.voice_keywords || [],
        voice_description: brandGuide.voice_description,
        audience_demographics: brandGuide.audience_demographics,
        audience_interests: brandGuide.audience_interests,
        audience_pain_points: brandGuide.audience_pain_points,
        tagline: brandGuide.tagline,
        value_props: brandGuide.value_props || [],
        do_list: brandGuide.do_list || [],
        dont_list: brandGuide.dont_list || [],
      });
    }
    setIsEditing(false);
  };

  const handleGenerateVoice = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLocalGuide(prev => ({
      ...prev,
      voice_description: 'We speak with the confidence of industry experts while maintaining the approachability of a trusted friend. Our tone is optimistic and forward-thinking, always focusing on solutions rather than problems. We use clear, jargon-free language that empowers our audience to take action.',
      voice_keywords: ['empowering', 'innovative', 'approachable', 'results-driven', 'authentic'],
    }));
    setIsGenerating(false);
  };

  const toggleTone = (toneId: string) => {
    setLocalGuide(prev => ({
      ...prev,
      voice_tones: prev.voice_tones.includes(toneId)
        ? prev.voice_tones.filter(t => t !== toneId)
        : [...prev.voice_tones, toneId],
    }));
  };

  const updateColors = (key: keyof BrandColors, value: string) => {
    setLocalGuide(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setLocalGuide(prev => ({
        ...prev,
        voice_keywords: [...prev.voice_keywords, newKeyword.trim()],
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setLocalGuide(prev => ({
      ...prev,
      voice_keywords: prev.voice_keywords.filter(k => k !== keyword),
    }));
  };

  const addValueProp = () => {
    if (newValueProp.trim()) {
      setLocalGuide(prev => ({
        ...prev,
        value_props: [...prev.value_props, newValueProp.trim()],
      }));
      setNewValueProp('');
    }
  };

  const removeValueProp = (prop: string) => {
    setLocalGuide(prev => ({
      ...prev,
      value_props: prev.value_props.filter(p => p !== prop),
    }));
  };

  const addDo = () => {
    if (newDo.trim()) {
      setLocalGuide(prev => ({
        ...prev,
        do_list: [...prev.do_list, newDo.trim()],
      }));
      setNewDo('');
    }
  };

  const removeDo = (item: string) => {
    setLocalGuide(prev => ({
      ...prev,
      do_list: prev.do_list.filter(d => d !== item),
    }));
  };

  const addDont = () => {
    if (newDont.trim()) {
      setLocalGuide(prev => ({
        ...prev,
        dont_list: [...prev.dont_list, newDont.trim()],
      }));
      setNewDont('');
    }
  };

  const removeDont = (item: string) => {
    setLocalGuide(prev => ({
      ...prev,
      dont_list: prev.dont_list.filter(d => d !== item),
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="brand-guide-page">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-guide-page">
      {/* Header */}
      <header className="brand-guide-header">
        <div>
          <h1>Brand Guide</h1>
          <p>Define your brand identity and voice for consistent content</p>
        </div>
        <div className="brand-guide-actions">
          {isEditing ? (
            <>
              <button className="btn btn-secondary" onClick={handleCancel} disabled={saving}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <LoaderIcon size={16} />
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleEditStart}>
              <EditIcon size={16} />
              Edit Guide
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="brand-guide-content">
        {/* Colors Section */}
        <section className="brand-section">
          <div className="brand-section-header">
            <div className="brand-section-icon colors">
              <PaletteIcon size={20} />
            </div>
            <div>
              <h2>Brand Colors</h2>
              <p>Your color palette for visual consistency</p>
            </div>
          </div>
          <div className="brand-section-content">
            <div className="color-palette">
              {Object.entries(localGuide.colors).map(([key, value]) => (
                <div key={key} className="color-item">
                  <div
                    className="color-preview"
                    style={{ background: value }}
                  />
                  <div className="color-info">
                    <span className="color-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="color-value">{value}</span>
                  </div>
                  {isEditing && (
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => updateColors(key as keyof BrandColors, e.target.value)}
                      className="color-picker"
                    />
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="color-presets">
                <span className="preset-label">Quick presets:</span>
                <div className="preset-colors">
                  {colorPresets.map(preset => (
                    <button
                      key={preset.value}
                      className="preset-color"
                      style={{ background: preset.value }}
                      title={preset.name}
                      onClick={() => updateColors('primary', preset.value)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Typography Section */}
        <section className="brand-section">
          <div className="brand-section-header">
            <div className="brand-section-icon typography">
              <TypeIcon size={20} />
            </div>
            <div>
              <h2>Typography</h2>
              <p>Font choices for headings and body text</p>
            </div>
          </div>
          <div className="brand-section-content">
            <div className="typography-grid">
              <div className="typography-item">
                <label>Heading Font</label>
                {isEditing ? (
                  <select
                    value={localGuide.heading_font}
                    onChange={(e) => setLocalGuide(prev => ({
                      ...prev,
                      heading_font: e.target.value,
                    }))}
                    className="font-select"
                  >
                    {fontOptions.map(font => (
                      <option key={font.id} value={font.id}>{font.label}</option>
                    ))}
                  </select>
                ) : (
                  <div className="font-preview heading">
                    {fontOptions.find(f => f.id === localGuide.heading_font)?.label}
                  </div>
                )}
                <p className="font-sample" style={{ fontWeight: 600, fontSize: '24px' }}>
                  The quick brown fox
                </p>
              </div>
              <div className="typography-item">
                <label>Body Font</label>
                {isEditing ? (
                  <select
                    value={localGuide.body_font}
                    onChange={(e) => setLocalGuide(prev => ({
                      ...prev,
                      body_font: e.target.value,
                    }))}
                    className="font-select"
                  >
                    {fontOptions.map(font => (
                      <option key={font.id} value={font.id}>{font.label}</option>
                    ))}
                  </select>
                ) : (
                  <div className="font-preview body">
                    {fontOptions.find(f => f.id === localGuide.body_font)?.label}
                  </div>
                )}
                <p className="font-sample">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Voice & Tone Section */}
        <section className="brand-section">
          <div className="brand-section-header">
            <div className="brand-section-icon voice">
              <VoiceIcon size={20} />
            </div>
            <div>
              <h2>Voice & Tone</h2>
              <p>How your brand communicates</p>
            </div>
            {isEditing && (
              <button
                className="ai-generate-section-btn"
                onClick={handleGenerateVoice}
                disabled={isGenerating}
              >
                <LightningIcon size={16} />
                {isGenerating ? 'Generating...' : 'AI Generate'}
              </button>
            )}
          </div>
          <div className="brand-section-content">
            {/* Tone Selection */}
            <div className="voice-tones">
              <label>Brand Tones</label>
              <div className="tone-grid">
                {voiceTones.map(tone => {
                  const isSelected = localGuide.voice_tones.includes(tone.id);
                  return (
                    <div
                      key={tone.id}
                      className={`tone-card ${isSelected ? 'selected' : ''} ${isEditing ? 'editable' : ''}`}
                      onClick={() => isEditing && toggleTone(tone.id)}
                    >
                      <div className="tone-header">
                        <span className="tone-label">{tone.label}</span>
                        {isSelected && <CheckIcon size={16} />}
                      </div>
                      <p className="tone-description">{tone.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Keywords */}
            <div className="voice-keywords">
              <label>Brand Keywords</label>
              <div className="keywords-list">
                {localGuide.voice_keywords.map(keyword => (
                  <span key={keyword} className="keyword-tag">
                    {keyword}
                    {isEditing && (
                      <button onClick={() => removeKeyword(keyword)}>
                        <XIcon size={12} />
                      </button>
                    )}
                  </span>
                ))}
                {isEditing && (
                  <div className="keyword-input-wrap">
                    <input
                      type="text"
                      placeholder="Add keyword..."
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                    />
                    <button onClick={addKeyword}>
                      <PlusIcon size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Voice Description */}
            <div className="voice-description">
              <label>Voice Description</label>
              {isEditing ? (
                <textarea
                  value={localGuide.voice_description || ''}
                  onChange={(e) => setLocalGuide(prev => ({
                    ...prev,
                    voice_description: e.target.value || null,
                  }))}
                  rows={4}
                  placeholder="Describe how your brand communicates..."
                />
              ) : (
                <p className="voice-text">{localGuide.voice_description || 'No voice description set'}</p>
              )}
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="brand-section">
          <div className="brand-section-header">
            <div className="brand-section-icon audience">
              <TargetIcon size={20} />
            </div>
            <div>
              <h2>Target Audience</h2>
              <p>Who you're creating content for</p>
            </div>
          </div>
          <div className="brand-section-content">
            <div className="audience-grid">
              <div className="audience-item">
                <label>Demographics</label>
                {isEditing ? (
                  <textarea
                    value={localGuide.audience_demographics || ''}
                    onChange={(e) => setLocalGuide(prev => ({
                      ...prev,
                      audience_demographics: e.target.value || null,
                    }))}
                    rows={2}
                  />
                ) : (
                  <p>{localGuide.audience_demographics || 'No demographics set'}</p>
                )}
              </div>
              <div className="audience-item">
                <label>Interests</label>
                {isEditing ? (
                  <textarea
                    value={localGuide.audience_interests || ''}
                    onChange={(e) => setLocalGuide(prev => ({
                      ...prev,
                      audience_interests: e.target.value || null,
                    }))}
                    rows={2}
                  />
                ) : (
                  <p>{localGuide.audience_interests || 'No interests set'}</p>
                )}
              </div>
              <div className="audience-item">
                <label>Pain Points</label>
                {isEditing ? (
                  <textarea
                    value={localGuide.audience_pain_points || ''}
                    onChange={(e) => setLocalGuide(prev => ({
                      ...prev,
                      audience_pain_points: e.target.value || null,
                    }))}
                    rows={2}
                  />
                ) : (
                  <p>{localGuide.audience_pain_points || 'No pain points set'}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Messaging Section */}
        <section className="brand-section">
          <div className="brand-section-header">
            <div className="brand-section-icon messaging">
              <MessageIcon size={20} />
            </div>
            <div>
              <h2>Key Messaging</h2>
              <p>Your core messages and guidelines</p>
            </div>
          </div>
          <div className="brand-section-content">
            {/* Tagline */}
            <div className="messaging-tagline">
              <label>Tagline</label>
              {isEditing ? (
                <input
                  type="text"
                  value={localGuide.tagline || ''}
                  onChange={(e) => setLocalGuide(prev => ({
                    ...prev,
                    tagline: e.target.value || null,
                  }))}
                  className="tagline-input"
                  placeholder="Enter your tagline..."
                />
              ) : (
                <p className="tagline-text">
                  {localGuide.tagline ? `"${localGuide.tagline}"` : 'No tagline set'}
                </p>
              )}
            </div>

            {/* Value Props */}
            <div className="messaging-value-props">
              <label>Value Propositions</label>
              <ul className="value-props-list">
                {localGuide.value_props.map((prop, i) => (
                  <li key={i} className="value-prop-item">
                    <span>{prop}</span>
                    {isEditing && (
                      <button onClick={() => removeValueProp(prop)} className="remove-btn">
                        <XIcon size={14} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <div className="add-item-input">
                  <input
                    type="text"
                    placeholder="Add value proposition..."
                    value={newValueProp}
                    onChange={(e) => setNewValueProp(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addValueProp()}
                  />
                  <button onClick={addValueProp}>
                    <PlusIcon size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Do's and Don'ts */}
            <div className="dos-donts-grid">
              <div className="dos-section">
                <label>
                  <CheckIcon size={16} />
                  Do's
                </label>
                <ul>
                  {localGuide.do_list.map((item, i) => (
                    <li key={i}>
                      <span>{item}</span>
                      {isEditing && (
                        <button onClick={() => removeDo(item)} className="remove-btn">
                          <XIcon size={14} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {isEditing && (
                  <div className="add-item-input">
                    <input
                      type="text"
                      placeholder="Add do..."
                      value={newDo}
                      onChange={(e) => setNewDo(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addDo()}
                    />
                    <button onClick={addDo}>
                      <PlusIcon size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="donts-section">
                <label>
                  <XIcon size={16} />
                  Don'ts
                </label>
                <ul>
                  {localGuide.dont_list.map((item, i) => (
                    <li key={i}>
                      <span>{item}</span>
                      {isEditing && (
                        <button onClick={() => removeDont(item)} className="remove-btn">
                          <XIcon size={14} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {isEditing && (
                  <div className="add-item-input">
                    <input
                      type="text"
                      placeholder="Add don't..."
                      value={newDont}
                      onChange={(e) => setNewDont(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addDont()}
                    />
                    <button onClick={addDont}>
                      <PlusIcon size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
