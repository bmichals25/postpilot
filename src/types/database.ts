// Database types for PostPilot
// Generated based on the required schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Platform = 'twitter' | 'linkedin' | 'instagram';
export type PostStatus = 'draft' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'cancelled';
export type ConnectionStatus = 'active' | 'expired' | 'revoked' | 'error';
export type WorkspaceType = 'personal' | 'business' | 'agency' | 'startup';
export type MemberRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      workspaces: {
        Row: {
          id: string;
          name: string;
          type: string;
          color: string;
          owner_id: string;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          color: string;
          owner_id: string;
          settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          color?: string;
          owner_id?: string;
          settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      workspace_members: {
        Row: {
          workspace_id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          workspace_id: string;
          user_id: string;
          role: string;
          created_at?: string;
        };
        Update: {
          workspace_id?: string;
          user_id?: string;
          role?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          workspace_id: string;
          content: string;
          media_url: string | null;
          platforms: string[];
          scheduled_at: string | null;
          status: string;
          ai_generated: boolean;
          ai_prompt: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          content: string;
          media_url?: string | null;
          platforms: string[];
          scheduled_at?: string | null;
          status?: string;
          ai_generated?: boolean;
          ai_prompt?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          content?: string;
          media_url?: string | null;
          platforms?: string[];
          scheduled_at?: string | null;
          status?: string;
          ai_generated?: boolean;
          ai_prompt?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      platform_connections: {
        Row: {
          id: string;
          workspace_id: string;
          platform: string;
          platform_user_id: string;
          platform_username: string | null;
          access_token: string;
          refresh_token: string | null;
          expires_at: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          platform: string;
          platform_user_id: string;
          platform_username?: string | null;
          access_token: string;
          refresh_token?: string | null;
          expires_at?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          platform?: string;
          platform_user_id?: string;
          platform_username?: string | null;
          access_token?: string;
          refresh_token?: string | null;
          expires_at?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ai_credits: {
        Row: {
          id: string;
          user_id: string;
          total: number;
          used: number;
          reset_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total?: number;
          used?: number;
          reset_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total?: number;
          used?: number;
          reset_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      brand_guides: {
        Row: {
          id: string;
          workspace_id: string;
          colors: Json;
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
          logo_url: string | null;
          logo_dark_url: string | null;
          icon_url: string | null;
          domain: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          colors?: Json;
          heading_font?: string;
          body_font?: string;
          voice_tones?: string[];
          voice_keywords?: string[];
          voice_description?: string | null;
          audience_demographics?: string | null;
          audience_interests?: string | null;
          audience_pain_points?: string | null;
          tagline?: string | null;
          value_props?: string[];
          do_list?: string[];
          dont_list?: string[];
          logo_url?: string | null;
          logo_dark_url?: string | null;
          icon_url?: string | null;
          domain?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          colors?: Json;
          heading_font?: string;
          body_font?: string;
          voice_tones?: string[];
          voice_keywords?: string[];
          voice_description?: string | null;
          audience_demographics?: string | null;
          audience_interests?: string | null;
          audience_pain_points?: string | null;
          tagline?: string | null;
          value_props?: string[];
          do_list?: string[];
          dont_list?: string[];
          logo_url?: string | null;
          logo_dark_url?: string | null;
          icon_url?: string | null;
          domain?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      platform_type: Platform;
      post_status: PostStatus;
      connection_status: ConnectionStatus;
      workspace_type: WorkspaceType;
      member_role: MemberRole;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience types for use in components
export type User = Database['public']['Tables']['users']['Row'];
export type Workspace = Database['public']['Tables']['workspaces']['Row'];
export type WorkspaceMember = Database['public']['Tables']['workspace_members']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type PlatformConnection = Database['public']['Tables']['platform_connections']['Row'];
export type AICredits = Database['public']['Tables']['ai_credits']['Row'];

// Insert types
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type WorkspaceInsert = Database['public']['Tables']['workspaces']['Insert'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PlatformConnectionInsert = Database['public']['Tables']['platform_connections']['Insert'];

// Update types
export type UserUpdate = Database['public']['Tables']['users']['Update'];
export type WorkspaceUpdate = Database['public']['Tables']['workspaces']['Update'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

// Brand Guide types (derived from database schema)
export type BrandGuide = Database['public']['Tables']['brand_guides']['Row'];
export type BrandGuideInsert = Database['public']['Tables']['brand_guides']['Insert'];
export type BrandGuideUpdate = Database['public']['Tables']['brand_guides']['Update'];

// Brand colors type
export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

// Workspace settings type
export interface WorkspaceSettings {
  default_platforms: string[];
  default_hashtags: string[];
  auto_schedule: boolean;
  ai_tone: string;
  ai_max_length: number;
  ai_emojis: 'never' | 'sometimes' | 'always';
}
