import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AIStudionLogo from "@/assets/brand/ai-studio.svg";
import { LogOut } from "lucide-react";

const user = {
  name: "Thermax Admin",
  email: "admin@thermax.com",
  avatar: "/avatars/user.png",
};

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background px-4 py-3 md:px-8">
      <div className="flex items-center justify-between">
        {/* Branding */}
        <div className="h-10 w-fit">
          <img
            src={AIStudionLogo}
            alt="Thermax AI Studio"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Right Section Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-slate-700 text-white">
                TA
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
