import { Archive, ChevronDown, Flag, Github } from "lucide-react";
import { useUser } from "@/lib/hooks/useUser";

function SideNav() {
  const { user } = useUser();
  console.log({ user });

  return (
    <div
      className=" h-screen 
    fixed w-72 borde-r border-[1px] p-6
    flex flex-col
    "
    >
      <div className="flex-1">
        <div className="mb-4">
          <p className="text-sm text-gray-500">User: {user?.email}</p>
        </div>
        topNav
      </div>

      <div>
        bottomNav
      </div>
    </div>
  );
}

export default SideNav;
