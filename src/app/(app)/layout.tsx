import Sidebar from "@/components/layout/Sidebar";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";

export const dynamic = 'force-dynamic';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          {children}
        </main>
      </div>
    </WorkspaceProvider>
  );
}
