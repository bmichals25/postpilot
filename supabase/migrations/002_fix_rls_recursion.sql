-- ============================================
-- FIX RLS POLICY RECURSION
-- ============================================
-- The original policies had circular references between workspaces and workspace_members
-- This migration fixes that by using SECURITY DEFINER functions

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view workspaces they belong to" ON public.workspaces;
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners/admins can manage members" ON public.workspace_members;
DROP POLICY IF EXISTS "Members can view posts in their workspaces" ON public.posts;
DROP POLICY IF EXISTS "Members can create posts" ON public.posts;
DROP POLICY IF EXISTS "Members can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;
DROP POLICY IF EXISTS "Members can view connections" ON public.platform_connections;
DROP POLICY IF EXISTS "Admins can manage connections" ON public.platform_connections;

-- Create helper function to check workspace membership (SECURITY DEFINER to bypass RLS)
CREATE OR REPLACE FUNCTION public.is_workspace_member(ws_id UUID, uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.workspace_members
        WHERE workspace_id = ws_id AND user_id = uid
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create helper function to check workspace ownership (SECURITY DEFINER to bypass RLS)
CREATE OR REPLACE FUNCTION public.is_workspace_owner(ws_id UUID, uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.workspaces
        WHERE id = ws_id AND owner_id = uid
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create helper function to get user's role in workspace
CREATE OR REPLACE FUNCTION public.get_workspace_role(ws_id UUID, uid UUID)
RETURNS TEXT AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.workspace_members
    WHERE workspace_id = ws_id AND user_id = uid;
    RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- NEW WORKSPACES POLICIES (simplified)
-- ============================================

CREATE POLICY "workspaces_select"
    ON public.workspaces FOR SELECT
    USING (
        owner_id = auth.uid() OR
        public.is_workspace_member(id, auth.uid())
    );

-- ============================================
-- NEW WORKSPACE MEMBERS POLICIES (simplified)
-- ============================================

CREATE POLICY "workspace_members_select"
    ON public.workspace_members FOR SELECT
    USING (
        user_id = auth.uid() OR
        public.is_workspace_owner(workspace_id, auth.uid())
    );

CREATE POLICY "workspace_members_insert"
    ON public.workspace_members FOR INSERT
    WITH CHECK (
        public.is_workspace_owner(workspace_id, auth.uid())
    );

CREATE POLICY "workspace_members_update"
    ON public.workspace_members FOR UPDATE
    USING (
        public.is_workspace_owner(workspace_id, auth.uid())
    );

CREATE POLICY "workspace_members_delete"
    ON public.workspace_members FOR DELETE
    USING (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        user_id = auth.uid()
    );

-- ============================================
-- NEW POSTS POLICIES (using helper functions)
-- ============================================

CREATE POLICY "posts_select"
    ON public.posts FOR SELECT
    USING (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        public.is_workspace_member(workspace_id, auth.uid())
    );

CREATE POLICY "posts_insert"
    ON public.posts FOR INSERT
    WITH CHECK (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        public.is_workspace_member(workspace_id, auth.uid())
    );

CREATE POLICY "posts_update"
    ON public.posts FOR UPDATE
    USING (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        public.is_workspace_member(workspace_id, auth.uid())
    );

CREATE POLICY "posts_delete"
    ON public.posts FOR DELETE
    USING (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        public.get_workspace_role(workspace_id, auth.uid()) = 'admin'
    );

-- ============================================
-- NEW PLATFORM CONNECTIONS POLICIES
-- ============================================

CREATE POLICY "connections_select"
    ON public.platform_connections FOR SELECT
    USING (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        public.is_workspace_member(workspace_id, auth.uid())
    );

CREATE POLICY "connections_insert"
    ON public.platform_connections FOR INSERT
    WITH CHECK (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        public.get_workspace_role(workspace_id, auth.uid()) = 'admin'
    );

CREATE POLICY "connections_update"
    ON public.platform_connections FOR UPDATE
    USING (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        public.get_workspace_role(workspace_id, auth.uid()) = 'admin'
    );

CREATE POLICY "connections_delete"
    ON public.platform_connections FOR DELETE
    USING (
        public.is_workspace_owner(workspace_id, auth.uid()) OR
        public.get_workspace_role(workspace_id, auth.uid()) = 'admin'
    );
