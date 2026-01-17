"use client";
export const dynamic = 'force-dynamic'
import Hero from "./_components/Hero";
import Header from "./_components/Header";
import { useUser } from "@/lib/hooks/useUser";
import { useEffect } from "react";

import { Suspense } from 'react';

function HomeContent() {
  const { user } = useUser();

  useEffect(() => {
    console.log("--", user);
  }, [user]);

  return (
    <div className="">
      <Header />
      <Hero />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
