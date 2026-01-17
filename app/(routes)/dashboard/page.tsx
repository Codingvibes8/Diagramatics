"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/hooks/useUser";
import { upsertUserProfile } from "@/lib/db/users";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Header from "./_components/Header";

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;
  
      // Check if user profile exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();
  
      if (!existingUser) {
        // Create user profile
        await upsertUserProfile({
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          image: user.user_metadata?.avatar_url || '',
        });
      }
    };

    if (user) {
      console.log(user);
      checkUser();
    }
  }, [user, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="p-8">
      <Header />
      <div className="mt-4">
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
