import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

// Supabase project credentials
// Using the same Supabase project as the pipeline dashboard
// PostPilot tables will be added to this project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zkuwpgxcudoeblkvrttc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdXdwZ3hjdWRvZWJsa3ZydHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNDE0MjQsImV4cCI6MjA4MjYxNzQyNH0.39Q3FlLaB6AES4ZqHgEGa7KLOY7RUr1C_D0uqw_mXeE';

// Create a Supabase client for client-side usage
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Create browser client for Next.js App Router
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Helper to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
