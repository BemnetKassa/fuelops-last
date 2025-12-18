"use client";

import { Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  username?: string;
}

const Header = ({ title, username }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between pb-6 border-b mb-8">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <Bell className="h-6 w-6 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
