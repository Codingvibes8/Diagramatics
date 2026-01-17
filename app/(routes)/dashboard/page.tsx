"use client";
export const dynamic = 'force-dynamic'

import React, { useEffect } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { upsertUserProfile } from "@/lib/db/users";
import { DashboardHeader } from "./_components/DashboardHeader";
import { ProjectCard } from "./_components/ProjectCard";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

function Dashboard() {
  const { user } = useUser();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;
  
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();
  
      if (!existingUser) {
        await upsertUserProfile({
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          image: user.user_metadata?.avatar_url || '',
        });
      }
    };

    if (user) {
      checkUser();
    }
  }, [user, supabase]);

  // Mock data for display - replace with real data fetching later
  const recentProjects = [
    { title: "User Auth Flow", edited: "Edited 2h ago", gradient: "from-blue-600 to-cyan-500", starred: true },
    { title: "API V2 Specs", edited: "Edited 5h ago", gradient: "from-emerald-500 to-teal-400", starred: true },
    { title: "Postgres Schema", edited: "Edited yesterday", gradient: "from-orange-500 to-red-500", starred: false },
    { title: "AWS Deployment", edited: "Edited 3d ago", gradient: "from-pink-500 to-rose-500", starred: false },
    { title: "Landing Page v1", edited: "Edited Oct 12", gradient: "from-indigo-500 to-purple-500", starred: false },
    { title: "Service Mesh", edited: "Edited Oct 10", gradient: "from-gray-700 to-slate-600", starred: false },
  ];

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <DashboardHeader />
      
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Tabs Section (Visual only for now) */}
          <div className="flex items-center gap-6 border-b border-border pb-1">
            <button className="pb-3 border-b-2 border-primary text-primary font-medium text-sm">Recent</button>
            <button className="pb-3 border-b-2 border-transparent text-muted-foreground hover:text-white transition font-medium text-sm">Starred</button>
            <button className="pb-3 border-b-2 border-transparent text-muted-foreground hover:text-white transition font-medium text-sm">Shared with me</button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Recently Edited</h2>
              <Button variant="link" className="text-primary h-auto p-0 text-sm">View all</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentProjects.map((project, i) => (
                <ProjectCard 
                  key={i}
                  title={project.title}
                  editedAt={project.edited}
                  thumbnailGradient={project.gradient}
                  isStarred={project.starred}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
