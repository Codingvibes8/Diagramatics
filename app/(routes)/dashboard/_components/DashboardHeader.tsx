"use client";

import { useUser } from "@/lib/hooks/useUser";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-md border-b sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
           <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
        </div>
        <span className="font-semibold text-xl text-white">Workspace</span>
      </div>

      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search diagrams, docs..." 
            className="pl-10 bg-secondary/50 border-none text-white placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        
        {user?.user_metadata?.avatar_url ? (
            <Image
            src={user.user_metadata.avatar_url}
            alt="User avatar"
            width={32}
            height={32}
            className="rounded-full ring-2 ring-gray-700"
            />
        ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white ring-2 ring-gray-700">
            {user?.email?.[0].toUpperCase() || "U"}
            </div>
        )}
      </div>
    </div>
  );
}
