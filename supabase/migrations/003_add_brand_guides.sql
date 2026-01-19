-- Add brand_guides table for workspace-specific brand data
CREATE TABLE public.brand_guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID UNIQUE NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,

    -- Colors (JSONB for flexibility)
    colors JSONB DEFAULT '{"primary": "#6366F1", "secondary": "#8B5CF6", "accent": "#10B981", "background": "#FAFAF9"}',

    -- Typography
    heading_font TEXT DEFAULT 'inter',
    body_font TEXT DEFAULT 'inter',

    -- Voice & Tone
    voice_tones TEXT[] DEFAULT '{}',
    voice_keywords TEXT[] DEFAULT '{}',
    voice_description TEXT,

    -- Target Audience
    audience_demographics TEXT,
    audience_interests TEXT,
    audience_pain_points TEXT,

    -- Messaging
    tagline TEXT,
    value_props TEXT[] DEFAULT '{}',
    do_list TEXT[] DEFAULT '{}',
    dont_list TEXT[] DEFAULT '{}',

    -- Brand Assets (from Brandfetch)
    logo_url TEXT,
    logo_dark_url TEXT,
    icon_url TEXT,
    domain TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for workspace lookups
CREATE INDEX idx_brand_guides_workspace ON public.brand_guides(workspace_id);

-- Trigger for updated_at
CREATE TRIGGER update_brand_guides_updated_at
    BEFORE UPDATE ON public.brand_guides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.brand_guides ENABLE ROW LEVEL SECURITY;

-- RLS Policies using helper functions from migration 002
CREATE POLICY "Users can view brand guides in their workspaces"
    ON public.brand_guides FOR SELECT
    USING (is_workspace_member(workspace_id, auth.uid()) OR is_workspace_owner(workspace_id, auth.uid()));

CREATE POLICY "Admins can manage brand guides"
    ON public.brand_guides FOR ALL
    USING (
        is_workspace_owner(workspace_id, auth.uid()) OR
        get_workspace_role(workspace_id, auth.uid()) IN ('admin', 'owner')
    );

-- Add workspace_settings column to workspaces table for posting defaults
ALTER TABLE public.workspaces ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{
    "default_platforms": [],
    "default_hashtags": [],
    "auto_schedule": false,
    "ai_tone": "professional",
    "ai_max_length": 280,
    "ai_emojis": "sometimes"
}';
