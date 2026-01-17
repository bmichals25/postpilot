'use client';

import { useState } from 'react';
import { TwitterIcon, LinkedInIcon, InstagramIcon, PlusIcon } from '@/components/icons';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (business: BusinessData) => void;
}

interface BusinessData {
  name: string;
  website: string;
  logo?: string;
  primaryColor: string;
  type: string;
}

interface BrandData {
  name: string;
  logo?: string;
  colors?: string[];
  domain: string;
}

// Predefined color options
const colorOptions = [
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Orange', value: '#F97316' },
];

const businessTypes = [
  { value: 'business', label: 'Business' },
  { value: 'personal', label: 'Personal Brand' },
  { value: 'startup', label: 'Startup' },
  { value: 'agency', label: 'Agency' },
  { value: 'creator', label: 'Creator' },
];

// Globe icon for website input
const GlobeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Sparkle icon for AI/auto
const SparkleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    <path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z" />
    <path d="M19 13l.5 1.5L21 15l-1.5.5L19 17l-.5-1.5L17 15l1.5-.5L19 13z" />
  </svg>
);

// Check icon
const CheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Close icon
const CloseIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function AddBusinessModal({ isOpen, onClose, onComplete }: AddBusinessModalProps) {
  const [step, setStep] = useState<'brand' | 'connect'>('brand');
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [error, setError] = useState('');

  // Manual entry fields
  const [businessName, setBusinessName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const [businessType, setBusinessType] = useState('business');

  // Connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState({
    twitter: false,
    linkedin: false,
    instagram: false,
  });

  const fetchBrandData = async () => {
    if (!websiteUrl) {
      setError('Please enter a website URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Clean the URL
      let domain = websiteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

      // For demo, simulate Brandfetch API response
      // In production, this would call: https://api.brandfetch.io/v2/brands/${domain}
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulated response based on domain
      const mockBrands: Record<string, BrandData> = {
        'apple.com': { name: 'Apple', logo: '🍎', colors: ['#000000', '#555555'], domain: 'apple.com' },
        'google.com': { name: 'Google', logo: '🔍', colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'], domain: 'google.com' },
        'stripe.com': { name: 'Stripe', logo: '💳', colors: ['#635BFF', '#00D4FF'], domain: 'stripe.com' },
        'default': { name: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1), colors: ['#6366F1'], domain },
      };

      const data = mockBrands[domain] || {
        ...mockBrands['default'],
        name: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
        domain
      };

      setBrandData(data);
      setBusinessName(data.name);
      if (data.colors && data.colors[0]) {
        setSelectedColor(data.colors[0]);
      }
    } catch {
      setError('Could not fetch brand data. Please enter details manually.');
      setMode('manual');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectAccount = (platform: 'twitter' | 'linkedin' | 'instagram') => {
    // In production, this would trigger OAuth flow
    // For demo, just toggle the connected state
    setConnectedAccounts(prev => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const handleComplete = () => {
    const business: BusinessData = {
      name: businessName,
      website: websiteUrl || '',
      logo: brandData?.logo,
      primaryColor: selectedColor,
      type: businessType,
    };
    onComplete(business);
    onClose();
  };

  const canProceedToConnect = businessName.trim() !== '';
  const hasConnectedAccount = Object.values(connectedAccounts).some(v => v);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-lg" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {step === 'brand' ? 'Add New Business' : 'Connect Accounts'}
            </h2>
            <p className="modal-subtitle">
              {step === 'brand'
                ? 'Enter your business details to get started'
                : 'Connect your social media accounts'}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="modal-steps">
          <div className={`modal-step ${step === 'brand' ? 'active' : 'completed'}`}>
            <div className="modal-step-number">
              {step === 'connect' ? <CheckIcon size={14} /> : '1'}
            </div>
            <span>Brand Details</span>
          </div>
          <div className="modal-step-line" />
          <div className={`modal-step ${step === 'connect' ? 'active' : ''}`}>
            <div className="modal-step-number">2</div>
            <span>Connect Accounts</span>
          </div>
        </div>

        {/* Content */}
        <div className="modal-content">
          {step === 'brand' ? (
            <>
              {/* Mode Toggle */}
              <div className="mode-toggle">
                <button
                  className={`mode-toggle-btn ${mode === 'auto' ? 'active' : ''}`}
                  onClick={() => setMode('auto')}
                >
                  <SparkleIcon size={16} />
                  Auto-fetch from website
                </button>
                <button
                  className={`mode-toggle-btn ${mode === 'manual' ? 'active' : ''}`}
                  onClick={() => setMode('manual')}
                >
                  Enter manually
                </button>
              </div>

              {mode === 'auto' ? (
                <>
                  {/* Website URL Input */}
                  <div className="form-group">
                    <label className="form-label">Website URL</label>
                    <div className="input-with-icon">
                      <GlobeIcon size={18} />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="example.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchBrandData()}
                      />
                      <button
                        className="input-action-btn"
                        onClick={fetchBrandData}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Fetching...' : 'Fetch'}
                      </button>
                    </div>
                    {error && <p className="form-error">{error}</p>}
                  </div>

                  {/* Brand Preview */}
                  {brandData && (
                    <div className="brand-preview">
                      <div
                        className="brand-preview-logo"
                        style={{ background: selectedColor }}
                      >
                        {brandData.logo || brandData.name.charAt(0)}
                      </div>
                      <div className="brand-preview-info">
                        <input
                          type="text"
                          className="brand-name-input"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                        <span className="brand-domain">{brandData.domain}</span>
                      </div>
                      {brandData.colors && (
                        <div className="brand-colors">
                          {brandData.colors.map((color, i) => (
                            <button
                              key={i}
                              className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                              style={{ background: color }}
                              onClick={() => setSelectedColor(color)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Manual Entry */}
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Business Type</label>
                    <div className="type-grid">
                      {businessTypes.map(type => (
                        <button
                          key={type.value}
                          className={`type-option ${businessType === type.value ? 'selected' : ''}`}
                          onClick={() => setBusinessType(type.value)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Brand Color</label>
                    <div className="color-grid">
                      {colorOptions.map(color => (
                        <button
                          key={color.value}
                          className={`color-option ${selectedColor === color.value ? 'selected' : ''}`}
                          style={{ background: color.value }}
                          onClick={() => setSelectedColor(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {/* Connect Accounts */}
              <div className="connect-accounts-list">
                <button
                  className={`connect-account-btn ${connectedAccounts.twitter ? 'connected' : ''}`}
                  onClick={() => handleConnectAccount('twitter')}
                >
                  <div className="connect-account-icon twitter">
                    <TwitterIcon size={24} />
                  </div>
                  <div className="connect-account-info">
                    <span className="connect-account-name">Twitter / X</span>
                    <span className="connect-account-status">
                      {connectedAccounts.twitter ? 'Connected' : 'Not connected'}
                    </span>
                  </div>
                  <div className="connect-account-action">
                    {connectedAccounts.twitter ? (
                      <span className="connected-badge"><CheckIcon size={16} /> Connected</span>
                    ) : (
                      <span className="connect-btn">Connect</span>
                    )}
                  </div>
                </button>

                <button
                  className={`connect-account-btn ${connectedAccounts.linkedin ? 'connected' : ''}`}
                  onClick={() => handleConnectAccount('linkedin')}
                >
                  <div className="connect-account-icon linkedin">
                    <LinkedInIcon size={24} />
                  </div>
                  <div className="connect-account-info">
                    <span className="connect-account-name">LinkedIn</span>
                    <span className="connect-account-status">
                      {connectedAccounts.linkedin ? 'Connected' : 'Not connected'}
                    </span>
                  </div>
                  <div className="connect-account-action">
                    {connectedAccounts.linkedin ? (
                      <span className="connected-badge"><CheckIcon size={16} /> Connected</span>
                    ) : (
                      <span className="connect-btn">Connect</span>
                    )}
                  </div>
                </button>

                <button
                  className={`connect-account-btn ${connectedAccounts.instagram ? 'connected' : ''}`}
                  onClick={() => handleConnectAccount('instagram')}
                >
                  <div className="connect-account-icon instagram">
                    <InstagramIcon size={24} />
                  </div>
                  <div className="connect-account-info">
                    <span className="connect-account-name">Instagram</span>
                    <span className="connect-account-status">
                      {connectedAccounts.instagram ? 'Connected' : 'Not connected'}
                    </span>
                  </div>
                  <div className="connect-account-action">
                    {connectedAccounts.instagram ? (
                      <span className="connected-badge"><CheckIcon size={16} /> Connected</span>
                    ) : (
                      <span className="connect-btn">Connect</span>
                    )}
                  </div>
                </button>
              </div>

              <p className="connect-hint">
                You can connect more accounts later from Settings → Connections
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {step === 'brand' ? (
            <>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!canProceedToConnect}
                onClick={() => setStep('connect')}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => setStep('brand')}>
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleComplete}
              >
                {hasConnectedAccount ? 'Complete Setup' : 'Skip & Finish'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
