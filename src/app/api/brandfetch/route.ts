import { NextRequest, NextResponse } from 'next/server';

// Brandfetch API response types
interface BrandfetchLogo {
  type: string;
  theme: string;
  formats: Array<{
    src: string;
    background: string;
    format: string;
    height: number;
    width: number;
    size: number;
  }>;
}

interface BrandfetchColor {
  hex: string;
  type: string;
  brightness: number;
}

interface BrandfetchFont {
  name: string;
  type: string;
  origin: string;
  originId: string;
  weights: number[];
}

interface BrandfetchResponse {
  id: string;
  name: string;
  domain: string;
  claimed: boolean;
  description: string;
  longDescription?: string;
  logos: BrandfetchLogo[];
  colors: BrandfetchColor[];
  fonts: BrandfetchFont[];
  images?: Array<{
    type: string;
    formats: Array<{ src: string }>;
  }>;
  links?: Array<{
    name: string;
    url: string;
  }>;
}

// Our simplified brand data format
export interface BrandData {
  name: string;
  domain: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  logos: {
    primary: string | null;
    dark: string | null;
    icon: string | null;
  };
  fonts: {
    heading: string;
    body: string;
  };
  links: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

function extractColors(colors: BrandfetchColor[]): BrandData['colors'] {
  const sortedColors = [...colors].sort((a, b) => b.brightness - a.brightness);

  // Try to find specific color types
  const primary = colors.find(c => c.type === 'primary')?.hex
    || colors.find(c => c.type === 'accent')?.hex
    || sortedColors[0]?.hex
    || '#6366F1';

  const secondary = colors.find(c => c.type === 'secondary')?.hex
    || sortedColors[1]?.hex
    || '#8B5CF6';

  const accent = colors.find(c => c.type === 'accent')?.hex
    || sortedColors[2]?.hex
    || '#10B981';

  // Background should be light
  const background = sortedColors.find(c => c.brightness > 0.9)?.hex || '#FAFAFA';

  return { primary, secondary, accent, background };
}

function extractLogos(logos: BrandfetchLogo[]): BrandData['logos'] {
  let primary: string | null = null;
  let dark: string | null = null;
  let icon: string | null = null;

  for (const logo of logos) {
    // Prefer SVG, fallback to PNG
    const format = logo.formats.find(f => f.format === 'svg')
      || logo.formats.find(f => f.format === 'png')
      || logo.formats[0];

    if (!format) continue;

    if (logo.type === 'logo' || logo.type === 'lockup') {
      if (logo.theme === 'light' && !primary) {
        primary = format.src;
      } else if (logo.theme === 'dark' && !dark) {
        dark = format.src;
      }
    } else if ((logo.type === 'icon' || logo.type === 'symbol') && !icon) {
      icon = format.src;
    }
  }

  // Fallback: use any logo as primary
  if (!primary && logos.length > 0) {
    const firstLogo = logos[0];
    const format = firstLogo.formats.find(f => f.format === 'svg')
      || firstLogo.formats.find(f => f.format === 'png')
      || firstLogo.formats[0];
    primary = format?.src || null;
  }

  return { primary, dark, icon };
}

function extractFonts(fonts: BrandfetchFont[]): BrandData['fonts'] {
  const headingFont = fonts.find(f => f.type === 'title')?.name
    || fonts.find(f => f.type === 'heading')?.name
    || fonts[0]?.name
    || 'Inter';

  const bodyFont = fonts.find(f => f.type === 'body')?.name
    || fonts[1]?.name
    || headingFont;

  return { heading: headingFont, body: bodyFont };
}

function extractLinks(links?: Array<{ name: string; url: string }>): BrandData['links'] {
  if (!links) return {};

  const result: BrandData['links'] = {};

  for (const link of links) {
    const name = link.name.toLowerCase();
    if (name.includes('twitter') || name.includes('x.com')) {
      result.twitter = link.url;
    } else if (name.includes('linkedin')) {
      result.linkedin = link.url;
    } else if (name.includes('instagram')) {
      result.instagram = link.url;
    } else if (name.includes('website') || name === 'homepage') {
      result.website = link.url;
    }
  }

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    // Clean the domain
    const cleanDomain = domain
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .toLowerCase()
      .trim();

    if (!cleanDomain) {
      return NextResponse.json(
        { error: 'Invalid domain' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BRANDFETCH_API_KEY;

    if (!apiKey) {
      // Return mock data if no API key configured
      console.log('No BRANDFETCH_API_KEY configured, returning mock data');
      return NextResponse.json({
        name: cleanDomain.split('.')[0].charAt(0).toUpperCase() + cleanDomain.split('.')[0].slice(1),
        domain: cleanDomain,
        description: `Welcome to ${cleanDomain}`,
        colors: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          accent: '#10B981',
          background: '#FAFAFA',
        },
        logos: {
          primary: null,
          dark: null,
          icon: null,
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
        },
        links: {},
      } as BrandData);
    }

    const response = await fetch(
      `https://api.brandfetch.io/v2/brands/${cleanDomain}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Brand not found', domain: cleanDomain },
          { status: 404 }
        );
      }

      const errorText = await response.text();
      console.error('Brandfetch API error:', response.status, errorText);

      return NextResponse.json(
        { error: 'Failed to fetch brand data' },
        { status: response.status }
      );
    }

    const data: BrandfetchResponse = await response.json();

    // Transform to our format
    const brandData: BrandData = {
      name: data.name || cleanDomain,
      domain: data.domain || cleanDomain,
      description: data.description || data.longDescription || '',
      colors: extractColors(data.colors || []),
      logos: extractLogos(data.logos || []),
      fonts: extractFonts(data.fonts || []),
      links: extractLinks(data.links),
    };

    return NextResponse.json(brandData);
  } catch (error) {
    console.error('Error in brandfetch API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
