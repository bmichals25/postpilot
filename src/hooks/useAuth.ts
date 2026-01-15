'use client';

import { useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import type { User as DbUser, AICredits } from '@/types/database';

interface AuthState {
  user: User | null;
  profile: DbUser | null;
  credits: AICredits | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    credits: null,
    session: null,
    loading: true,
    error: null,
  });

  const supabase = createSupabaseBrowserClient();

  // Fetch user profile and credits
  const fetchUserData = useCallback(async (userId: string) => {
    try {
      const [profileResult, creditsResult] = await Promise.all([
        supabase.from('users').select('*').eq('id', userId).single(),
        supabase.from('ai_credits').select('*').eq('user_id', userId).single(),
      ]);

      setState((prev) => ({
        ...prev,
        profile: profileResult.data,
        credits: creditsResult.data,
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [supabase]);

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setState((prev) => ({
            ...prev,
            user: session.user,
            session,
            loading: false,
          }));
          await fetchUserData(session.user.id);
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error as Error,
          loading: false,
        }));
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setState((prev) => ({
            ...prev,
            user: session.user,
            session,
            loading: false,
          }));
          await fetchUserData(session.user.id);
        } else {
          setState({
            user: null,
            profile: null,
            credits: null,
            session: null,
            loading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchUserData]);

  // Sign in with magic link
  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    ...state,
    signInWithEmail,
    signOut,
    isAuthenticated: !!state.user,
  };
}
