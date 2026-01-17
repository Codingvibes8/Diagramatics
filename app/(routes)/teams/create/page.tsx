"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/hooks/useUser";
import { createTeam } from "@/lib/db/teams";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const createNewTeam = async () => {
    if (!user) {
      toast.error("You must be logged in to create a team");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await createTeam(teamName);

      if (error) {
        toast.error(error.message);
      } else if (data) {
        router.push("/dashboard");
        toast.success("Team created successfully!!!");
      }
    } catch (error) {
      toast.error("An error occurred while creating the team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" px-6 md:px-16 my-16">
      <Image src="/logo-black.png" alt="logo" width={200} height={200} />
      <div className="flex flex-col items-center mt-8">
        <h2 className="font-bold text-[40px] py-3">
          What should we call your team?
        </h2>

        <h2 className="text-gray-500 text-[20px]">
          You can always change this later from settings.
        </h2>
        <div className="mt-7 w-[40%]">
          <label className="text-gray-500">Team Name</label>
          <Input
            placeholder="Team Name"
            className="mt-3"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <Button
          className="bg-blue-500 mt-9 w-[30%] hover:bg-blue-600"
          disabled={!(teamName && teamName?.length > 0) || loading}
          onClick={() => createNewTeam()}
        >
          {loading ? "Creating..." : "Create Team"}
        </Button>
      </div>
    </div>
  );
}

export default CreateTeam;
