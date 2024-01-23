"use client";

import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { SidebarProvider, useSidebarContext } from "../../context/SidebarContext";
import { DashboardNavbar } from "./navbar";
import { DashboardSidebar } from "./sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <Content>{children}</Content>
    </SidebarProvider>
  );
}

function Content({ children }: PropsWithChildren) {
  const { isCollapsed } = useSidebarContext();

  return (
    <>
      <DashboardNavbar />
      <div className="mt-16 flex items-start">
        <DashboardSidebar />
        <div
          id="main-content"
          className={twMerge("relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900", isCollapsed ? "lg:ml-16" : "lg:ml-64")}
        >
          {children}
        </div>
      </div>
    </>
  );
}
