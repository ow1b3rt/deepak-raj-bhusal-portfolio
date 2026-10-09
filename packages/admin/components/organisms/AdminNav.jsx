"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, User2 } from "lucide-react";

import { ConfirmationDialog } from "@/components/molecules/ConfirmationModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "../../contexts/AuthContext.jsx";

export function AdminNav({ items, panel }) {
  const pathname = usePathname();
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user, logout } = useAuth();
  const visibleitems = {
    //dashboard: {
    //  label: "Dashboard",
    //  icon: LayoutDashboard,
    //},
    ...items,
  };

  return (
    <ul className="flex flex-col gap-1">
      {Object.entries(visibleitems ?? {}).map(([key, value]) => {
        const isactive = pathname.startsWith("/admin/" + key);
        return (
          <li key={key} title={key} className="w-full outline-none">
            <Link href={`/admin/${key}`} className="block w-full">
              <div
                className={`flex items-center gap-3 rounded-lg border p-2 text-sm font-medium transition-colors ${
                  isactive
                    ? "border-brand-red bg-brand-red text-black shadow-sm"
                    : "hover:bg-brand-orange border-transparent text-black transition duration-400 ease-linear hover:text-gray-900"
                } ${panel ? "" : "justify-center"}`}
              >
                <value.icon size={18} className={isactive ? "text-black" : "text-black"} />
                {panel && <span>{value.label}</span>}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
