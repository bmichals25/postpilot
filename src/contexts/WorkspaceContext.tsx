'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import type { Workspace, PlatformConnection, BrandGuide } from '@/types/database';

// Mock data for unauthenticated users
const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    type: 'business',
    color: 'from-emerald-500 to-emerald-600',
    owner_id: 'mock-user',
    settings: { default_platforms: [], default_hashtags: [], auto_schedule: false, ai_tone: 'professional', ai_max_length: 280, ai_emojis: 'sometimes' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: "Ben's Personal Brand",
    type: 'personal',
    color: 'from-indigo-500 to-purple-500',
    owner_id: 'mock-user',
    settings: { default_platforms: [], default_hashtags: [], auto_schedule: false, ai_tone: 'friendly', ai_max_length: 280, ai_emojis: 'sometimes' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Side Project Co.',
    type: 'startup',
    color: 'from-amber-500 to-orange-500',
    owner_id: 'mock-user',
    settings: { default_platforms: [], default_hashtags: [], auto_schedule: false, ai_tone: 'casual', ai_max_length: 280, ai_emojis: 'always' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockConnections: Record<string, PlatformConnection[]> = {
  '1': [
    { id: 'c1', workspace_id: '1', platform: 'twitter', platform_user_id: 't1', platform_username: '@techcorp', access_token: 'mock', refresh_token: null, expires_at: null, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'c2', workspace_id: '1', platform: 'linkedin', platform_user_id: 'l1', platform_username: 'TechCorp Inc.', access_token: 'mock', refresh_token: null, expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  '2': [
    { id: 'c3', workspace_id: '2', platform: 'twitter', platform_user_id: 't2', platform_username: '@benmichals', access_token: 'mock', refresh_token: null, expires_at: null, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'c4', workspace_id: '2', platform: 'instagram', platform_user_id: 'i1', platform_username: '@ben.michals', access_token: 'mock', refresh_token: null, expires_at: null, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  '3': [
    { id: 'c5', workspace_id: '3', platform: 'twitter', platform_user_id: 't3', platform_username: '@sideproject', access_token: 'mock', refresh_token: null, expires_at: null, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
};

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  connections: PlatformConnection[];
  loading: boolean;
  error: Error | null;
  selectWorkspace: (workspace: Workspace) => void;
  createWorkspace: (name: string, type: string, color: string, domain?: string) => Promise<Workspace | undefined>;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  refetchWorkspaces: () => Promise<void>;
  refetchConnections: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const WORKSPACE_STORAGE_KEY = 'postpilot-current-workspace';

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  // Fetch workspaces
  const fetchWorkspaces = useCallback(async () => {
    if (!user?.id) {
      setWorkspaces(mockWorkspaces);
      // Restore from localStorage or use first mock
      const stored = localStorage.getItem(WORKSPACE_STORAGE_KEY);
      const storedWs = stored ? mockWorkspaces.find(w => w.id === stored) : null;
      setCurrentWorkspace(storedWs || mockWorkspaces[0]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('workspaces')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setWorkspaces(data);
        // Restore from localStorage or use first
        const stored = localStorage.getItem(WORKSPACE_STORAGE_KEY);
        const storedWs = stored ? data.find(w => w.id === stored) : null;
        setCurrentWorkspace(storedWs || data[0]);
      } else {
        setWorkspaces(mockWorkspaces);
        setCurrentWorkspace(mockWorkspaces[0]);
      }
    } catch (err) {
      console.error('Error fetching workspaces:', err);
      setError(err as Error);
      setWorkspaces(mockWorkspaces);
      setCurrentWorkspace(mockWorkspaces[0]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, supabase]);

  // Fetch connections for current workspace
  const fetchConnections = useCallback(async () => {
    if (!currentWorkspace) {
      setConnections([]);
      return;
    }

    if (!user?.id) {
      setConnections(mockConnections[currentWorkspace.id] || []);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('platform_connections')
        .select('*')
        .eq('workspace_id', currentWorkspace.id);

      if (fetchError) throw fetchError;
      setConnections(data || []);
    } catch (err) {
      console.error('Error fetching connections:', err);
      setConnections(mockConnections[currentWorkspace.id] || []);
    }
  }, [currentWorkspace, user?.id, supabase]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const selectWorkspace = useCallback((workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    localStorage.setItem(WORKSPACE_STORAGE_KEY, workspace.id);
  }, []);

  const createWorkspace = useCallback(async (name: string, type: string, color: string, domain?: string) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    const newWorkspace = {
      name,
      type,
      color,
      owner_id: user.id,
      settings: { default_platforms: [], default_hashtags: [], auto_schedule: false, ai_tone: 'professional', ai_max_length: 280, ai_emojis: 'sometimes' as const },
    };

    const { data, error: createError } = await supabase
      .from('workspaces')
      .insert(newWorkspace)
      .select()
      .single();

    if (createError) throw createError;

    if (data) {
      setWorkspaces(prev => [...prev, data]);
      selectWorkspace(data);

      // Create empty brand guide for the workspace
      if (domain) {
        await supabase.from('brand_guides').insert({
          workspace_id: data.id,
          domain,
        });
      }

      return data;
    }
  }, [user?.id, supabase, selectWorkspace]);

  const updateWorkspace = useCallback(async (id: string, updates: Partial<Workspace>) => {
    const { error: updateError } = await supabase
      .from('workspaces')
      .update(updates)
      .eq('id', id);

    if (updateError) throw updateError;

    setWorkspaces(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
    if (currentWorkspace?.id === id) {
      setCurrentWorkspace(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [supabase, currentWorkspace?.id]);

  const deleteWorkspace = useCallback(async (id: string) => {
    const { error: deleteError } = await supabase
      .from('workspaces')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    setWorkspaces(prev => {
      const remaining = prev.filter(w => w.id !== id);
      if (currentWorkspace?.id === id && remaining.length > 0) {
        selectWorkspace(remaining[0]);
      }
      return remaining;
    });
  }, [supabase, currentWorkspace?.id, selectWorkspace]);

  const value = useMemo(() => ({
    workspaces,
    currentWorkspace,
    connections,
    loading,
    error,
    selectWorkspace,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    refetchWorkspaces: fetchWorkspaces,
    refetchConnections: fetchConnections,
  }), [workspaces, currentWorkspace, connections, loading, error, selectWorkspace, createWorkspace, updateWorkspace, deleteWorkspace, fetchWorkspaces, fetchConnections]);

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceContext() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspaceContext must be used within a WorkspaceProvider');
  }
  return context;
}
