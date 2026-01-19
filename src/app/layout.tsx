import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import WorkspaceBanner from "@/components/layout/WorkspaceBanner";
import Analytics from "@/components/Analytics";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#6366F1",
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
      <body className={`${inter.variable} antialiased`}>
        <WorkspaceProvider>
          <div className="app-layout">
            <WorkspaceBanner />
            <div className="app-body">
              <Sidebar />
              <main className="main-content">
                {children}
              </main>
            </div>
          </div>
        </WorkspaceProvider>
        <Analytics />
      </body>
    </html>
  );
}
