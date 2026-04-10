import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#7C3AED",
};

export const metadata: Metadata = {
  title: "PostPilot - AI-Powered Social Media Autoposter",
  description: "Schedule and auto-post AI-generated content across Twitter, LinkedIn, and Instagram",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PostPilot",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((reg) => console.log('[SW] Registered:', reg.scope))
                    .catch((err) => console.log('[SW] Registration failed:', err));
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
