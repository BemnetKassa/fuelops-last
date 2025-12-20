import StationSidebar from '@/components/station/StationSidebar';
import Header from '@/components/shared/Navbar';

export default function StationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <StationSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
