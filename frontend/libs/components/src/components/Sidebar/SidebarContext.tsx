import { createContextId } from "@builder.io/qwik";
import { FlowbiteSidebarTheme } from "./Sidebar";
export type SidebarContext = {
  theme: FlowbiteSidebarTheme;
  isCollapsed: boolean;
};

export const SidebarContext = createContextId<SidebarContext>("SidebarContext");
