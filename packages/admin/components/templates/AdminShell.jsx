"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { ProfileDropdown } from "@/components/molecules/ProfileDropdown";

import { useApi } from "../../contexts/ApiContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getEntities } from "../../lib/runtime.config.js";
import Breadcrumb from "../molecules/Breadcrumb.jsx";
import { AdminNav } from "../organisms/AdminNav.jsx";
import { Logo } from "../organisms/AdminNavLogo.jsx";

export function AdminShell({ children }) {
  const [panel, setPanel] = useState(true);
  const { user, logout } = useAuth();
  const { post } = useApi();
  const router = useRouter();

  // Dynamically filter entities based on the user's role and the entity's roles array
  const entities = getEntities();
  const visibleEntities = Object.fromEntries(
    Object.entries(entities).filter(([_, entity]) => {
      return entity.roles?.includes(user?.role);
    }),
  );

  return (
    <div className="bg-black-500 flex h-screen text-xs">
      <div
        className={`bg-white border-brand-orange relative flex flex-col gap-1 border-r p-3 transition-all duration-300 ${
          panel ? "w-55" : "w-18"
        }`}
      >
        <button
          type="button"
          onClick={() => setPanel((prev) => !prev)}
          title={panel ? "Collapse sidebar" : "Expand sidebar"}
          className="border-brand-orange bg-dark-orange text-brand-soft hover:text-brand-cream absolute top-8 -right-3.5 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border shadow-sm transition-colors focus:outline-none"
        >
          {panel ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>

        <div className="px-1 py-2">
          <Logo panel={panel} />
        </div>

        <div className="bg-dark-orange mt-2 h-0.5" />

        <div className="mt-2 flex-1 overflow-y-auto">
          {/* Pass the filtered entities */}
          <AdminNav items={visibleEntities} panel={panel} />
        </div>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto p-4">
        <div className="mx-auto flex max-w-full flex-1 flex-col overflow-y-auto px-8">
          <div className="flex w-full justify-between pb-4">
            <Breadcrumb />
            <ProfileDropdown panel={panel} />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
