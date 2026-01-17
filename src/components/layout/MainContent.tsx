'use client';

import WorkspaceBanner from './WorkspaceBanner';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <div className="main-content-wrapper">
      <WorkspaceBanner />
      <div className="main-content-body">
        {children}
      </div>
    </div>
  );
}
