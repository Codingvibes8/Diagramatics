"use client";
import { getTeams } from "@/lib/db/teams";
import { useUser } from "@/lib/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
    <div>
      <div className="grid grid-cols-4">
        <div className="bg-white h-screen w-72 fixed">SideNav</div>
        <div className="col-span-4 ml-72">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
