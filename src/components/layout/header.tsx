import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { UserNav } from "./user-nav";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 rtl">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-mr-1" />
        <Separator orientation="vertical" className="ml-2 h-4" />
      </div>

      <div className="flex items-center gap-2 px-4">
        <UserNav />
        <ThemeToggle />
      </div>
    </header>
  );
}
