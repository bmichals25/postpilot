# PostPilot

AI-Powered Social Media Autoposter - Schedule and auto-post AI-generated content across Twitter, LinkedIn, and Instagram.

**Live Demo:** [https://postpilot-app.netlify.app](https://postpilot-app.netlify.app)

## Overview

PostPilot is a social media management platform that helps users create, schedule, and publish content across multiple social media platforms. It features AI-powered content generation, a visual calendar for scheduling posts, and multi-workspace support for managing multiple brands or businesses.

## Features

### Core Features
- **Multi-Workspace Support** - Manage multiple businesses, brands, or projects from a single dashboard with easy workspace switching
- **AI-Powered Content Generation** - Generate platform-optimized posts with customizable tones (Professional, Casual, Inspirational, Humorous, Educational, Conversational)
- **Post Scheduling** - Visual calendar interface with week/month views for planning and scheduling content
- **Platform Connections** - Connect and manage Twitter/X, LinkedIn, and Instagram accounts with health monitoring
- **AI Credits System** - Track AI generation credits with monthly reset

### Dashboard Features
- Overview of upcoming scheduled posts
- Quick actions for common tasks
- Recent activity feed
- Connected platforms status bar
- Media preview with modal viewer

### Schedule Features
- Week and month calendar views
- Platform-specific filtering
- Drag-and-drop scheduling (planned)
- Visual post preview with media thumbnails
- Draft vs. scheduled post indicators

### AI Generation Features
- Multi-platform content generation
- Topic-based content creation
- Tone selection for brand voice
- Character count tracking per platform
- Edit and regenerate options

### Connections Features
- Platform health monitoring
- Authentication status tracking
- Token expiration warnings
- Re-authentication flow
- API status indicators

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Backend** | Supabase (Auth, Database, Realtime) |
| **Hosting** | Netlify |
| **Icons** | Lucide React |
| **Date Handling** | date-fns |

## Project Structure

```
postpilot/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Dashboard (home)
│   │   ├── layout.tsx         # Root layout with sidebar
│   │   ├── ai-generate/       # AI content generation page
│   │   │   └── page.tsx
│   │   ├── schedule/          # Calendar scheduling page
│   │   │   └── page.tsx
│   │   └── connections/       # Platform connections page
│   │       └── page.tsx
│   ├── components/
│   │   ├── icons/             # Custom icon components
│   │   │   └── index.tsx
│   │   └── layout/
│   │       └── Sidebar.tsx    # Main navigation sidebar
│   ├── hooks/
│   │   ├── useAuth.ts         # Authentication hook
│   │   └── useWorkspaces.ts   # Workspace, posts, connections hooks
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client (browser)
│   │   └── supabase-server.ts # Supabase client (server)
│   └── types/
│       └── database.ts        # TypeScript types for database
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- A Supabase account (free tier works)
- A Netlify account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bmichals25/postpilot.git
   cd postpilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**

   Run the SQL migration in your Supabase SQL Editor. See [SETUP.md](./SETUP.md) for detailed instructions.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open in browser**

   Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anonymous/public key |

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Run TypeScript type checking
npm run typecheck
```

## Database Schema

PostPilot uses the following database tables:

| Table | Description |
|-------|-------------|
| `users` | User profiles (extends Supabase auth.users) |
| `workspaces` | Workspaces/brands that users manage |
| `workspace_members` | Membership and roles for workspace access |
| `posts` | Social media posts with scheduling data |
| `platform_connections` | OAuth connections to social platforms |
| `ai_credits` | AI generation credits per user |

See [SETUP.md](./SETUP.md) for the complete schema and Row Level Security policies.

## Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Add environment variables in Netlify dashboard
5. Deploy

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## Authentication

PostPilot uses Supabase Auth with magic link (passwordless) authentication:

1. User enters email
2. Magic link sent to email
3. User clicks link to authenticate
4. Session managed via Supabase cookies

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data and workspaces they belong to
- Platform OAuth tokens stored securely in database
- Role-based access control (owner, admin, editor, viewer)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software.

## Links

- **Live App:** [https://postpilot-app.netlify.app](https://postpilot-app.netlify.app)
- **GitHub:** [https://github.com/bmichals25/postpilot](https://github.com/bmichals25/postpilot)
