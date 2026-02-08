"use client";

import { Bell, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  username?: string;
}

const Header = ({ title, username }: HeaderProps) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('fuelops-user');
    router.push('/');
  };
  return (
    <header className="flex items-center justify-between pb-6 border-b mb-8">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <Bell className="h-6 w-6 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{username}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} title="Logout">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
