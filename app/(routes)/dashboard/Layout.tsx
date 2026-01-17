"use client";
export const dynamic = 'force-dynamic'
import { getTeams } from "@/lib/db/teams";
import { useUser } from "@/lib/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
//import SideNav from './_components/SideNav';
//import { FileListContext } from '@/app/_context/FilesListContext';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkTeam = async () => {
      if (!user) return;
      
      const { data } = await getTeams(user.id);

      if (!data || data.length === 0) {
        router.push("teams/create");
      }
    };

    if (!loading) {
      checkTeam();
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="md:grid md:grid-cols-[280px_1fr]">
        <div className="hidden md:block h-screen w-[280px] bg-card border-r fixed left-0 top-0 p-6">
            <div className="flex items-center gap-2 mb-8">
               <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                 <span className="text-white font-bold text-lg">D</span>
               </div>
               <span className="font-bold text-xl text-white">Diagramatics</span>
            </div>
            {/* Sidebar content placeholder */}
            <div className="text-muted-foreground/60 text-sm">Sidebar Navigation</div>
        </div>
        
        <div className="col-span-1 md:ml-[280px] pb-24 md:pb-0">
            {children}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default DashboardLayout;
