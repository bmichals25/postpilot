'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import type { Workspace, Post, PlatformConnection, PostInsert, PostUpdate } from '@/types/database';

// Mock data for when user is not authenticated
const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    type: 'business',
    color: 'from-emerald-500 to-emerald-600',
    owner_id: 'mock-user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: "Ben's Personal Brand",
    type: 'personal',
    color: 'from-indigo-500 to-purple-500',
    owner_id: 'mock-user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Side Project Co.',
    type: 'startup',
    color: 'from-amber-500 to-orange-500',
    owner_id: 'mock-user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function useWorkspaces(userId: string | undefined) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const fetchWorkspaces = useCallback(async () => {
    if (!userId) {
      // Return mock data when not authenticated
      setWorkspaces(mockWorkspaces);
      setCurrentWorkspace(mockWorkspaces[0]);
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
        setCurrentWorkspace(data[0]);
      } else {
        // Fall back to mock data if no workspaces found
        setWorkspaces(mockWorkspaces);
        setCurrentWorkspace(mockWorkspaces[0]);
      }
    } catch (err) {
      console.error('Error fetching workspaces:', err);
      setError(err as Error);
      // Fall back to mock data on error
      setWorkspaces(mockWorkspaces);
      setCurrentWorkspace(mockWorkspaces[0]);
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const selectWorkspace = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  const createWorkspace = async (name: string, type: string, color: string) => {
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const newWorkspace = {
      name,
      type,
      color,
      owner_id: userId,
    };

    const { data, error: createError } = await supabase
      .from('workspaces')
      .insert(newWorkspace)
      .select()
      .single();

    if (createError) throw createError;

    if (data) {
      setWorkspaces((prev) => [...prev, data]);
      return data;
    }
  };

  return {
    workspaces,
    currentWorkspace,
    loading,
    error,
    selectWorkspace,
    createWorkspace,
    refetch: fetchWorkspaces,
  };
}

// Hook for posts within a workspace
export function usePosts(workspaceId: string | undefined) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const fetchPosts = useCallback(async () => {
    if (!workspaceId) {
      setPosts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('scheduled_at', { ascending: true, nullsFirst: false });

      if (fetchError) throw fetchError;

      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err as Error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [workspaceId, supabase]);

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime updates
    if (workspaceId) {
      const channel = supabase
        .channel(`posts-${workspaceId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'posts',
            filter: `workspace_id=eq.${workspaceId}`,
          },
          () => {
            fetchPosts();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [workspaceId, supabase, fetchPosts]);

  const createPost = async (post: PostInsert) => {
    const { data, error: createError } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();

    if (createError) throw createError;
    return data;
  };

  const updatePost = async (id: string, updates: PostUpdate) => {
    const { data, error: updateError } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    return data;
  };

  const deletePost = async (id: string) => {
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
}

// Hook for platform connections
export function usePlatformConnections(workspaceId: string | undefined) {
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const fetchConnections = useCallback(async () => {
    if (!workspaceId) {
      setConnections([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('platform_connections')
        .select('*')
        .eq('workspace_id', workspaceId);

      if (fetchError) throw fetchError;

      setConnections(data || []);
    } catch (err) {
      console.error('Error fetching connections:', err);
      setError(err as Error);
      setConnections([]);
    } finally {
      setLoading(false);
    }
  }, [workspaceId, supabase]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  return {
    connections,
    loading,
    error,
    refetch: fetchConnections,
  };
}
