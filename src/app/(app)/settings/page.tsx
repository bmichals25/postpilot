'use client';

import React, { useState, useEffect } from 'react';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext';
import {
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  CheckIcon,
  SaveIcon,
  TrashIcon,
  PlusIcon,
  XIcon,
} from '@/components/icons';

const workspaceTypes = [
  { value: 'personal', label: 'Personal' },
  { value: 'business', label: 'Business' },
  { value: 'agency', label: 'Agency' },
  { value: 'startup', label: 'Startup' },
];

const themeColors = [
  { value: 'from-indigo-500 to-purple-500', label: 'Purple', hex: '#6366F1' },
  { value: 'from-emerald-500 to-emerald-600', label: 'Emerald', hex: '#10B981' },
  { value: 'from-amber-500 to-orange-500', label: 'Orange', hex: '#F59E0B' },
  { value: 'from-blue-500 to-blue-600', label: 'Blue', hex: '#3B82F6' },
  { value: 'from-rose-500 to-pink-500', label: 'Rose', hex: '#F43F5E' },
  { value: 'from-cyan-500 to-teal-500', label: 'Teal', hex: '#06B6D4' },
];

const toneOptions = ['professional', 'friendly', 'casual', 'authoritative', 'playful'];
const lengthOptions = [
  { value: 280, label: 'Short (280 chars - Twitter)' },
  { value: 500, label: 'Medium (500 chars)' },
  { value: 1000, label: 'Long (1000 chars)' },
  { value: 2000, label: 'Very Long (2000 chars)' },
];
const emojiOptions = ['never', 'sometimes', 'always'];

export default function SettingsPage() {
  const { currentWorkspace, updateWorkspace, deleteWorkspace, connections } = useWorkspaceContext();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Local state for editing
  const [name, setName] = useState('');
  const [type, setType] = useState('personal');
  const [color, setColor] = useState('from-indigo-500 to-purple-500');
  const [settings, setSettings] = useState({
    default_platforms: [] as string[],
    default_hashtags: [] as string[],
    auto_schedule: false,
    ai_tone: 'professional',
    ai_max_length: 280,
    ai_emojis: 'sometimes' as 'never' | 'sometimes' | 'always',
  });
  const [newHashtag, setNewHashtag] = useState('');

  // Sync from workspace
  useEffect(() => {
    if (currentWorkspace) {
      setName(currentWorkspace.name);
      setType(currentWorkspace.type);
      setColor(currentWorkspace.color);
      const ws = currentWorkspace.settings as typeof settings;
      if (ws) {
        setSettings({
          default_platforms: ws.default_platforms || [],
          default_hashtags: ws.default_hashtags || [],
          auto_schedule: ws.auto_schedule || false,
          ai_tone: ws.ai_tone || 'professional',
          ai_max_length: ws.ai_max_length || 280,
          ai_emojis: ws.ai_emojis || 'sometimes',
        });
      }
    }
  }, [currentWorkspace]);

  const handleSave = async () => {
    if (!currentWorkspace) return;
    setSaving(true);
    try {
      await updateWorkspace(currentWorkspace.id, {
        name,
        type,
        color,
        settings,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentWorkspace) return;
    try {
      await deleteWorkspace(currentWorkspace.id);
    } catch (error) {
      console.error('Failed to delete workspace:', error);
    }
  };

  const togglePlatform = (platform: string) => {
    setSettings(prev => ({
      ...prev,
      default_platforms: prev.default_platforms.includes(platform)
        ? prev.default_platforms.filter(p => p !== platform)
        : [...prev.default_platforms, platform],
    }));
  };

  const addHashtag = () => {
    if (!newHashtag.trim()) return;
    const tag = newHashtag.startsWith('#') ? newHashtag : `#${newHashtag}`;
    if (!settings.default_hashtags.includes(tag)) {
      setSettings(prev => ({
        ...prev,
        default_hashtags: [...prev.default_hashtags, tag],
      }));
    }
    setNewHashtag('');
  };

  const removeHashtag = (tag: string) => {
    setSettings(prev => ({
      ...prev,
      default_hashtags: prev.default_hashtags.filter(t => t !== tag),
    }));
  };

  if (!currentWorkspace) {
    return <div className="settings-loading">Loading...</div>;
  }

  return (
    <div className="settings-page">
      <header className="page-header">
        <div>
          <h1>Workspace Settings</h1>
          <p>Configure settings for "{currentWorkspace.name}"</p>
        </div>
        <button
          className={`btn-primary ${saved ? 'btn-success' : ''}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saved ? <CheckIcon size={18} /> : <SaveIcon size={18} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </header>

      {/* General Settings */}
      <section className="settings-section">
        <h2>General</h2>
        <div className="settings-grid">
          <div className="settings-field">
            <label>Workspace Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Workspace"
            />
          </div>
          <div className="settings-field">
            <label>Workspace Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {workspaceTypes.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="settings-field">
            <label>Theme Color</label>
            <div className="color-picker">
              {themeColors.map(c => (
                <button
                  key={c.value}
                  className={`color-option ${color === c.value ? 'selected' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c.value)}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posting Defaults */}
      <section className="settings-section">
        <h2>Posting Defaults</h2>
        <div className="settings-grid">
          <div className="settings-field full-width">
            <label>Default Platforms</label>
            <div className="platform-toggles">
              {['twitter', 'linkedin', 'instagram'].map(platform => {
                const isConnected = connections.some(c => c.platform === platform);
                const isSelected = settings.default_platforms.includes(platform);
                return (
                  <button
                    key={platform}
                    className={`platform-toggle ${isSelected ? 'selected' : ''} ${!isConnected ? 'disabled' : ''}`}
                    onClick={() => isConnected && togglePlatform(platform)}
                    disabled={!isConnected}
                  >
                    {platform === 'twitter' && <TwitterIcon size={18} />}
                    {platform === 'linkedin' && <LinkedInIcon size={18} />}
                    {platform === 'instagram' && <InstagramIcon size={18} />}
                    <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                    {isSelected && <CheckIcon size={14} />}
                    {!isConnected && <span className="not-connected">Not connected</span>}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="settings-field full-width">
            <label>Default Hashtags</label>
            <div className="hashtag-list">
              {settings.default_hashtags.map(tag => (
                <span key={tag} className="hashtag-tag">
                  {tag}
                  <button onClick={() => removeHashtag(tag)}><XIcon size={12} /></button>
                </span>
              ))}
              <div className="hashtag-input">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addHashtag()}
                  placeholder="Add hashtag..."
                />
                <button onClick={addHashtag}><PlusIcon size={14} /></button>
              </div>
            </div>
          </div>
          <div className="settings-field">
            <label>Auto-schedule Posts</label>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.auto_schedule}
                onChange={(e) => setSettings(prev => ({ ...prev, auto_schedule: e.target.checked }))}
              />
              <span className="toggle-slider" />
              <span className="toggle-label">{settings.auto_schedule ? 'On' : 'Off'}</span>
            </label>
          </div>
        </div>
      </section>

      {/* AI Generation Settings */}
      <section className="settings-section">
        <h2>AI Generation</h2>
        <div className="settings-grid">
          <div className="settings-field">
            <label>Preferred Tone</label>
            <select
              value={settings.ai_tone}
              onChange={(e) => setSettings(prev => ({ ...prev, ai_tone: e.target.value }))}
            >
              {toneOptions.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="settings-field">
            <label>Max Post Length</label>
            <select
              value={settings.ai_max_length}
              onChange={(e) => setSettings(prev => ({ ...prev, ai_max_length: parseInt(e.target.value) }))}
            >
              {lengthOptions.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
          <div className="settings-field full-width">
            <label>Include Emojis</label>
            <div className="radio-group">
              {emojiOptions.map(opt => (
                <label key={opt} className="radio-option">
                  <input
                    type="radio"
                    name="emojis"
                    value={opt}
                    checked={settings.ai_emojis === opt}
                    onChange={() => setSettings(prev => ({ ...prev, ai_emojis: opt as typeof settings.ai_emojis }))}
                  />
                  <span>{opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="settings-section danger">
        <h2>Danger Zone</h2>
        <div className="danger-content">
          <div>
            <h3>Delete Workspace</h3>
            <p>Permanently delete this workspace and all its data. This action cannot be undone.</p>
          </div>
          {showDeleteConfirm ? (
            <div className="delete-confirm">
              <span>Are you sure?</span>
              <button className="btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          ) : (
            <button className="btn-danger-outline" onClick={() => setShowDeleteConfirm(true)}>
              <TrashIcon size={16} />
              Delete Workspace
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
