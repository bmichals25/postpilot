-- PostPilot Database Schema
-- Run this migration in your Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUM TYPES
-- ============================================
CREATE TYPE platform_type AS ENUM ('twitter', 'linkedin', 'instagram');
CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'publishing', 'published', 'failed', 'cancelled');
CREATE TYPE connection_status AS ENUM ('active', 'expired', 'revoked', 'error');
CREATE TYPE workspace_type AS ENUM ('personal', 'business', 'agency', 'startup');
CREATE TYPE member_role AS ENUM ('owner', 'admin', 'editor', 'viewer');

-- ============================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX idx_users_email ON public.users(email);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- WORKSPACES TABLE
-- ============================================
CREATE TABLE public.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type workspace_type NOT NULL DEFAULT 'personal',
    color TEXT NOT NULL DEFAULT 'from-indigo-500 to-purple-500',
    owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workspaces_owner ON public.workspaces(owner_id);

CREATE TRIGGER update_workspaces_updated_at
    BEFORE UPDATE ON public.workspaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- WORKSPACE MEMBERS TABLE
-- ============================================
CREATE TABLE public.workspace_members (
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role member_role NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (workspace_id, user_id)
);

CREATE INDEX idx_workspace_members_user ON public.workspace_members(user_id);

-- ============================================
-- POSTS TABLE
-- ============================================
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_url TEXT,
    platforms platform_type[] NOT NULL DEFAULT '{}',
    scheduled_at TIMESTAMPTZ,
    status post_status NOT NULL DEFAULT 'draft',
    ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
    ai_prompt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_workspace ON public.posts(workspace_id);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_scheduled ON public.posts(scheduled_at) WHERE status = 'scheduled';

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PLATFORM CONNECTIONS TABLE
-- ============================================
CREATE TABLE public.platform_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    platform platform_type NOT NULL,
    platform_user_id TEXT NOT NULL,
    platform_username TEXT,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMPTZ,
    status connection_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Prevent duplicate platform connections per workspace
    CONSTRAINT unique_workspace_platform UNIQUE (workspace_id, platform, platform_user_id)
);

CREATE INDEX idx_platform_connections_workspace ON public.platform_connections(workspace_id);
CREATE INDEX idx_platform_connections_status ON public.platform_connections(status);

CREATE TRIGGER update_platform_connections_updated_at
    BEFORE UPDATE ON public.platform_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- AI CREDITS TABLE
-- ============================================
CREATE TABLE public.ai_credits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    total INTEGER NOT NULL DEFAULT 1000,
    used INTEGER NOT NULL DEFAULT 0,
    reset_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT positive_credits CHECK (total >= 0 AND used >= 0 AND used <= total)
);

CREATE TRIGGER update_ai_credits_updated_at
    BEFORE UPDATE ON public.ai_credits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_credits ENABLE ROW LEVEL SECURITY;

-- Users: Can only access their own profile
CREATE POLICY "Users can view own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.users FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Workspaces: Owner and members can access
CREATE POLICY "Users can view workspaces they belong to"
    ON public.workspaces FOR SELECT
    USING (
        owner_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_id = workspaces.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create workspaces"
    ON public.workspaces FOR INSERT
    WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update their workspaces"
    ON public.workspaces FOR UPDATE
    USING (owner_id = auth.uid());

CREATE POLICY "Owners can delete their workspaces"
    ON public.workspaces FOR DELETE
    USING (owner_id = auth.uid());

-- Workspace Members: Based on workspace access
CREATE POLICY "Users can view members of their workspaces"
    ON public.workspace_members FOR SELECT
    USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = workspace_members.workspace_id AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Workspace owners/admins can manage members"
    ON public.workspace_members FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = workspace_members.workspace_id AND owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.workspace_members wm
            WHERE wm.workspace_id = workspace_members.workspace_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin')
        )
    );

-- Posts: Based on workspace membership
CREATE POLICY "Users can view posts in their workspaces"
    ON public.posts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = posts.workspace_id AND owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_id = posts.workspace_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create posts in their workspaces"
    ON public.posts FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = posts.workspace_id AND owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_id = posts.workspace_id
            AND user_id = auth.uid()
            AND role IN ('owner', 'admin', 'editor')
        )
    );

CREATE POLICY "Users can update posts in their workspaces"
    ON public.posts FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = posts.workspace_id AND owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_id = posts.workspace_id
            AND user_id = auth.uid()
            AND role IN ('owner', 'admin', 'editor')
        )
    );

CREATE POLICY "Users can delete posts in their workspaces"
    ON public.posts FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = posts.workspace_id AND owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_id = posts.workspace_id
            AND user_id = auth.uid()
            AND role IN ('owner', 'admin')
        )
    );

-- Platform Connections: Based on workspace membership
CREATE POLICY "Users can view connections in their workspaces"
    ON public.platform_connections FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = platform_connections.workspace_id AND owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_id = platform_connections.workspace_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage connections in their workspaces"
    ON public.platform_connections FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.workspaces
            WHERE id = platform_connections.workspace_id AND owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_id = platform_connections.workspace_id
            AND user_id = auth.uid()
            AND role IN ('owner', 'admin')
        )
    );

-- AI Credits: Users can only access their own
CREATE POLICY "Users can view own credits"
    ON public.ai_credits FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update own credits"
    ON public.ai_credits FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "System can insert credits for users"
    ON public.ai_credits FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create user profile
    INSERT INTO public.users (id, email, name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );

    -- Create default AI credits
    INSERT INTO public.ai_credits (user_id, total, used)
    VALUES (NEW.id, 1000, 0);

    -- Create default workspace
    INSERT INTO public.workspaces (name, type, color, owner_id)
    VALUES ('My Workspace', 'personal', 'from-indigo-500 to-purple-500', NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to use AI credits
CREATE OR REPLACE FUNCTION public.use_ai_credits(p_user_id UUID, p_amount INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    v_available INTEGER;
BEGIN
    SELECT (total - used) INTO v_available
    FROM public.ai_credits
    WHERE user_id = p_user_id
    FOR UPDATE;

    IF v_available >= p_amount THEN
        UPDATE public.ai_credits
        SET used = used + p_amount
        WHERE user_id = p_user_id;
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- REALTIME SUBSCRIPTIONS
-- ============================================

-- Enable realtime for posts table (for live updates)
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
