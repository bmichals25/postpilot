'use client';

import { useState } from 'react';
import { LightningIcon, PlusIcon } from '@/components/icons';

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

interface BrandGuide {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  voice: {
    tones: string[];
    keywords: string[];
    description: string;
  };
  audience: {
    demographics: string;
    interests: string;
    painPoints: string;
  };
  messaging: {
    tagline: string;
    valueProps: string[];
    doList: string[];
    dontList: string[];
  };
}

export default function BrandGuidePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Brand guide state
  const [brandGuide, setBrandGuide] = useState<BrandGuide>({
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#10B981',
      background: '#FAFAF9',
    },
    typography: {
      headingFont: 'inter',
      bodyFont: 'inter',
    },
    voice: {
      tones: ['professional', 'friendly'],
      keywords: ['innovative', 'reliable', 'efficient', 'modern'],
      description: 'We communicate with confidence and warmth, making complex topics accessible while maintaining our expertise.',
    },
    audience: {
      demographics: 'Small to medium business owners, marketing managers, and entrepreneurs aged 25-45',
      interests: 'Social media marketing, brand building, automation, productivity tools',
      painPoints: 'Limited time for social media, inconsistent posting, difficulty creating engaging content',
    },
    messaging: {
      tagline: 'Your social media, on autopilot.',
      valueProps: [
        'Save 10+ hours per week on social media management',
        'AI-powered content that sounds like you',
        'Schedule once, post everywhere',
      ],
      doList: [
        'Use action-oriented language',
        'Include relevant emojis sparingly',
        'Ask engaging questions',
        'Share valuable insights',
      ],
      dontList: [
        'Use jargon or buzzwords',
        'Be overly salesy',
        'Post without a clear purpose',
        'Ignore comments or engagement',
      ],
    },
  });

  // Temporary edit state
  const [editState, setEditState] = useState<BrandGuide>(brandGuide);
  const [newKeyword, setNewKeyword] = useState('');
  const [newValueProp, setNewValueProp] = useState('');
  const [newDo, setNewDo] = useState('');
  const [newDont, setNewDont] = useState('');

  const handleEditStart = () => {
    setEditState({ ...brandGuide });
    setIsEditing(true);
  };

  const handleSave = () => {
    setBrandGuide({ ...editState });
    setIsEditing(false);
    setActiveSection(null);
  };

  const handleCancel = () => {
    setEditState({ ...brandGuide });
    setIsEditing(false);
    setActiveSection(null);
  };

  const handleGenerateVoice = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    setEditState(prev => ({
      ...prev,
      voice: {
        ...prev.voice,
        description: 'We speak with the confidence of industry experts while maintaining the approachability of a trusted friend. Our tone is optimistic and forward-thinking, always focusing on solutions rather than problems. We use clear, jargon-free language that empowers our audience to take action.',
        keywords: ['empowering', 'innovative', 'approachable', 'results-driven', 'authentic'],
      },
    }));
    setIsGenerating(false);
  };

  const toggleTone = (toneId: string) => {
    setEditState(prev => ({
      ...prev,
      voice: {
        ...prev.voice,
        tones: prev.voice.tones.includes(toneId)
          ? prev.voice.tones.filter(t => t !== toneId)
          : [...prev.voice.tones, toneId],
      },
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setEditState(prev => ({
        ...prev,
        voice: {
          ...prev.voice,
          keywords: [...prev.voice.keywords, newKeyword.trim()],
        },
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setEditState(prev => ({
      ...prev,
      voice: {
        ...prev.voice,
        keywords: prev.voice.keywords.filter(k => k !== keyword),
      },
    }));
  };

  const addValueProp = () => {
    if (newValueProp.trim()) {
      setEditState(prev => ({
        ...prev,
        messaging: {
          ...prev.messaging,
          valueProps: [...prev.messaging.valueProps, newValueProp.trim()],
        },
      }));
      setNewValueProp('');
    }
  };

  const removeValueProp = (prop: string) => {
    setEditState(prev => ({
      ...prev,
      messaging: {
        ...prev.messaging,
        valueProps: prev.messaging.valueProps.filter(p => p !== prop),
      },
    }));
  };

  const addDo = () => {
    if (newDo.trim()) {
      setEditState(prev => ({
        ...prev,
        messaging: {
          ...prev.messaging,
          doList: [...prev.messaging.doList, newDo.trim()],
        },
      }));
      setNewDo('');
    }
  };

  const removeDo = (item: string) => {
    setEditState(prev => ({
      ...prev,
      messaging: {
        ...prev.messaging,
        doList: prev.messaging.doList.filter(d => d !== item),
      },
    }));
  };

  const addDont = () => {
    if (newDont.trim()) {
      setEditState(prev => ({
        ...prev,
        messaging: {
          ...prev.messaging,
          dontList: [...prev.messaging.dontList, newDont.trim()],
        },
      }));
      setNewDont('');
    }
  };

  const removeDont = (item: string) => {
    setEditState(prev => ({
      ...prev,
      messaging: {
        ...prev.messaging,
        dontList: prev.messaging.dontList.filter(d => d !== item),
      },
    }));
  };

  const currentData = isEditing ? editState : brandGuide;

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
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                <SaveIcon size={16} />
                Save Changes
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
              {Object.entries(currentData.colors).map(([key, value]) => (
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
                      onChange={(e) => setEditState(prev => ({
                        ...prev,
                        colors: { ...prev.colors, [key]: e.target.value },
                      }))}
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
                      onClick={() => setEditState(prev => ({
                        ...prev,
                        colors: { ...prev.colors, primary: preset.value },
                      }))}
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
                    value={editState.typography.headingFont}
                    onChange={(e) => setEditState(prev => ({
                      ...prev,
                      typography: { ...prev.typography, headingFont: e.target.value },
                    }))}
                    className="font-select"
                  >
                    {fontOptions.map(font => (
                      <option key={font.id} value={font.id}>{font.label}</option>
                    ))}
                  </select>
                ) : (
                  <div className="font-preview heading">
                    {fontOptions.find(f => f.id === currentData.typography.headingFont)?.label}
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
                    value={editState.typography.bodyFont}
                    onChange={(e) => setEditState(prev => ({
                      ...prev,
                      typography: { ...prev.typography, bodyFont: e.target.value },
                    }))}
                    className="font-select"
                  >
                    {fontOptions.map(font => (
                      <option key={font.id} value={font.id}>{font.label}</option>
                    ))}
                  </select>
                ) : (
                  <div className="font-preview body">
                    {fontOptions.find(f => f.id === currentData.typography.bodyFont)?.label}
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
                  const isSelected = currentData.voice.tones.includes(tone.id);
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
                {currentData.voice.keywords.map(keyword => (
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
                  value={editState.voice.description}
                  onChange={(e) => setEditState(prev => ({
                    ...prev,
                    voice: { ...prev.voice, description: e.target.value },
                  }))}
                  rows={4}
                  placeholder="Describe how your brand communicates..."
                />
              ) : (
                <p className="voice-text">{currentData.voice.description}</p>
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
                    value={editState.audience.demographics}
                    onChange={(e) => setEditState(prev => ({
                      ...prev,
                      audience: { ...prev.audience, demographics: e.target.value },
                    }))}
                    rows={2}
                  />
                ) : (
                  <p>{currentData.audience.demographics}</p>
                )}
              </div>
              <div className="audience-item">
                <label>Interests</label>
                {isEditing ? (
                  <textarea
                    value={editState.audience.interests}
                    onChange={(e) => setEditState(prev => ({
                      ...prev,
                      audience: { ...prev.audience, interests: e.target.value },
                    }))}
                    rows={2}
                  />
                ) : (
                  <p>{currentData.audience.interests}</p>
                )}
              </div>
              <div className="audience-item">
                <label>Pain Points</label>
                {isEditing ? (
                  <textarea
                    value={editState.audience.painPoints}
                    onChange={(e) => setEditState(prev => ({
                      ...prev,
                      audience: { ...prev.audience, painPoints: e.target.value },
                    }))}
                    rows={2}
                  />
                ) : (
                  <p>{currentData.audience.painPoints}</p>
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
                  value={editState.messaging.tagline}
                  onChange={(e) => setEditState(prev => ({
                    ...prev,
                    messaging: { ...prev.messaging, tagline: e.target.value },
                  }))}
                  className="tagline-input"
                />
              ) : (
                <p className="tagline-text">"{currentData.messaging.tagline}"</p>
              )}
            </div>

            {/* Value Props */}
            <div className="messaging-value-props">
              <label>Value Propositions</label>
              <ul className="value-props-list">
                {currentData.messaging.valueProps.map((prop, i) => (
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
                  {currentData.messaging.doList.map((item, i) => (
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
                  {currentData.messaging.dontList.map((item, i) => (
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
