'use client';

import WorkspaceBanner from './WorkspaceBanner';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <>
      <WorkspaceBanner />
      {children}
    </>
  );
}
