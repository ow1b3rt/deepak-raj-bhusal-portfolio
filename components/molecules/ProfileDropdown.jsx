import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/packages/admin";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";

import { ConfirmationDialog } from "@/components/molecules/ConfirmationModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(user) {
  const source = user?.name || user?.email || user?.role || "U";
  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function ProfileDropdown({ panel }) {
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Open profile menu"
          className={`hover:bg-faint-blue focus-visible:ring-primary-blue/40 flex cursor-pointer items-center gap-2 border border-gray-200 bg-white text-sm font-semibold text-slate-700 transition-colors outline-none focus-visible:ring-2 ${
            panel ? "w-48 rounded-full py-1 pr-3 pl-1" : "rounded-full"
          }`}
        >
          <Avatar className="h-8 w-8">
            {user?.avatar && <AvatarImage src={user.avatar} alt="" />}
            <AvatarFallback className="bg-faint-blue text-primary-blue text-xs font-semibold">
              {getInitials(user)}
            </AvatarFallback>
          </Avatar>

          {panel && (
            <>
              <span className="flex-1 truncate text-left">
                Hello {user?.role?.toUpperCase() || "USER"}
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
        >
          <DropdownMenuItem
            onSelect={() => router.push("/admin/dashboard")}
            className="cursor-pointer gap-2 rounded-lg px-2 py-2 text-sm text-slate-700"
          >
            <LayoutDashboard size={16} className="text-gray-500" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setLogoutOpen(true)}
            className="text-primary-red focus:bg-primary-red/10 focus:text-primary-red cursor-pointer gap-2 rounded-lg px-2 py-2 text-sm"
          >
            <LogOut size={16} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        title="Log out?"
        description="You'll need to sign in again to access the admin panel."
        confirmLabel="Log out"
        variant="destructive"
        onConfirm={handleLogout}
      />
    </>
  );
}
