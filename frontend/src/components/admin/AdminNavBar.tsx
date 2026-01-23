"use client";
import Link from "next/link";
import { LogOut, User, Shield, BarChart, Home } from "lucide-react";

export default function AdminNavBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground shadow-md">
      <div className="flex items-center space-x-3">
        <Home className="h-6 w-6" />
        <span className="font-bold text-lg tracking-wide">FuelOps Admin</span>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="/admin/users" className="hover:underline flex items-center space-x-1">
          <User className="h-5 w-5" />
          <span>Users</span>
        </Link>
        <Link href="/admin/security" className="hover:underline flex items-center space-x-1">
          <Shield className="h-5 w-5" />
          <span>Security</span>
        </Link>
        <Link href="/admin/reports" className="hover:underline flex items-center space-x-1">
          <BarChart className="h-5 w-5" />
          <span>Reports</span>
        </Link>
        <button className="ml-4 flex items-center space-x-1 hover:underline">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
