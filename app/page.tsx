"use client";
import Hero from "./_components/Hero";
import Header from "./_components/Header";
import { useUser } from "@/lib/hooks/useUser";
import { useEffect } from "react";

export default function Home() {
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
