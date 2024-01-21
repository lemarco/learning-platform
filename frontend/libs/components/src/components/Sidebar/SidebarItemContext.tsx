import { createContextId } from "@builder.io/qwik";
export type SidebarItemContext = {
  isInsideCollapse: boolean;
};

export const SidebarItemContext = createContextId<SidebarItemContext>("SidebarItemContext");
