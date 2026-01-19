'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import type { BrandGuide, BrandGuideUpdate, BrandColors } from '@/types/database';

// Default brand guide for new workspaces
const defaultBrandGuide: Omit<BrandGuide, 'id' | 'workspace_id' | 'created_at' | 'updated_at'> = {
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
  logo_url: null,
  logo_dark_url: null,
  icon_url: null,
  domain: null,
};

// Mock brand guides per workspace
const mockBrandGuides: Record<string, BrandGuide> = {
  '1': {
    id: 'bg1',
    workspace_id: '1',
    colors: { primary: '#10B981', secondary: '#059669', accent: '#F59E0B', background: '#F9FAFB' },
    heading_font: 'inter',
    body_font: 'inter',
    voice_tones: ['professional', 'innovative'],
    voice_keywords: ['technology', 'innovation', 'future'],
    voice_description: 'We speak with authority about technology while remaining approachable.',
    audience_demographics: 'Tech professionals, 25-45, decision makers',
    audience_interests: 'Technology, productivity, innovation',
    audience_pain_points: 'Complexity, slow processes, outdated tools',
    tagline: 'Building the future, today.',
    value_props: ['Cutting-edge solutions', 'Expert support', 'Proven results'],
    do_list: ['Be confident', 'Use data', 'Show expertise'],
    dont_list: ['Be arrogant', 'Use jargon', 'Overpromise'],
    logo_url: null,
    logo_dark_url: null,
    icon_url: null,
    domain: 'techcorp.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  '2': {
    id: 'bg2',
    workspace_id: '2',
    colors: { primary: '#6366F1', secondary: '#8B5CF6', accent: '#EC4899', background: '#FAFAF9' },
    heading_font: 'inter',
    body_font: 'inter',
    voice_tones: ['authentic', 'inspiring'],
    voice_keywords: ['growth', 'learning', 'journey'],
    voice_description: 'Personal and relatable, sharing real experiences and lessons learned.',
    audience_demographics: 'Aspiring entrepreneurs, 20-35',
    audience_interests: 'Personal development, startups, side hustles',
    audience_pain_points: 'Imposter syndrome, getting started, time management',
    tagline: 'Build in public. Grow together.',
    value_props: ['Authentic insights', 'Actionable advice', 'Community support'],
    do_list: ['Be vulnerable', 'Share failures', 'Celebrate wins'],
    dont_list: ['Brag', 'Be preachy', 'Ignore comments'],
    logo_url: null,
    logo_dark_url: null,
    icon_url: null,
    domain: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  '3': {
    id: 'bg3',
    workspace_id: '3',
    ...defaultBrandGuide,
    colors: { primary: '#F59E0B', secondary: '#F97316', accent: '#10B981', background: '#FFFBEB' },
    domain: 'sideproject.co',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

export function useBrandGuide(workspaceId: string | undefined, isAuthenticated: boolean = false) {
  const [brandGuide, setBrandGuide] = useState<BrandGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [saving, setSaving] = useState(false);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const fetchBrandGuide = useCallback(async () => {
    if (!workspaceId) {
      setBrandGuide(null);
      setLoading(false);
      return;
    }

    if (!isAuthenticated) {
      setBrandGuide(mockBrandGuides[workspaceId] || null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('brand_guides')
        .select('*')
        .eq('workspace_id', workspaceId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      setBrandGuide(data);
    } catch (err) {
      console.error('Error fetching brand guide:', err);
      setError(err as Error);
      setBrandGuide(mockBrandGuides[workspaceId] || null);
    } finally {
      setLoading(false);
    }
  }, [workspaceId, isAuthenticated, supabase]);

  useEffect(() => {
    fetchBrandGuide();
  }, [fetchBrandGuide]);

  const updateBrandGuide = useCallback(async (updates: BrandGuideUpdate) => {
    if (!workspaceId) return;

    setSaving(true);
    try {
      if (!isAuthenticated) {
        // Update mock data locally
        setBrandGuide(prev => prev ? { ...prev, ...updates, updated_at: new Date().toISOString() } : null);
        return;
      }

      if (brandGuide) {
        // Update existing
        const { data, error: updateError } = await supabase
          .from('brand_guides')
          .update(updates)
          .eq('workspace_id', workspaceId)
          .select()
          .single();

        if (updateError) throw updateError;
        setBrandGuide(data);
      } else {
        // Create new
        const { data, error: insertError } = await supabase
          .from('brand_guides')
          .insert({ workspace_id: workspaceId, ...updates })
          .select()
          .single();

        if (insertError) throw insertError;
        setBrandGuide(data);
      }
    } catch (err) {
      console.error('Error updating brand guide:', err);
      setError(err as Error);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [workspaceId, isAuthenticated, brandGuide, supabase]);

  const createBrandGuide = useCallback(async (data: Partial<BrandGuide>) => {
    if (!workspaceId) return;

    setSaving(true);
    try {
      const { data: created, error: createError } = await supabase
        .from('brand_guides')
        .insert({ workspace_id: workspaceId, ...data })
        .select()
        .single();

      if (createError) throw createError;
      setBrandGuide(created);
      return created;
    } catch (err) {
      console.error('Error creating brand guide:', err);
      setError(err as Error);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [workspaceId, supabase]);

  return {
    brandGuide,
    loading,
    error,
    saving,
    updateBrandGuide,
    createBrandGuide,
    refetch: fetchBrandGuide,
  };
}
