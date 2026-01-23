import AdminSidebar from '@/components/admin/AdminSidebar';
import Navbar from '@/components/admin/AdminNavBar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
