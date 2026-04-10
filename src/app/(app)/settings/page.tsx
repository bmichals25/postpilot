'use client';

import React, { useState } from 'react';

const WORKSPACE_TYPES = ['Personal', 'Business', 'Agency', 'Startup'];
const TONE_OPTIONS = ['Professional', 'Friendly', 'Casual', 'Authoritative', 'Playful'];
const LENGTH_OPTIONS = [
  { value: 280, label: 'Short (280 chars — Twitter)' },
  { value: 500, label: 'Medium (500 chars)' },
  { value: 1000, label: 'Long (1000 chars)' },
  { value: 2000, label: 'Very Long (2000 chars)' },
];
const EMOJI_OPTIONS = ['Never', 'Sometimes', 'Always'];
const ACCENT_COLORS = [
  { label: 'Violet', hex: '#7C3AED' },
  { label: 'Blue', hex: '#3B82F6' },
  { label: 'Emerald', hex: '#10B981' },
  { label: 'Amber', hex: '#F59E0B' },
  { label: 'Rose', hex: '#F43F5E' },
  { label: 'Cyan', hex: '#06B6D4' },
];

export default function SettingsPage() {
  const [name, setName] = useState('TechCorp');
  const [type, setType] = useState('Business');
  const [accentColor, setAccentColor] = useState('#7C3AED');
  const [defaultPlatforms, setDefaultPlatforms] = useState(['twitter', 'linkedin']);
  const [autoSchedule, setAutoSchedule] = useState(false);
  const [hashtags, setHashtags] = useState(['#startup', '#techcorp']);
  const [newHashtag, setNewHashtag] = useState('');
  const [tone, setTone] = useState('Professional');
  const [maxLength, setMaxLength] = useState(280);
  const [emojis, setEmojis] = useState('Sometimes');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const togglePlatform = (p: string) =>
    setDefaultPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const addHashtag = () => {
    const tag = newHashtag.trim();
    if (!tag) return;
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    if (!hashtags.includes(formatted)) setHashtags(prev => [...prev, formatted]);
    setNewHashtag('');
  };

  const removeHashtag = (tag: string) => setHashtags(prev => prev.filter(t => t !== tag));

  const sectionStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--bg-border)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: '14px 20px',
    borderBottom: '1px solid var(--bg-border)',
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-primary)',
  };

  const rowStyle: React.CSSProperties = {
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--bg-border-subtle)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13.5,
    color: 'var(--text-primary)',
    fontWeight: 500,
    minWidth: 180,
  };

  return (
    <div className="main-content" style={{ maxWidth: 720 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 className="page-title">Workspace Settings</h1>
          <p className="page-subtitle">Configure settings for "{name}"</p>
        </div>
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={saving}
          style={{
            background: saved ? '#059669' : undefined,
            opacity: saving ? 0.8 : 1,
          }}
        >
          {saving ? (
            <>
              <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid white', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
              Saving...
            </>
          ) : saved ? (
            <>✓ Saved!</>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* General */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>General</div>
        {/* Name */}
        <div style={rowStyle}>
          <span style={labelStyle}>Workspace Name</span>
          <input
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: 240 }}
          />
        </div>
        {/* Type */}
        <div style={rowStyle}>
          <span style={labelStyle}>Workspace Type</span>
          <select
            className="input"
            value={type}
            onChange={e => setType(e.target.value)}
            style={{ width: 240 }}
          >
            {WORKSPACE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        {/* Accent color */}
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <span style={labelStyle}>Accent Color</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {ACCENT_COLORS.map(c => (
              <button
                key={c.hex}
                onClick={() => setAccentColor(c.hex)}
                title={c.label}
                style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: c.hex, border: 'none', cursor: 'pointer',
                  outline: accentColor === c.hex ? `2px solid ${c.hex}` : '2px solid transparent',
                  outlineOffset: 2,
                  boxShadow: accentColor === c.hex ? `0 0 0 1px ${c.hex}40` : 'none',
                  transition: 'outline 0.15s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Posting Defaults */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>Posting Defaults</div>
        {/* Default platforms */}
        <div style={rowStyle}>
          <div>
            <div style={labelStyle}>Default Platforms</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Platforms pre-selected when composing</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { id: 'twitter', label: 'Twitter' },
              { id: 'linkedin', label: 'LinkedIn' },
              { id: 'instagram', label: 'Instagram' },
            ].map(p => {
              const selected = defaultPlatforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  style={{
                    padding: '5px 12px', borderRadius: 7, fontSize: 12.5, fontWeight: 500,
                    border: '1px solid', cursor: 'pointer', fontFamily: 'inherit',
                    background: selected ? 'rgba(124,58,237,0.12)' : 'transparent',
                    borderColor: selected ? 'rgba(124,58,237,0.35)' : 'var(--bg-border)',
                    color: selected ? '#A78BFA' : 'var(--text-muted)',
                    transition: 'all 0.15s',
                  }}
                >
                  {selected && '✓ '}{p.label}
                </button>
              );
            })}
          </div>
        </div>
        {/* Default hashtags */}
        <div style={{ ...rowStyle, alignItems: 'flex-start' }}>
          <div>
            <div style={labelStyle}>Default Hashtags</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Added to every new post</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {hashtags.map(tag => (
                <span
                  key={tag}
                  className="tag tag-violet"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
                >
                  {tag}
                  <button
                    onClick={() => removeHashtag(tag)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', lineHeight: 1, fontSize: 11 }}
                  >×</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                className="input"
                value={newHashtag}
                onChange={e => setNewHashtag(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addHashtag()}
                placeholder="#hashtag"
                style={{ width: 120, padding: '5px 10px', fontSize: 12 }}
              />
              <button className="btn-secondary" onClick={addHashtag} style={{ padding: '5px 10px', fontSize: 12 }}>Add</button>
            </div>
          </div>
        </div>
        {/* Auto schedule */}
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div>
            <div style={labelStyle}>Auto-Schedule Posts</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Automatically pick optimal posting times</div>
          </div>
          <button
            onClick={() => setAutoSchedule(!autoSchedule)}
            className={`toggle ${autoSchedule ? 'on' : ''}`}
          />
        </div>
      </div>

      {/* AI Generation */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>AI Generation</div>
        {/* Tone */}
        <div style={rowStyle}>
          <span style={labelStyle}>Preferred Tone</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {TONE_OPTIONS.map(t => (
              <button
                key={t}
                onClick={() => setTone(t)}
                style={{
                  padding: '4px 10px', borderRadius: 7, fontSize: 12, fontWeight: 500,
                  border: '1px solid', cursor: 'pointer', fontFamily: 'inherit',
                  background: tone === t ? 'rgba(124,58,237,0.12)' : 'transparent',
                  borderColor: tone === t ? 'rgba(124,58,237,0.35)' : 'var(--bg-border)',
                  color: tone === t ? '#A78BFA' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >{t}</button>
            ))}
          </div>
        </div>
        {/* Max length */}
        <div style={rowStyle}>
          <div>
            <div style={labelStyle}>Max Post Length</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>AI won&apos;t exceed this length</div>
          </div>
          <select
            className="input"
            value={maxLength}
            onChange={e => setMaxLength(Number(e.target.value))}
            style={{ width: 260 }}
          >
            {LENGTH_OPTIONS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
        {/* Emojis */}
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <span style={labelStyle}>Include Emojis</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {EMOJI_OPTIONS.map(o => (
              <button
                key={o}
                onClick={() => setEmojis(o)}
                style={{
                  padding: '4px 12px', borderRadius: 7, fontSize: 12, fontWeight: 500,
                  border: '1px solid', cursor: 'pointer', fontFamily: 'inherit',
                  background: emojis === o ? 'rgba(124,58,237,0.12)' : 'transparent',
                  borderColor: emojis === o ? 'rgba(124,58,237,0.35)' : 'var(--bg-border)',
                  color: emojis === o ? '#A78BFA' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >{o}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ ...sectionStyle, borderColor: 'rgba(248,113,113,0.2)' }}>
        <div style={{ ...sectionHeaderStyle, color: '#F87171', borderBottomColor: 'rgba(248,113,113,0.15)' }}>Danger Zone</div>
        <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Delete Workspace</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Permanently delete this workspace and all its data. This action cannot be undone.
            </div>
          </div>
          {showDeleteConfirm ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Are you sure?</span>
              <button
                style={{
                  padding: '6px 12px', borderRadius: 7, fontSize: 13, fontWeight: 600,
                  background: '#EF4444', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Yes, Delete
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
                style={{ padding: '6px 12px', fontSize: 13 }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 7, fontSize: 13, fontWeight: 500,
                background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
                color: '#F87171', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete Workspace
            </button>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
