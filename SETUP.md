# PostPilot Setup Guide

This guide provides detailed instructions for setting up PostPilot locally and deploying it to production.

## Table of Contents

- [Supabase Setup](#supabase-setup)
- [Database Migration](#database-migration)
- [Authentication Configuration](#authentication-configuration)
- [Local Development](#local-development)
- [Netlify Deployment](#netlify-deployment)
- [Environment Variables Reference](#environment-variables-reference)
- [Troubleshooting](#troubleshooting)

---

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in or create an account
2. Click **New Project**
3. Fill in the project details:
   - **Name:** PostPilot (or your preferred name)
   - **Database Password:** Generate a strong password and save it securely
   - **Region:** Choose the region closest to your users
4. Click **Create new project** and wait for it to be ready (1-2 minutes)

### Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** (gear icon) > **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (the public anonymous key)
3. Save these - you'll need them for environment variables

---

## Database Migration

### Step 1: Open the SQL Editor

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New query**

### Step 2: Run the Migration

Copy the entire contents of `supabase/migrations/001_initial_schema.sql` and paste it into the SQL Editor.

Alternatively, you can copy the schema below:

```sql
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
```

### Step 3: Execute the Migration

1. Click **Run** or press `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows)
2. You should see "Success. No rows returned" for each statement
3. Verify the tables were created by checking **Table Editor** in the sidebar

---

## Authentication Configuration

### Step 1: Configure Email Templates (Optional)

1. Go to **Authentication** > **Email Templates**
2. Customize the "Magic Link" template to match your branding

### Step 2: Configure Site URL

1. Go to **Authentication** > **URL Configuration**
2. Set the **Site URL** to your production URL (e.g., `https://postpilot-app.netlify.app`)
3. Add localhost to **Redirect URLs** for development:
   - `http://localhost:3000/**`

### Step 3: Configure Auth Providers (Optional)

To enable social login:

1. Go to **Authentication** > **Providers**
2. Enable and configure providers like Google, GitHub, etc.

---

## Local Development

### Step 1: Clone and Install

```bash
git clone https://github.com/bmichals25/postpilot.git
cd postpilot
npm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials from [Supabase Setup](#supabase-setup).

### Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Step 4: Verify Setup

1. Open your browser to `http://localhost:3000`
2. The dashboard should load with mock data (workspace switcher, posts, etc.)
3. Test authentication by implementing a login flow

---

## Netlify Deployment

### Step 1: Prepare for Deployment

1. Ensure your code is pushed to GitHub
2. Make sure the build passes locally:
   ```bash
   npm run build
   ```

### Step 2: Create Netlify Site

1. Log in to [Netlify](https://www.netlify.com)
2. Click **Add new site** > **Import an existing project**
3. Select **GitHub** and authorize Netlify
4. Choose your `postpilot` repository

### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |

### Step 4: Add Environment Variables

1. Go to **Site settings** > **Environment variables**
2. Add the following variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

### Step 5: Deploy

1. Click **Deploy site**
2. Wait for the build to complete
3. Your site will be available at `https://[site-name].netlify.app`

### Step 6: Configure Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **Add custom domain**
3. Follow the DNS configuration instructions

### Step 7: Update Supabase Redirect URLs

1. Go to your Supabase project
2. Navigate to **Authentication** > **URL Configuration**
3. Update **Site URL** to your Netlify URL
4. Add your Netlify URL to **Redirect URLs**:
   - `https://your-site.netlify.app/**`

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGciOiJI...` |

### Where to Get Values

1. **Supabase URL & Anon Key:**
   - Go to Supabase Dashboard > Settings > API
   - Copy "Project URL" and "anon public" key

---

## Troubleshooting

### Build Errors

**Error: "Cannot find module '@supabase/supabase-js'"**
```bash
npm install @supabase/supabase-js @supabase/ssr
```

**Error: "ESLint errors in .netlify directory"**
- This is fixed in the codebase. Ensure `.netlify/**` is in your ESLint ignore patterns.

### Database Errors

**Error: "relation does not exist"**
- Make sure you've run the SQL migration in Supabase SQL Editor
- Check that all CREATE TABLE statements executed successfully

**Error: "permission denied for table"**
- Verify RLS policies are created correctly
- Check that you're authenticated when making requests

### Authentication Errors

**Error: "Invalid Refresh Token"**
- Clear browser cookies and try again
- Check that your Supabase URL and anon key are correct

**Error: "Email link is invalid or has expired"**
- Magic links expire after 24 hours
- Request a new magic link

### Deployment Errors

**Netlify build fails**
1. Check the build logs for specific errors
2. Verify environment variables are set
3. Test the build locally with `npm run build`

**404 errors on page routes**
- Ensure you're using the Next.js Netlify adapter
- Check that `.next` is set as the publish directory

---

## Database Schema Reference

### Tables Overview

| Table | Purpose |
|-------|---------|
| `users` | User profiles linked to Supabase Auth |
| `workspaces` | Workspaces/brands for organizing content |
| `workspace_members` | Team members and their roles |
| `posts` | Social media posts and drafts |
| `platform_connections` | OAuth tokens for connected platforms |
| `ai_credits` | AI generation credits tracking |

### Enum Types

| Type | Values |
|------|--------|
| `platform_type` | twitter, linkedin, instagram |
| `post_status` | draft, scheduled, publishing, published, failed, cancelled |
| `connection_status` | active, expired, revoked, error |
| `workspace_type` | personal, business, agency, startup |
| `member_role` | owner, admin, editor, viewer |

### Row Level Security Summary

- **Users:** Can only access their own profile
- **Workspaces:** Accessible to owners and members
- **Posts:** Members can view; editors+ can create/update; admins+ can delete
- **Connections:** Admins and owners only
- **AI Credits:** User can only access their own credits

---

## Next Steps

After completing setup:

1. **Test Authentication:** Create a test user and verify login works
2. **Create Workspaces:** Test creating and switching between workspaces
3. **Connect Platforms:** Implement OAuth flows for Twitter, LinkedIn, Instagram
4. **Set Up AI:** Connect an AI provider for content generation
5. **Configure Scheduling:** Set up background jobs for post publishing
