"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Fuel, List, BarChart, Home } from "lucide-react";

import { useEffect, useState } from "react";

export default function StationNavBar() {
  const router = useRouter();
  const [adminName, setAdminName] = useState<string>("");
  const [stationName, setStationName] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("station-user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setAdminName(user.name || "");
        setStationName(user.stationName || "");
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("station-auth");
    localStorage.removeItem("station-user");
    router.push("/stationLogin");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-green-700 text-white shadow-md">
      <div className="flex-1 flex items-center space-x-3 justify-center md:justify-start">
        <Fuel className="h-6 w-6" />
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-wide">
            {stationName || "FuelOps Station"}
          </span>
          {adminName && (
            <span className="text-xs text-white/80">Admin: {adminName}</span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="/station/reservations" className="hover:underline flex items-center space-x-1">
          <List className="h-5 w-5" />
          <span>Reservations</span>
        </Link>
        <Link href="/station/stock" className="hover:underline flex items-center space-x-1">
          <BarChart className="h-5 w-5" />
          <span>Stock</span>
        </Link>
        <Link href="/station/dashboard" className="hover:underline flex items-center space-x-1">
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <button className="ml-4 flex items-center space-x-1 hover:underline" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
