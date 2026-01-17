"use client";

import { Home, Folder, PlusCircle, Activity, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Suspense } from 'react';

function BottomNavigationContent() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Files", href: "/files", icon: Folder },
    { name: "Create", href: "/create", icon: PlusCircle, isHighlight: true },
    { name: "Activity", href: "/activity", icon: Activity },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border p-2 md:hidden z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          if (item.isHighlight) {
            return (
              <div key={item.name} className="-mt-8">
                <div className="bg-blue-600 rounded-full p-4 shadow-lg shadow-blue-600/30 cursor-pointer hover:bg-blue-500 transition">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive ? "text-blue-500" : "text-muted-foreground hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function BottomNavigation() {
  return (
    <Suspense fallback={<div className="h-16 bg-background border-t md:hidden" />}>
      <BottomNavigationContent />
    </Suspense>
  );
}
