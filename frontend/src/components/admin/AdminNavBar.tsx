"use client";

import Link from "next/link";
import { LogOut, User, Shield, BarChart, Home, Menu } from "lucide-react";
import { useState } from "react";

export default function AdminNavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground shadow-md">
      <div className="flex-1 flex items-center space-x-3 justify-center md:justify-start">
        <Home className="h-6 w-6" />
        <span className="font-bold text-lg tracking-wide">FuelOps Admin</span>
      </div>
      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-6">
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
      {/* Mobile nav */}
      <div className="md:hidden relative">
        <button
          className="p-2 rounded-md hover:bg-primary/80 focus:outline-none"
          onClick={() => setDropdownOpen((v) => !v)}
        >
          <Menu className="h-6 w-6" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-primary z-50">
            <Link
              href="/admin/users"
              className="flex items-center px-4 py-2 hover:bg-primary/10"
              onClick={() => setDropdownOpen(false)}
            >
              <User className="h-5 w-5 mr-2" /> Users
            </Link>
            <Link
              href="/admin/security"
              className="flex items-center px-4 py-2 hover:bg-primary/10"
              onClick={() => setDropdownOpen(false)}
            >
              <Shield className="h-5 w-5 mr-2" /> Security
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center px-4 py-2 hover:bg-primary/10"
              onClick={() => setDropdownOpen(false)}
            >
              <BarChart className="h-5 w-5 mr-2" /> Reports
            </Link>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-primary/10"
              onClick={() => setDropdownOpen(false)}
            >
              <LogOut className="h-5 w-5 mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
